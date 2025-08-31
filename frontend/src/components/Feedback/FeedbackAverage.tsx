// src/components/Feedback/FeedbackAverage.tsx
"use client";

import React, { useMemo, useRef, useEffect } from "react";
import { Star } from "lucide-react";
import {
	motion,
	useInView,
	useMotionValue,
	useTransform,
	animate,
	useReducedMotion,
} from "framer-motion";

type Item = { rating: number };

export default function FeedbackAverage({
	avg,
	items,
}: {
	avg: number;
	items?: Item[]; // если передашь — покажем разбивку 5..1
}) {
	// ---- Геометрия круга
	const size = 140;
	const stroke = 10;
	const r = (size - stroke) / 2;
	const c = 2 * Math.PI * r;

	// Итоговый процент круга
	const pct = Math.max(0, Math.min(100, (avg / 5) * 100));

	// ---- Разбивка 5..1
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

	// ---- Триггер анимации при входе в вьюпорт
	const ref = useRef<HTMLDivElement | null>(null);
	const inView = (useInView(ref, { once: true, amount: 0.35 }) ??
		false) as boolean;
	const reduce = (useReducedMotion() ?? false) as boolean;

	// ---- Общий прогресс 0..100: рулит дугой и числом
	const progress = useMotionValue(0);
	const dashLen = useTransform(progress, (p) => (p / 100) * c); // длина дуги
	const num = useTransform(progress, (p) => (p / 100) * avg); // значение числа
	const numText = useTransform(num, (v) => v.toFixed(1)); // форматированное число
	const dashArray = useTransform(dashLen, (d) => `${d} ${c - d}`);

	useEffect(() => {
		if (!inView) return;
		if (reduce) {
			progress.set(pct);
			return;
		}
		const controls = animate(progress, pct, {
			duration: 0.9,
			ease: [2, 2, 2, 2], // easeOut
		});
		return () => controls.stop();
	}, [inView, pct, progress, reduce]);

	return (
		<div
			ref={ref}
			className='w-full flex items-center gap-5 sm:gap-6'>
			{/* Круг со средним значением (анимируется) */}
			<div className='relative flex items-center justify-center max-[375px]:w-full'>
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
					<motion.circle
						cx={size / 2}
						cy={size / 2}
						r={r}
						stroke='#FDC800'
						strokeWidth={stroke}
						fill='none'
						strokeLinecap='round'
						// рисуем дугу через dasharray
						style={{
							strokeDasharray: dashArray,
						}}
						transform={`rotate(-90 ${size / 2} ${size / 2})`}
					/>
				</svg>

				<div className='absolute flex flex-col items-center'>
					<div className='flex items-baseline gap-1'>
						{/* число растёт синхронно с кругом */}
						<motion.span className='text-2xl font-semibold text-gray-900 tabular-nums'>
							{numText}
						</motion.span>
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

			{/* Прогресс-бары 5..1 (если есть items) */}
			{breakdown && (
				<div className='flex-1 max-[375px]:hidden'>
					<ul className='space-y-2'>
						{breakdown.map(({ stars, count, percent }) => (
							<li
								key={stars}
								className='flex items-center gap-3'>
								<div className='w-7 shrink-0 text-sm text-gray-600 tabular-nums max-[400px]:hidden'>
									{stars} ★
								</div>
								<div className='relative h-2 w-full bg-gray-100 rounded-full overflow-hidden'>
									<AnimatedBar
										percent={percent}
										inView={inView}
										reduce={reduce}
									/>
								</div>
								<div className='w-16 text-sm text-gray-600 tabular-nums max-[400px]:w-50'>
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

/** Анимируемая полоска прогресса (5..1) */
function AnimatedBar({
	percent,
	inView,
	reduce,
}: {
	percent: number;
	inView: boolean;
	reduce: boolean;
}) {
	const mv = useMotionValue(0);
	const widthText = useTransform(mv, (v) => `${v}%`);

	useEffect(() => {
		if (!inView) return;
		if (reduce) {
			mv.set(percent);
			return;
		}
		const controls = animate(mv, percent, {
			duration: 0.7,
			ease: [2, 2, 2, 2],
			delay: 0.3, // лёгкая задержка после круга
		});
		return () => controls.stop();
	}, [inView, percent, mv, reduce]);

	return (
		<motion.div
			className='absolute inset-y-0 left-0 bg-yellow-400'
			style={{ width: widthText }}
			aria-hidden='true'
		/>
	);
}
