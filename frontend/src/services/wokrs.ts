export async function getWorks() {
	const res = await fetch("http://localhost:1337/api/works?populate=*");
	if (!res.ok) throw new Error("Ошибка загрузки работа");
	return res.json();
}
