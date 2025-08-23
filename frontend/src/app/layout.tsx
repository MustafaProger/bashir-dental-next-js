import type { Metadata } from "next";
import "./styles/globals.css";
import Header from "./components/Header";

import { montserrat } from "./ui/fonts";

export const metadata: Metadata = {
	title: "Стоматолог Башир – Качественное лечение и уход за улыбкой",
	description:
		"Профилактика, лечение и имплантация зубов. Современные технологии и индивидуальный подход для здоровья вашей улыбки",
	icons: {
		icon: "./favicon.ico",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html>
			<body className={`${montserrat.className} antialiased`}>
				<Header />
				{children}
			</body>
		</html>
	);
}
