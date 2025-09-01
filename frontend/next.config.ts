import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	images: {
		domains: ["localhost"],
		remotePatterns: [
			// Strapi Cloud медиа: <project>.media.strapiapp.com
			{ protocol: "https", hostname: "*.media.strapiapp.com" },
			// на всякий случай (если где-то прямые ссылки на домен проекта)
			{ protocol: "https", hostname: "*.strapiapp.com" },
			// Cloudinary (если медиа уходят туда)
			{ protocol: "https", hostname: "res.cloudinary.com" },
			// (опционально) DigitalOcean Spaces, если Strapi их использует в твоём проекте
			{ protocol: "https", hostname: "*.digitaloceanspaces.com" },
		],
	},
};

export default nextConfig;
