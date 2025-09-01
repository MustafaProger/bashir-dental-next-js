import { WorksResponse } from "@/types";

export async function getWorks(
	page: number = 1,
	pageSize: number = 3,
	opts: { signal?: AbortSignal } = {}
): Promise<WorksResponse> {
	const res = await fetch(`/api/works?page=${page}&pageSize=${pageSize}`, {
		signal: opts.signal,
	});
	if (!res.ok) throw new Error("Ошибка загрузки работ");
	return res.json();
}
