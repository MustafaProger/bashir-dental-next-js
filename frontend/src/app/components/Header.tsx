"use client";

import Image from "next/image";
import style from "../styles/module/header.module.css";

import type { SocialLink, ContactLinks } from "../../types";
import { useState } from "react";

const mediaLinks: SocialLink[] = [
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

const contactLinks: ContactLinks[] = [
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

const hyperLinks: Pick<ContactLinks, "href" | "text">[] = [
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

const Header: React.FC = () => {
	const [menuOpen, setMenuOpen] = useState<boolean>(false);

	function toggleMenu() {
		setMenuOpen((prevState: boolean) => !prevState);
		document.body.classList.toggle("lock");
	}

	return (
		<header className='fixed top-0 left-0 w-full z-10'>
			<div className={`${style.headerContent} ${style.headerFirstContent}`}>
				<div className='relative h-15 max-w-[1200px] flex justify-between mx-auto px-[30px] z-10'>
					<div className='flex-header-center'>
						{mediaLinks.map(({ href, img, alt }) => (
							<a
								key={href}
								href={href}
								target='_blank'>
								<Image
									src={img}
									alt={alt}
									width={25}
									height={25}
									loading='lazy'
									className='hover:scale-120 transition-all duration-300'
								/>
							</a>
						))}
					</div>
					<div className='flex-header-center gap-[30px]'>
						{contactLinks.map(({ img, alt, href, text }) => (
							<div
								className={`flex-header-center ${
									alt === "email" ? "max-sm:hidden" : ""
								}`}
								key={href}>
								<Image
									src={img}
									alt={alt}
									width={13}
									height={13}
								/>
								<a
									href={href}
									className='custom-header-link'>
									{text}
								</a>
							</div>
						))}
					</div>
				</div>
			</div>
			<div
				className={`${style.headerContent} ${style.headerSecondContent} header__content_bottom`}>
				<div className='relative flex justify-between items-center max-w-[1200px] mx-auto px-[30px]'>
					<a className='z-12'>
						<Image
							src='/assets/iconFor/site.svg'
							alt='icon'
							width={90}
							height={50}
						/>
					</a>

					<div
						className={`header__burger ${menuOpen ? "active" : ""} z-12`}
						onClick={toggleMenu}></div>

					<nav
						className={`nav flex justify-end items-center gap-5 w-full font-medium z-12 ${
							menuOpen ? "active" : ""
						}`}>
						<ul className='list flex list-none gap-[10px]'>
							{hyperLinks.map(({ href, text }) => (
								<li
									className='list__item'
									key={href}>
									<a
										href={href}
										className='custom-header-link text-[16px]'>
										{text}
									</a>
								</li>
							))}
						</ul>
					</nav>
				</div>
			</div>
		</header>
	);
};

export default Header;
