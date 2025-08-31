import type { Metadata } from "next";
import "./styles/globals.css";
import { montserrat } from "./ui/fonts";
import HeaderContainer from "../components/Header/HeaderContainer";
import Providers from "./providers";

// TODO: когда будет домен — раскомментируй и подставь:
const SITE_URL = new URL("https://bashir-dental.vercel.app/");

export const metadata: Metadata = {
	// metadataBase: SITE_URL,
	title: {
		default:
			"Стоматолог Башир — лечение, имплантация, протезирование | Каспийск",
		template: "%s | Стоматолог Башир — Каспийск",
	},
	description:
		"Стоматолог Башир — лечение, имплантация, протезирование и профессиональная чистка зубов в Каспийске (Республика Дагестан). Приём по записи. Ул. Ленина, 78. Тел.: +7 988 024-65-54.",
	keywords: [
		"стоматолог Каспийск",
		"лечение зубов Каспийск",
		"имплантация зубов Каспийск",
		"протезирование зубов Каспийск",
		"чистка зубов Каспийск",
		"брекеты Каспийск",
		"стоматология Дагестан",
		"Стоматолог Башир",
	],
	alternates: {
		canonical: "https://bashir-dental.vercel.app/", // когда будет домен + роуты — можно указывать абсолютные каноникалы
	},
	robots: {
		index: true,
		follow: true,
		// если есть тестовые/админские страницы — добавим правила позже
	},
	openGraph: {
		type: "website", // для персонального профиля можно позже поставить "profile"
		locale: "ru_RU",
		title: "Стоматолог Башир — лечение и имплантация зубов в Каспийске",
		description:
			"Современное лечение, имплантация, протезирование, чистка зубов. Приём по записи. Ул. Ленина, 78, Каспийск. Тел.: +7 988 024-65-54.",
		url: "https://bashir-dental.vercel.app/", // подставим абсолютный позже
		siteName: "Стоматолог Башир",
		images: [
			// сделай отдельную картинку 1200×630 (og.jpg). Временно можно оставить favicon, но лучше og-изображение.
			{
				url: "/og.jpg",
				width: 1200,
				height: 630,
				alt: "Стоматолог Башир — Каспийск",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: "Стоматолог Башир — лечение и имплантация зубов в Каспийске",
		description:
			"Имплантация, протезирование, чистка зубов. Приём по записи. Ул. Ленина, 78. Тел.: +7 988 024-65-54.",
		images: ["/og.jpg"],
	},
	icons: {
		icon: "/favicon.ico", // у тебя это логотип — ок
		shortcut: "/favicon.ico",
	},
	// можно добавить verification (Search Console/Метрика) — когда будут коды
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang='ru'>
			<body className={`${montserrat.className} antialiased`}>
				{/* JSON-LD: LocalBusiness (Dentist) + Person */}
				<script
					type='application/ld+json'
					// NOTE: обязательно JSON.stringify без переносов переменных
					dangerouslySetInnerHTML={{
						__html: JSON.stringify([
							{
								"@context": "https://schema.org",
								"@type": "Dentist",
								name: "Стоматолог Башир",
								image: "/favicon.ico",
								telephone: "+7 988 024-65-54",
								address: {
									"@type": "PostalAddress",
									streetAddress: "улица Ленина, 78",
									addressLocality: "Каспийск",
									addressRegion: "Республика Дагестан",
									postalCode: "368300",
									addressCountry: "RU",
								},
								geo: {
									"@type": "GeoCoordinates",
									latitude: 42.899855,
									longitude: 47.624796,
								},
								// По записи — так и оставим. Если будут часы — добавим OpeningHoursSpecification.
								openingHours: "ByAppointment",
								areaServed: "Каспийск",
								priceRange: "₽₽", // можешь поменять на ₽–₽₽₽
								url: "https://bashir-dental.vercel.app/", // подставим абсолютный, когда будет домен
								sameAs: [] as string[], // добавим соцсети позже
								hasOfferCatalog: {
									"@type": "OfferCatalog",
									name: "Стоматологические услуги",
									itemListElement: [
										{
											"@type": "Offer",
											itemOffered: {
												"@type": "MedicalProcedure",
												name: "Имплантация зубов",
											},
										},
										{
											"@type": "Offer",
											itemOffered: {
												"@type": "MedicalProcedure",
												name: "Протезирование зубов",
											},
										},
										{
											"@type": "Offer",
											itemOffered: {
												"@type": "MedicalProcedure",
												name: "Профессиональная чистка зубов",
											},
										},
										{
											"@type": "Offer",
											itemOffered: {
												"@type": "MedicalProcedure",
												name: "Брекеты (ортодонтия)",
											},
										},
									],
								},
							},
							{
								"@context": "https://schema.org",
								"@type": "Person",
								name: "Стоматолог Башир",
								jobTitle: "Стоматолог",
								worksFor: { "@type": "Dentist", name: "Стоматолог Башир" },
								telephone: "+7 988 024-65-54",
								address: {
									"@type": "PostalAddress",
									streetAddress: "улица Ленина, 78",
									addressLocality: "Каспийск",
									addressRegion: "Республика Дагестан",
									postalCode: "368300",
									addressCountry: "RU",
								},
								url: "https://bashir-dental.vercel.app/",
							},
						]),
					}}
				/>
				<Providers>
					<HeaderContainer />
					{children}
				</Providers>
			</body>
		</html>
	);
}
