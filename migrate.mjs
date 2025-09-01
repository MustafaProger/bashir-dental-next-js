// migrate.mjs
// node >= 18

import path from "node:path";

/** ========= НАСТРОЙКИ ========= **/
const LOCAL_URL = "http://localhost:1337"; // локальный Strapi
const CLOUD_URL = "https://funny-courage-6cba6ce59b.strapiapp.com"; // твой облачный Strapi
const CLOUD_TOKEN = "46019c9d5561bc7daa1f5da225c668d9c57d5e1b47dcaaed4e1638593f56cc6132fd20d7dc35cfbe5ccafdfd5fbdc8018cda31e2e1c4af0f48b28f0870543850f5e4c92c59a6b021cba4bab021f30dd88e2db883790b335e8c18c3996c1e3ec3fb58152cad4924cf00a07cb322183c8f0bf0df43f9461a50040680ede3ba4945"; // Settings → API Tokens (Cloud)

// что переносим и какие поля там медиа:
const TYPES = [
  {
    api: "works",
    mediaFields: [
      "image",
      "gallery",
      "beforeImage", // ← добавили
      "afterImage",  // ← добавили
    ],
  },
  { api: "feedbacks", mediaFields: [] },
];

// публиковать сразу записи (для коллекций с draft/publish):
const PUBLISH = true;
/** ============================= **/

const authHeadersCloud = { Authorization: `Bearer ${CLOUD_TOKEN}` };

/** Универсальный GET локально (поддержка и с/без meta.pagination) */
async function fetchAllLocal(type) {
	const out = [];
	let page = 1;
	const pageSize = 100;

	while (true) {
		const url = `${LOCAL_URL}/api/${type}?populate=*&pagination[page]=${page}&pagination[pageSize]=${pageSize}`;
		const res = await fetch(url);
		if (!res.ok) throw new Error(`Local fetch ${type} failed: ${res.status}`);
		const json = await res.json();

		const data = Array.isArray(json) ? json : json.data;
		if (!Array.isArray(data))
			throw new Error(`Unexpected response for ${type}`);

		out.push(...data);

		const pagination = json?.meta?.pagination;
		if (!pagination) break; // нет пагинации — одна страница
		if (pagination.page >= pagination.pageCount) break;
		page++;
	}
	return out;
}

/** Нормализуем запись: {id, attributes:{...}} ИЛИ плоский объект */
function stripSystemFields(entry) {
	const node = entry?.attributes ?? entry ?? {};
	const { createdAt, updatedAt, publishedAt, createdBy, updatedBy, ...rest } =
		node;
	return { id: entry?.id ?? node?.id ?? null, data: rest };
}

/** Загрузка одного файла в облачный Strapi (прилетит в Cloudinary) */
async function uploadFileToCloud(fileUrl) {
	const res = await fetch(fileUrl);
	if (!res.ok) throw new Error(`Download media failed: ${fileUrl}`);
	const blob = await res.blob();

	const form = new FormData();
	form.append("files", blob, path.basename(new URL(fileUrl).pathname));

	const up = await fetch(`${CLOUD_URL}/api/upload`, {
		method: "POST",
		headers: authHeadersCloud,
		body: form,
	});
	if (!up.ok) {
		const t = await up.text();
		throw new Error(`Cloud upload failed: ${up.status} ${t}`);
	}
	const uploaded = await up.json();
	return uploaded[0]; // первый загруженный файл
}

/** Рекурсивно обрабатываем медиа-поля: поддержка одиночных/множественных/плоских URL */
async function processMediaFields(obj, mediaFields, prefix = "") {
	if (!obj || typeof obj !== "object") return obj;

	if (Array.isArray(obj)) {
		const outArr = [];
		for (const item of obj)
			outArr.push(await processMediaFields(item, mediaFields, prefix));
		return outArr;
	}

	const out = {};
	for (const key of Object.keys(obj)) {
		const value = obj[key];

		if (mediaFields.includes(key)) {
			// множественное медиа
			const isArrayMedia = Array.isArray(value?.data) || Array.isArray(value);
			if (isArrayMedia) {
				const arr = Array.isArray(value?.data) ? value.data : value;
				const ids = [];
				for (const f of arr) {
					const url =
						f?.attributes?.url ?? f?.url ?? (typeof f === "string" ? f : null);
					if (!url) continue;
					const absolute = url.startsWith("http") ? url : `${LOCAL_URL}${url}`;
					const uploaded = await uploadFileToCloud(absolute);
					ids.push(uploaded.id);
				}
				out[key] = ids;
				continue;
			}

			// одиночное медиа
			const single =
				value?.data?.attributes?.url ??
				value?.attributes?.url ??
				value?.url ??
				(typeof value === "string" ? value : null);

			if (single) {
				const absolute = single.startsWith("http")
					? single
					: `${LOCAL_URL}${single}`;
				const uploaded = await uploadFileToCloud(absolute);
				out[key] = uploaded.id;
			} else {
				out[key] = null;
			}
			continue;
		}

		// рекурсивно
		if (value && typeof value === "object") {
			out[key] = await processMediaFields(
				value,
				mediaFields,
				prefix ? `${prefix}.${key}` : key
			);
		} else {
			out[key] = value;
		}
	}
	return out;
}

/** Удаляем все id/documentId рекурсивно (Strapi не принимает id при POST) */
function removeIdsDeep(obj) {
	if (Array.isArray(obj)) return obj.map(removeIdsDeep);
	if (obj && typeof obj === "object") {
		const out = {};
		for (const [k, v] of Object.entries(obj)) {
			if (k === "id" || k === "documentId") continue;
			out[k] = removeIdsDeep(v);
		}
		return out;
	}
	return obj;
}

/** Создать запись в облаке */
async function createInCloud(type, payload) {
	const body = {
		data: {
			...payload,
			...(PUBLISH ? { publishedAt: new Date().toISOString() } : {}),
		},
	};

	const res = await fetch(`${CLOUD_URL}/api/${type}`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			...authHeadersCloud,
		},
		body: JSON.stringify(body),
	});

	if (!res.ok) {
		const t = await res.text();
		throw new Error(`Create ${type} failed: ${res.status} ${t}`);
	}
	return res.json();
}

/** Миграция одного типа */
async function migrateType({ api, mediaFields }) {
	console.log(`\n=== Migrating ${api} ===`);
	const local = await fetchAllLocal(api);
	console.log(`Found ${local.length} entries locally.`);

	for (const entry of local) {
		const { data } = stripSystemFields(entry);

		// 1) обработать медиа (получим id файлов на облаке)
		const processed = await processMediaFields(data, mediaFields);

		// 2) удалить все id/documentId из вложенных объектов
		const sanitized = removeIdsDeep(processed);

		// TODO (при необходимости): восстановление связей по slug/уникальным полям

		// 3) создать запись
		const created = await createInCloud(api, sanitized);
		console.log(` + ${api} created: ${created.data?.id}`);
	}
}

/** MAIN */
(async () => {
	try {
		for (const t of TYPES) {
			await migrateType(t);
		}
		console.log("\n✅ Done.");
	} catch (e) {
		console.error("\n❌ Error:", e);
		process.exit(1);
	}
})();
