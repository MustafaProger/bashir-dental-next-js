import { NextRequest, NextResponse } from "next/server";
export const runtime = "nodejs";

const RAW_URL =
	process.env.NEXT_PUBLIC_STRAPI_URL || process.env.STRAPI_URL || "";
const STRAPI_URL = RAW_URL.replace(/\/$/, "");
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN || "";

function ensureEnv() {
	if (!STRAPI_URL || !STRAPI_TOKEN) {
		console.error("STRAPI_URL or STRAPI_TOKEN missing", {
			STRAPI_URL,
			STRAPI_TOKEN_SET: Boolean(STRAPI_TOKEN),
		});
		return false;
	}
	return true;
}

export async function GET(req: NextRequest) {
	if (!ensureEnv()) {
		return NextResponse.json(
			{ error: "Missing env: NEXT_PUBLIC_STRAPI_URL and/or STRAPI_API_TOKEN" },
			{ status: 500 }
		);
	}

	const { searchParams } = new URL(req.url);
	const page = searchParams.get("page") ?? "1";
	const pageSize = searchParams.get("pageSize") ?? "3";

	const url = `${STRAPI_URL}/api/works?populate=*&pagination[page]=${page}&pagination[pageSize]=${pageSize}`;

	const res = await fetch(url, {
		headers: { Authorization: `Bearer ${STRAPI_TOKEN}` },
		cache: "no-store",
	});

	const data = await res.json().catch(() => ({}));
	return NextResponse.json(data, { status: res.status });
}
