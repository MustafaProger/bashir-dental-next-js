import { CreateFeedbackPayload } from "@/types";

export async function getFeedback() {
	const res = await fetch("/api/feedbacks", { next: { revalidate: 300 } });
	if (!res.ok) throw new Error("Failed to fetch feedback");
	return res.json();
}

export async function createFeedback(payload: CreateFeedbackPayload) {
	const res = await fetch("/api/feedbacks", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ data: payload }),
	});
	if (!res.ok) {
		let msg = "Failed to create feedback";
		try {
			const j = await res.json();
			msg = j?.error?.message || JSON.stringify(j);
		} catch {}
		throw new Error(msg);
	}
	return res.json();
}
