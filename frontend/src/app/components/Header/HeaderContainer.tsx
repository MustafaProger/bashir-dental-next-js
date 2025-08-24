"use client";
import { useState } from "react";
import { useScrollProgress } from "../../hooks/useScrollProgress";
import Header from "./Header";

const HeaderContainer: React.FC = () => {
	const [menuOpen, setMenuOpen] = useState<boolean>(false);
	const { isScrolled, scrollProgress } = useScrollProgress();

	function toggleMenu() {
		setMenuOpen((prevState: boolean) => !prevState);
		document.body.classList.toggle("lock");
	}

	return (
		<Header
			menuOpen={menuOpen}
			isScrolled={isScrolled}
			scrollProgress={scrollProgress}
			toggleMenu={toggleMenu}
		/>
	);
};

export default HeaderContainer;
