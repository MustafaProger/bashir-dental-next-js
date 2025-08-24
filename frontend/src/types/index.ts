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
	name: string;
	date: string;
	rating: number;
	isLong: boolean;
	review: string;
};

export type CompareSliderItem = {
	work: WorkItem;
	apiUrl: string;
	index: number;
};

export type CompareSlider = {
	works: WorkItem[];
	loading: boolean;
	loadingMore: boolean;
	error: string | null;
	pagination: Pagination | null;
	apiUrl: string;
	onLoadMore: () => void;
};
