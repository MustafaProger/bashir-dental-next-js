export type SocialLink = {
	href: string;
	img: string;
	alt: string;
};

export type SlideContent = {
	title: string;
	text: string;
};

export type ContactLinks = SocialLink & { text: string };
