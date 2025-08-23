"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { contactLinks, hyperLinks, mediaLinks } from "../data/data";

const Header: React.FC = () => {
	const [menuOpen, setMenuOpen] = useState<boolean>(false);
	const [isScrolled, setIsScrolled] = useState<boolean>(false);
	const [scrollProgress, setScrollProgress] = useState<number>(0);

	// Эффект для плавного отслеживания скролла
	useEffect(() => {
		let ticking = false;
		const scrollThreshold = 200;
		const animationRange = 100; // Диапазон для плавной анимации

		const handleScroll = () => {
			if (!ticking) {
				requestAnimationFrame(() => {
					const scrollY = window.scrollY;
					// Плавный расчет прогресса от 0 до 1
					const progress = Math.min(
						Math.max((scrollY - scrollThreshold) / animationRange, 0),
						1
					);
					setScrollProgress(progress);
					setIsScrolled(scrollY > scrollThreshold);
					ticking = false;
				});
				ticking = true;
			}
		};

		window.addEventListener("scroll", handleScroll);
		handleScroll();

		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	function toggleMenu() {
		setMenuOpen((prevState: boolean) => !prevState);
		document.body.classList.toggle("lock");
	}

	// Вычисляем значения для плавной анимации
	const scale = 1 - 0.05 * scrollProgress; // От 1 до 0.95
	const borderRadius = 16 * scrollProgress; // От 0 до 16px
	const blurIntensity = 12 * scrollProgress; // От 0 до 12px
	const opacity = 1 - 0.2 * scrollProgress; // От 1 до 0.8
	const marginTop = 12 * scrollProgress; // От 0 до 12px
	const widthPercentage = 100 - 15 * scrollProgress; // От 100% до 85%

	const topBarHeight = Math.max(0, 60 - 60 * Math.min(scrollProgress * 2, 1));

	return (
		<>
			<header
				className='fixed top-0 z-10 min-w-[280px] transition-all duration-300 ease-out'
				style={{
					width: `${widthPercentage}%`,
					left: "50%",
					transform: `translateX(-50%) scale(${scale})`,
					borderRadius: `${borderRadius}px`,
					backdropFilter: `blur(${blurIntensity}px)`,
					backgroundColor: `rgba(255, 255, 255, ${0.9 * scrollProgress})`,
					marginTop: `${marginTop}px`,
					boxShadow: `0 4px ${6 * scrollProgress}px rgba(0, 0, 0, ${
						0.1 * scrollProgress
					})`,
					overflow: "hidden",
				}}>
				{/* Первая часть хедера */}
				{topBarHeight > 0 && (
					<div
						className={` bg-[#f5fbff] backdrop-blur-3xl`}
						style={{ height: `${topBarHeight}px` }}>
						<div className='relative h-15 flex justify-between mx-auto px-[30px] z-10'>
							<div className='flex-header-center'>
								{mediaLinks.map(({ href, img, alt }) => (
									<a
										key={href}
										href={href}
										target='_blank'
										className='transition-transform duration-300 hover:scale-110'>
										<Image
											src={img}
											alt={alt}
											width={25}
											height={25}
											loading='lazy'
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
										key={href}
										style={{ opacity: 1 - 0.2 * scrollProgress }}>
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
				)}

				{/* Вторая часть хедера */}
				<div className={`header__content_bottom bg-[#fff]`}>
					<div className='relative flex justify-between items-center mx-auto px-[30px]'>
						<a
							className='z-12'
							href='#hero'>
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

			<div
				className={`fixed inset-0 z-40 bg-white/98 backdrop-blur-xl transition-all duration-500 lg:hidden ${
					menuOpen
						? "opacity-100 visible"
						: "opacity-0 invisible pointer-events-none"
				}`}>
				<div className='flex flex-col justify-center items-center gap-8 px-6 h-full'>
					{/* Navigation Links */}
					<nav className='space-y-8 text-center'>
						{hyperLinks.map(({ href, text }, index) => (
							<a
								key={href}
								href={href}
								onClick={toggleMenu}
								className='block text-2xl sm:text-3xl font-semibold text-gray-800 hover:text-[#01B5E0] transition-all duration-300 group'
								style={{
									opacity: menuOpen ? 1 : 0,
									transform: menuOpen ? "translateY(0)" : "translateY(-30px)",
									transitionDelay: `${index * 100}ms`,
								}}>
								<span className='relative'>
									{text}
									<span className='absolute inset-x-0 -bottom-2 h-1 bg-gradient-to-r bg-[#01B5E0] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-full'></span>
								</span>
							</a>
						))}
					</nav>

					{/* Contact Links */}
					<div className='space-y-4'>
						{contactLinks.map(({ href, text, alt }) => (
							<a
								key={href}
								href={href}
								className='flex items-center justify-center gap-2 text-gray-600 hover:text-[#01B5E0] transition-colors duration-300'>
								{alt === "email" ? (
									<Image
										src={contactLinks[0].img}
										alt={contactLinks[0].alt}
										width={13}
										height={13}
									/>
								) : (
									<Image
										src={contactLinks[1].img}
										alt={contactLinks[1].alt}
										width={13}
										height={13}
									/>
								)}
								<span className='font-medium text-sm sm:text-base'>{text}</span>
							</a>
						))}
					</div>

					{/* Social Media Links */}
					<div className='flex items-center gap-4'>
						{mediaLinks.map(({ href, img, alt }) => (
							<a
								key={href}
								href={href}
								target='_blank'
								rel='noopener noreferrer'
								className='w-12 h-12 bg-gradient-to-br bg-[#01B5E0] rounded-xl flex items-center justify-center hover:scale-110 transition-transform duration-300 shadow-lg'>
								<Image
									src={img}
									alt={alt}
									width={6}
									height={6}
									className='w-6 h-6 brightness-0 invert'
								/>
							</a>
						))}
					</div>
				</div>
			</div>
		</>
	);
};

export default Header;
