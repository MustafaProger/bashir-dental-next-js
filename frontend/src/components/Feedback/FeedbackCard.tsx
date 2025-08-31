"use client";

import React, { useState } from "react";
import { Star, ChevronDown, ChevronUp } from "lucide-react";
import { Feedback } from "@/types";
import { motion, AnimatePresence, type Variants } from "framer-motion";

const cardVariants = {
	hidden: { opacity: 0, y: 10 },
	show: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.4, ease: "easeOut" as const },
	},
} satisfies Variants;

export default function FeedbackCard({
	name,
	rating,
	createdAt,
	review,
}: Feedback) {
	const isLong = review.length > 100;
	const [isExpanded, setIsExpanded] = useState(!isLong);

	const highlightBashir = (text: string) =>
		text.replace(
			/(Башир[а-яё]*)/gi,
			'<span class="bg-blue-100 text-[#01B5DF] px-1 rounded font-semibold">$1</span>'
		);

	const truncated =
		isLong && !isExpanded ? review.substring(0, 100) + "..." : review;

	const formatDate = (isoDate: string) =>
		new Date(isoDate).toLocaleDateString("ru-RU", {
			day: "numeric",
			month: "long",
			year: "numeric",
		});

	return (
		<motion.div
			variants={cardVariants}
			initial='hidden'
			animate='show'
			whileHover={{ y: -2 }}
			className='relative bg-white rounded-xl shadow p-6 border-l-4 border-[#01B5DF] transition-shadow duration-300 hover:shadow'>
			<div className='flex items-start justify-between mb-4'>
				<div className='flex-1 min-w-0'>
					<h3 className='font-semibold text-gray-800 text-lg break-words [overflow-wrap:anywhere]'>
						{name}
					</h3>
					<p className='text-gray-500 text-sm pt-[3px]'>
						{formatDate(createdAt)}
					</p>
				</div>
				<div className='flex items-center gap-1 bg-yellow-50 px-3 py-1 rounded-full'>
					{[...Array(5)].map((_, i) => (
						<Star
							key={i}
							size={16}
							className={
								i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
							}
						/>
					))}
					<span className='text-sm font-medium text-gray-700 ml-1'>
						{rating}
					</span>
				</div>
			</div>

			{/* Текст отзыва с плавным раскрытием */}
			<div className='text-gray-700 leading-relaxed whitespace-pre-wrap break-words [overflow-wrap:anywhere]'>
				<AnimatePresence
					initial={false}
					mode='wait'>
					<motion.div
						key={isExpanded ? "full" : "short"}
						initial={{ opacity: 0, height: 0 }}
						animate={{ opacity: 1, height: "auto" }}
						exit={{ opacity: 0, height: 0 }}
						transition={{ duration: 0.35, ease: "easeOut" }}>
						<div
							dangerouslySetInnerHTML={{ __html: highlightBashir(truncated) }}
						/>
					</motion.div>
				</AnimatePresence>

				{isLong && (
					<button
						onClick={() => setIsExpanded((v) => !v)}
						aria-expanded={isExpanded}
						className='flex items-center gap-1 mt-3 text-[#01B5DF] hover:opacity-90 font-medium text-sm transition-colors duration-200'>
						{isExpanded ? (
							<>
								Свернуть <ChevronUp size={16} />
							</>
						) : (
							<>
								Читать полностью <ChevronDown size={16} />
							</>
						)}
					</button>
				)}
			</div>

			{/* Декор */}
			<motion.div
				aria-hidden
				className='absolute top-6 right-6 text-blue-100 text-6xl font-serif opacity-20 pointer-events-none select-none'
				animate={{ y: [0, -2, 0] }}
				transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}>
				"
			</motion.div>
		</motion.div>
	);
}
