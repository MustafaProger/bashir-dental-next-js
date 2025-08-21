import type { Metadata } from "next";
import "./styles/globals.css";
import Header from "./components/Header";

import { montserrat } from "./ui/fonts";

export const metadata: Metadata = {
	title:
		"Стоматологическая клиника Башир – Качественное лечение и уход за улыбкой",
	description:
		"Стоматологическая клиника Башир предлагает полный спектр услуг: от профилактики и лечения зубов до сложных процедур имплантации. Заботимся о здоровье вашей улыбки с использованием современных технологий и индивидуального подхода",
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
