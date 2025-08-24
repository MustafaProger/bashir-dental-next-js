import type { Metadata } from "next";
import "./styles/globals.css";

import { montserrat } from "./ui/fonts";
import HeaderContainer from "./components/Header/HeaderContainer";

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
				<HeaderContainer />
				{children}
			</body>
		</html>
	);
}
