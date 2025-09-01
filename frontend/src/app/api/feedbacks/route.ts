import { NextRequest, NextResponse } from "next/server";

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL!;
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN!;

// GET /api/feedbacks → читаем из Strapi
export async function GET() {
	const res = await fetch(`${STRAPI_URL}/api/feedbacks?sort=createdAt:desc`, {
		headers: { Authorization: `Bearer ${STRAPI_TOKEN}` },
		next: { revalidate: 300 }, // ISR 5 минут
	});
	const data = await res.json();
	return NextResponse.json(data, { status: res.status });
}

// POST /api/feedbacks → создаём отзыв в Strapi (без публичных прав)
export async function POST(req: NextRequest) {
	const body = await req.json().catch(() => ({}));

	const res = await fetch(`${STRAPI_URL}/api/feedbacks`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${STRAPI_TOKEN}`,
		},
		body: JSON.stringify({ data: body?.data ?? body }),
		cache: "no-store",
	});

	const data = await res.json();
	return NextResponse.json(data, { status: res.status });
}
