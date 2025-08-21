export async function getWorks(url: string) {
	const res = await fetch(`${url}/api/works?populate=*`);
	if (!res.ok) throw new Error("Ошибка загрузки работа");
	return res.json();
}
