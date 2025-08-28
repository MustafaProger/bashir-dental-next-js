"use client";
import React, { useMemo } from "react";
import { Star, MessageSquarePlus } from "lucide-react";
import FeedbackAverage from "./FeedbackAverage";

type ReviewItem = { rating: number; createdAt?: string };

function pluralizeReviews(n: number) {
	const mod10 = n % 10;
	const mod100 = n % 100;
	if (mod10 === 1 && mod100 !== 11) return "отзыв";
	if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20))
		return "отзыва";
	return "отзывов";
}

export default function FeedbackWrite({
	items,
	ctaHref,
	onCtaClick,
}: {
	items: ReviewItem[];
	className?: string;
	ctaHref?: string; // например: "/reviews/new"
	onCtaClick?: () => void;
}) {
	const total = items?.length ?? 0;

	const avg = useMemo(() => {
		if (!total) return 0;
		const sum = items.reduce((s, i) => s + (Number(i.rating) || 0), 0);
		return sum / total;
	}, [items, total]);

	return (
		<div
			className={`w-full bg-white rounded-2xl border border-none pb-[20px]`}
			aria-label='Отзывы — сводка и добавление'>

			<div className='grid grid-cols-1 min-[1080px]:grid-cols-2 gap-4 sm:gap-6'>
				{/* Левый блок: средняя оценка */}
				<div className='flex items-center gap-5 rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-6'>
					<FeedbackAverage
						avg={avg}
						items={items}
					/>
				</div>

				{/* Правый блок: CTA оставить отзыв */}
				<div className='w-full bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-6'>
					<div className='flex items-start gap-3'>
						<div className='shrink-0 flex items-center justify-center w-10 h-10 rounded-lg bg-[#01B5DF]/10 text-[#01B5DF] max-[425px]:hidden'>
							<MessageSquarePlus size={20} />
						</div>
						<div className='flex-1'>
							<h3 className='text-base sm:text-lg font-semibold text-gray-900'>
								Хотите оставить отзыв?
							</h3>
							<p className='text-sm text-gray-600 mt-1'>
								Поделитесь впечатлениями — это помогает другим пациентам.
							</p>
							<div className='mt-4'>
								{ctaHref ? (
									<a
										href={ctaHref}
										className='inline-flex items-center gap-2 btn-primary'>
										<MessageSquarePlus size={18} />
										Написать отзыв
									</a>
								) : (
									<button
										onClick={onCtaClick}
										className='btn-primary'>
										<MessageSquarePlus size={18} />
										Написать отзыв
									</button>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
