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

export type WorkImage = {
	id: number;
	url: string;
	formats: {
		thumbnail: { url: string };
		small: { url: string };
		medium: { url: string };
		large: { url: string };
	};
};

export type WorkItem = {
	id: number;
	beforeImage: WorkImage[];
	afterImage: WorkImage[];
};

export type WorksResponse = {
	data: WorkItem[];
	meta: {
		pagination: Pagination;
	};
};

export type ServicesContent = {
	title: string;
	frontText: string;
	backText: string;
	img: StaticImageData;
	alt: string;
};

export type Pagination = {
	page: number;
	pageSize: number;
	pageCount: number;
	total: number;
};

export type Feedback = {
	id: number;
	createdAt: string;
	name: string;
	rating: number;
	review: string;
};

export type CompareSliderItem = {
	work: WorkItem;
	index: number;
};

export type CompareSlider = {
	works: WorkItem[];
	loading: boolean;
	loadingMore: boolean;
	error: string | null;
	pagination: Pagination | null;
	onLoadMore: () => void;
};

export type HeaderMobileMenu = {
	menuOpen: boolean;
	toggleMenu: () => void;
};

export type Header = {
	menuOpen: boolean;
	isScrolled: boolean;
	scrollProgress: number;
	toggleMenu: () => void;
};

export type CreateFeedbackPayload = {
	name: string;
	rating: number;
	review: string;
};

export type FormState = {
	name: string;
	rating: number;
	review: string;
};
