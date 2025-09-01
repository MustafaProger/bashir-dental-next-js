import { NextRequest, NextResponse } from "next/server";

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL!;
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN!;

export async function GET(req: NextRequest) {
	const { searchParams } = new URL(req.url);

	const page = searchParams.get("page") ?? "1";
	const pageSize = searchParams.get("pageSize") ?? "3";

	const url = `${STRAPI_URL}/api/works?populate=*&pagination[page]=${page}&pagination[pageSize]=${pageSize}`;

	const res = await fetch(url, {
		headers: { Authorization: `Bearer ${STRAPI_TOKEN}` },
		cache: "no-store", // или next: { revalidate: 60 } если хочешь ISR
	});

	const data = await res.json();
	return NextResponse.json(data, { status: res.status });
}
