export async function getFeedback(baseUrl: string) {
	const res = await fetch(`${baseUrl}/api/feedbacks`);
	if (!res.ok) throw new Error("Ошибка загрузки отзывов");
	return res.json();
}
