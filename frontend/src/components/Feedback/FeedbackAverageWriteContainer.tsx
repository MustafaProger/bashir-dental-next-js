"use client";
import React, { useMemo } from "react";
import { MessageSquarePlus } from "lucide-react";
import FeedbackAverage from "./FeedbackAverage";
import { motion, type Variants } from "framer-motion";

type ReviewItem = { rating: number; createdAt?: string };

const gridVariants = {
	hidden: {},
	show: {
		transition: { staggerChildren: 0.12, delayChildren: 0.05 },
	},
} satisfies Variants;

const cardVariants = {
	hidden: { opacity: 0, y: 14 },
	show: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.5, ease: "easeOut" as const },
	},
} satisfies Variants;

export default function FeedbackAverageWriteContainer({
	items,
	ctaHref,
}: {
	items: ReviewItem[];
	className?: string;
	ctaHref?: string;
}) {
	const total = items?.length ?? 0;

	const avg = useMemo(() => {
		if (!total) return 0;
		const sum = items.reduce((s, i) => s + (Number(i.rating) || 0), 0);
		return sum / total;
	}, [items, total]);

	return (
		<div
			className='w-full bg-[#F8F9FA] rounded-2xl border border-none pb-[20px]'
			aria-label='Отзывы — сводка и добавление'>
			<motion.div
				className='grid grid-cols-1 min-[900px]:grid-cols-2 gap-4 sm:gap-6'
				variants={gridVariants}
				initial='hidden'
				whileInView='show'
				viewport={{ once: true, amount: 0.25 }}>
				{/* Левый блок: средняя оценка (плавное появление) */}
				<motion.div
					variants={cardVariants}
					className='bg-white flex items-center gap-5 rounded-2xl border border-gray-100 shadow p-5 sm:p-6'>
					<FeedbackAverage
						avg={avg}
						items={items}
					/>
				</motion.div>

				{/* Правый блок: CTA (плавное появление + лёгкий hover) */}
				<motion.div
					variants={cardVariants}
					whileHover={{ y: -2 }}
					className='w-full bg-white rounded-2xl border border-gray-100 shadow p-5 sm:p-6'>
					<div className='flex items-start gap-3'>
						<motion.div
							className='shrink-0 max-[425px]:hidden flex items-center justify-center w-10 h-10 rounded-lg bg-[#01B5DF]/10 text-[#01B5DF]'
							// еле заметное «дыхание» иконки на ховере всего блока
							whileHover={{ rotate: [-2, 2, 0] }}
							transition={{ duration: 0.6, ease: "easeInOut", repeat: 0 }}>
							<MessageSquarePlus size={20} />
						</motion.div>

						<div className='flex-1'>
							<h3 className='text-base sm:text-lg font-semibold text-gray-900'>
								Хотите оставить отзыв?
							</h3>
							<p className='text-sm text-gray-600 mt-1'>
								Поделитесь впечатлениями — это помогает другим пациентам.
							</p>

							<div className='mt-4'>
								<motion.a
									href={ctaHref}
									className='inline-flex items-center gap-2 btn-primary'
									whileTap={{ scale: 0.98 }}>
									<MessageSquarePlus size={18} />
									Написать отзыв
								</motion.a>
							</div>
						</div>
					</div>
				</motion.div>
			</motion.div>
		</div>
	);
}
