"use client";
import Image from "next/image";
import { contactLinks, hyperLinks, mediaLinks } from "../../data/data";

interface HeaderMobileMenuProps {
	menuOpen: boolean;
	toggleMenu: () => void;
}

const HeaderMobileMenu: React.FC<HeaderMobileMenuProps> = ({
	menuOpen,
	toggleMenu,
}) => {
	return (
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
	);
};

export default HeaderMobileMenu;
