"use client";

import React, { useState } from "react";
import { Star, ChevronDown, ChevronUp } from "lucide-react";
import { Feedback } from "@/types";

interface FeedbackCardProps {
	feedbacks: Feedback[];
}

export const FeedbackCard = ({ feedbacks }: FeedbackCardProps) => {
	const [expanded, setExpanded] = useState(feedbacks.map((f) => !f.isLong));

	const toggleExpand = (index: number) => {
		setExpanded((prev) => prev.map((item, i) => (i === index ? !item : item)));
	};

	const highlightBashir = (text: string) => {
		return text.replace(
			/(Башир[а-яё]*)/gi,
			'<span class="bg-blue-100 text-[#01B5DF] px-1 rounded font-semibold">$1</span>'
		);
	};

	return (
		<div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mx-auto max-w-[1200px]'>
			{feedbacks.map(({ id, name, date, rating, review, isLong }, index) => {
				const truncatedReview =
					isLong && !expanded[index]
						? review.substring(0, 150) + "..."
						: review;

				return (
					<div
						key={id}
						className='relative'>
						<div className='bg-white rounded-xl shadow-lg p-6 border-l-4 border-[#01B5DF] hover:shadow-xl transition-all duration-300 hover:-translate-y-1'>
							<div className='flex items-start justify-between mb-4'>
								<div className='flex-1'>
									<h3 className='font-semibold text-gray-800 text-lg'>
										{name}
									</h3>
									<p className='text-gray-500 text-sm'>{date}</p>
								</div>
								<div className='flex items-center gap-1 bg-yellow-50 px-3 py-1 rounded-full'>
									{[...Array(5)].map((_, i) => (
										<Star
											key={i}
											size={16}
											className={`${
												i < rating
													? "text-yellow-400 fill-yellow-400"
													: "text-gray-300"
											}`}
										/>
									))}
									<span className='text-sm font-medium text-gray-700 ml-1'>
										{rating}
									</span>
								</div>
							</div>

							<div className='text-gray-700 leading-relaxed'>
								<div
									dangerouslySetInnerHTML={{
										__html: highlightBashir(truncatedReview),
									}}
								/>

								{isLong && (
									<button
										onClick={() => toggleExpand(index)}
										className='flex items-center gap-1 mt-3 text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors duration-200'>
										{expanded[index] ? (
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

							<div className='absolute top-6 right-6 text-blue-100 text-6xl font-serif opacity-20 pointer-events-none'>
								"
							</div>
						</div>
					</div>
				);
			})}
		</div>
	);
};
