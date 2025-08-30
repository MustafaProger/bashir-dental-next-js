import { CreateFeedbackPayload } from "@/types";

export async function getFeedback(apiUrl: string) {
	const res = await fetch(`${apiUrl}/api/feedbacks?sort=createdAt:desc`, {
		next: { revalidate: 300 },
	});
	if (!res.ok) throw new Error("Failed to fetch feedback");
	return res.json();
}

export async function createFeedback(
	apiUrl: string,
	payload: CreateFeedbackPayload
) {
	const res = await fetch(`${apiUrl}/api/feedbacks`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ data: payload }),
	});

	if (!res.ok) {
		const text = await res.text().catch(() => "");
		throw new Error(text || "Failed to create feedback");
	}
	return res.json();
}
