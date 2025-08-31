// src/lib/motion.ts
import { Variants } from "framer-motion";

export const fadeUp: Variants = {
	hidden: { opacity: 0, y: 20 },
	show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export const fade: Variants = {
	hidden: { opacity: 0 },
	show: { opacity: 1, transition: { duration: 0.5, ease: "easeOut" } },
};

// Контейнер для стэггера детей
export const staggerContainer = (delay = 0, stagger = 0.12): Variants => ({
	hidden: {},
	show: {
		transition: { delayChildren: delay, staggerChildren: stagger },
	},
});
