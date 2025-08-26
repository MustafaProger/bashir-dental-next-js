import { WorksResponse } from "@/types";

export async function getWorks(
	baseUrl: string,
	page: number = 1,
	pageSize: number = 3,
	opts: { signal?: AbortSignal } = {}
): Promise<WorksResponse> {
	const res = await fetch(
		`${baseUrl}/api/works?populate=*&pagination[page]=${page}&pagination[pageSize]=${pageSize}`,
		{ signal: opts.signal }
	);
	if (!res.ok) throw new Error("Ошибка загрузки работ");
	return res.json();
}
