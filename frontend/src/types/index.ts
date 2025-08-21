import { StaticImageData } from "next/image";

export type MedialLink = {
	href: string;
	img: string;
	alt: string;
};

export type SlideContent = {
	title: string;
	text: string;
};

export type ContactLink = MedialLink & { text: string };

export type Work = {
	id: number;
	beforeImage: { 
		id: number;
		url: string;
		formats?: {
			thumbnail?: { url: string };
			small?: { url: string };
			medium?: { url: string };
			large?: { url: string };
		};
	}[];
	afterImage: { 
		id: number;
		url: string;
		formats?: {
			thumbnail?: { url: string };
			small?: { url: string };
			medium?: { url: string };
			large?: { url: string };
		};
	}[];
	beforeImagePosition?: string;
	afterImagePosition?: string;
	beforeImageScale?: number;
	afterImageScale?: number;
	date?: string;
};

export type ServicesContent = {
	title: string;
	frontText: string;
	backText: string;
	img: StaticImageData;
	alt: string;
};