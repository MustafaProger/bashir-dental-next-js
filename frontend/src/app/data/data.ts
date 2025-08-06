import type {
	SocialLink,
	ContactLinks,
	SlideContent,
	ServicesContent,
} from "../../types";

import screw from "../../../public/assets/services/screw.png";
import royalty from "../../../public/assets/services/royalty.png";
import tooth from "../../../public/assets/services/tooth.png";

export const mediaLinks: SocialLink[] = [
	{
		href: "https://www.instagram.com/dr_bashirkurban0v?igsh=MTd5Z3B5cDZ3ZzZyMA==",
		img: "/assets/media/instagram.svg",
		alt: "instagram",
	},
	{
		href: "https://t.me/+79880246554",
		img: "/assets/media/telegram.svg",
		alt: "telegram",
	},
	{
		href: "https://wa.me/+79880246554",
		img: "/assets/media/whatsapp.svg",
		alt: "whatsapp",
	},
];

export const contactLinks: ContactLinks[] = [
	{
		href: "mailto:kirov.aleks.1998@yandex.ru",
		alt: "email",
		img: "/assets/contacts/email.svg",
		text: "kirov.aleks.1998@yandex.ru",
	},
	{
		href: "tel:79880246554",
		alt: "phone",
		img: "/assets/contacts/phone.svg",
		text: "+7 988 024-65-54",
	},
];

export const hyperLinks: Pick<ContactLinks, "href" | "text">[] = [
	{
		href: "#hero",
		text: "Главная",
	},
	{
		href: "#about-me",
		text: "Обо мне",
	},
	{
		href: "#services",
		text: "Услуги",
	},
	{
		href: "#works",
		text: "Работы",
	},
	{
		href: "#feedback",
		text: "Отзывы",
	},
	{
		href: "#form",
		text: "Связаться",
	},
];

export const slides: SlideContent[] = [
	{
		title: "Миссия и цели",
		text: `Сегодня я сосредоточен на том, чтобы каждый мой пациент уходил с уверенной улыбкой. Моё желание — сделать стоматологию доступной, понятной и комфортной. Я верю, что здоровая улыбка — это уверенность в себе и качество жизни.`,
	},
	{
		title: "Мой подход к работе",
		text: `За время своей карьеры я понял, что каждый пациент — это индивидуальность. Моя цель — сделать визит к стоматологу комфортным и безболезненным. Я использую современные методы лечения и уделяю особое внимание безопасности.`,
	},
	{
		title: "Достижения",
		text: `С отличием окончил медицинский университет и прошел стажировку в лучших клиниках. Полученные знания позволяют мне применять самые современные методы лечения зубов, обеспечивая высокое качество и долговременные результаты.`,
	},
];

export const servicesContent: ServicesContent[] = [
	{
		title: "Имплантация",
		frontText:
			"Современная имплантация зубов для восстановления улыбки и комфорта.",
		backText:
			"Я использую надежные и долговечные зубные импланты, которые выглядят и ощущаются как натуральные. Процедура проходит с минимальным дискомфортом, а результат сохраняется на долгие годы.",
		img: screw,
		alt: "screw",
	},
	{
		title: "Протезирование",
		frontText:
			"Качественное протезирование для восстановления жевательной функции.",
		backText:
			"Подбираю оптимальный вариант протезирования — от съемных до несъемных конструкций. Использую современные материалы, обеспечивая комфорт и естественный вид.",
		img: royalty,
		alt: "royalty",
	},
	{
		title: "Чистка зубов",
		frontText: "Профессиональная чистка зубов и уход за полостью рта.",
		backText:
			"Регулярная чистка зубов помогает избежать проблем с зубами и деснами, поддерживая их здоровье. Я провожу глубокую профессиональную чистку, удаляю налет и зубной камень, а также помогаю предотвратить заболевания полости рта.",
		img: tooth,
		alt: "tooth",
	},
];
