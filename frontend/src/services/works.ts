export async function getWorks(
	url: string,
	page: number = 1,
	pageSize: number = 3
) {
	const res = await fetch(
		`${url}/api/works?populate=*&pagination[page]=${page}&pagination[pageSize]=${pageSize}`
	);
	if (!res.ok) throw new Error("Ошибка загрузки работ");
	return res.json();
}
