import { NextRequest, NextResponse } from "next/server";
export const runtime = "nodejs";

const RAW_URL =
	process.env.NEXT_PUBLIC_STRAPI_URL || process.env.STRAPI_URL || "";
const STRAPI_URL = RAW_URL.replace(/\/$/, "");
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN || "";

function envOk() {
	return Boolean(STRAPI_URL && STRAPI_TOKEN);
}

// GET: читаем без кэша, последние первыми
export async function GET() {
	if (!envOk()) {
		return NextResponse.json(
			{ error: "Missing env: NEXT_PUBLIC_STRAPI_URL and/or STRAPI_API_TOKEN" },
			{ status: 500 }
		);
	}

	const res = await fetch(`${STRAPI_URL}/api/feedbacks?sort=createdAt:desc`, {
		headers: { Authorization: `Bearer ${STRAPI_TOKEN}` },
		cache: "no-store", // ← важно: без кэша
	});

	const data = await res.json().catch(() => ({}));
	return NextResponse.json(data, { status: res.status });
}

// POST: создаём + сразу публикуем
export async function POST(req: NextRequest) {
	if (!envOk()) {
		return NextResponse.json(
			{ error: "Missing env: NEXT_PUBLIC_STRAPI_URL and/or STRAPI_API_TOKEN" },
			{ status: 500 }
		);
	}

	const body = await req.json().catch(() => ({}));
	const incoming = body?.data ?? body;

	const res = await fetch(`${STRAPI_URL}/api/feedbacks`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${STRAPI_TOKEN}`,
		},
		body: JSON.stringify({
			data: {
				...incoming,
				// если включён Draft & Publish — сразу публикуем
				publishedAt: new Date().toISOString(),
			},
		}),
		cache: "no-store",
	});

	const data = await res.json().catch(async () => ({ text: await res.text() }));
	return NextResponse.json(data, { status: res.status });
}
