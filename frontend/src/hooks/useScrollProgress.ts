"use client";
import { useState, useEffect } from "react";

export const useScrollProgress = () => {
	const [isScrolled, setIsScrolled] = useState<boolean>(false);
	const [scrollProgress, setScrollProgress] = useState<number>(0);

	useEffect(() => {
		let ticking = false;
		const scrollThreshold = 200;
		const animationRange = 100;

		const handleScroll = () => {
			if (!ticking) {
				requestAnimationFrame(() => {
					const scrollY = window.scrollY;
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

	return { isScrolled, scrollProgress };
};
