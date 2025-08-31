"use client";
import Image from "next/image";
import { contactLinks, hyperLinks, mediaLinks } from "../../data/data";
import HeaderMobileMenu from "./HeaderMobileMenu";
import type { Header } from "@/types";

const Header: React.FC<Header> = ({
	menuOpen,
	isScrolled,
	scrollProgress,
	toggleMenu,
}) => {
	// Вычисляем значения для плавной анимации
	const scale = 1 - 0.05 * scrollProgress;
	const borderRadius = 16 * scrollProgress;
	const blurIntensity = 12 * scrollProgress;
	const opacity = 1 - 0.2 * scrollProgress;
	const marginTop = 12 * scrollProgress;
	const widthPercentage = 100 - 15 * scrollProgress;
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
						className={`bg-[#f5fbff] backdrop-blur-3xl`}
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
							className='z-12 w-[90px] h-[75px]'
							href='#hero'>
							<Image
								src='/assets/iconFor/site.svg'
								alt='icon'
								width={90}
								height={75}
								className="object-contain"
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

			<HeaderMobileMenu
				menuOpen={menuOpen}
				toggleMenu={toggleMenu}
			/>
		</>
	);
};

export default Header;
