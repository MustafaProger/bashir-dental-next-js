"use client";
import React, { useMemo } from "react";
import { Star } from "lucide-react";

type Item = { rating: number };

export default function FeedbackAverage({
	avg,
	items,
	className = "",
}: {
	avg: number;
	items?: Item[]; // если передашь — покажем разбивку 5..1
	className?: string;
}) {
	const size = 140;
	const stroke = 10;
	const r = (size - stroke) / 2;
	const c = 2 * Math.PI * r;
	const pct = Math.max(0, Math.min(100, (avg / 5) * 100));
	const dash = (pct / 100) * c;

	// Разбивка по оценкам 5..1 + проценты
	const breakdown = useMemo(() => {
		if (!items?.length) return null;
		const total = items.length;
		return [5, 4, 3, 2, 1].map((stars) => {
			const count = items.filter(
				(i) => Math.round(Number(i.rating) || 0) === stars
			).length;
			const percent = total ? Math.round((count / total) * 100) : 0;
			return { stars, count, percent };
		});
	}, [items]);

	return (
		<div className={`w-full flex items-center gap-5 sm:gap-6 ${className}`}>
			{/* Круг со средним значением */}
			<div className='relative flex items-center justify-center'>
				<svg
					width={size}
					height={size}
					viewBox={`0 0 ${size} ${size}`}
					role='img'
					aria-label={`Средняя оценка ${avg.toFixed(1)} из 5`}>
					<circle
						cx={size / 2}
						cy={size / 2}
						r={r}
						stroke='#E5E7EB'
						strokeWidth={stroke}
						fill='none'
					/>
					<circle
						cx={size / 2}
						cy={size / 2}
						r={r}
						stroke='#FDC800'
						strokeWidth={stroke}
						fill='none'
						strokeLinecap='round'
						strokeDasharray={`${dash} ${c - dash}`}
						transform={`rotate(-90 ${size / 2} ${size / 2})`}
					/>
				</svg>

				<div className='absolute flex flex-col items-center'>
					<div className='flex items-baseline gap-1'>
						<span className='text-2xl font-semibold text-gray-900 tabular-nums'>
							{avg.toFixed(1)}
						</span>
						<span className='text-gray-500 text-sm'>/5</span>
					</div>
					<div
						className='mt-1 flex gap-0.5'
						aria-hidden='true'>
						{[...Array(5)].map((_, i) => (
							<Star
								key={i}
								size={16}
								className={
									i < Math.round(avg)
										? "text-yellow-400 fill-yellow-400"
										: "text-gray-300"
								}
							/>
						))}
					</div>
				</div>
			</div>

			{/* Разбивка по оценкам (если items переданы) */}
			{breakdown && (
				<div className='flex-1 min-w-[180px]'>
					<ul className='space-y-2'>
						{breakdown.map(({ stars, count, percent }) => (
							<li
								key={stars}
								className='flex items-center gap-3'>
								<div className='w-10 shrink-0 text-sm text-gray-600 tabular-nums'>
									{stars}★
								</div>
								<div className='relative h-2 w-full bg-gray-100 rounded-full overflow-hidden'>
									<div
										className='absolute inset-y-0 left-0 bg-yellow-400'
										style={{ width: `${percent}%` }}
										aria-hidden='true'
									/>
								</div>
								<div className='w-16 text-sm text-gray-600 tabular-nums'>
									{count}
								</div>
							</li>
						))}
					</ul>
				</div>
			)}
		</div>
	);
}
