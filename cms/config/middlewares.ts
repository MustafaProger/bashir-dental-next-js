// cms/config/middlewares.ts
export default [
	"strapi::errors",
	{
		name: "strapi::security",
		config: { contentSecurityPolicy: false },
	},
	{
		name: "strapi::cors",
		config: {
			origin: [
				"https://bashir-dental.ru", // прод фронт
				"http://localhost:3000", // локалка фронта
			],
			headers: "*",
			methods: "*",
			credentials: true,
		},
	},
	"strapi::poweredBy",
	"strapi::logger",
	"strapi::query",
	"strapi::body",
	"strapi::session",
	"strapi::favicon",
	"strapi::public",
];
