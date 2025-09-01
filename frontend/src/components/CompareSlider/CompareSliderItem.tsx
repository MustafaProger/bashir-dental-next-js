"use client";

import { useRef, useEffect } from "react";
import type { CompareSliderItem as CompareSliderItemProps } from "@/types";
import Image from "next/image";

const STRAPI_BASE = process.env.NEXT_PUBLIC_STRAPI_URL ?? "";

const toSrc = (u?: string | null) => {
	if (!u) return "";
	if (u.startsWith("http://") || u.startsWith("https://")) return u;
	return `${STRAPI_BASE}${u}`;
};

export default function CompareSliderItem({
	work,
	index,
}: CompareSliderItemProps) {
	const sliderRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const initSlider = (element: HTMLDivElement) => {
			const sliderRange = element.querySelector<HTMLInputElement>(
				"[data-image-comparison-range]"
			);
			const thumb = element.querySelector<HTMLSpanElement>(
				"[data-image-comparison-thumb]"
			);
			if (!sliderRange || !thumb) return;

			const moveSliderThumb = (e: MouseEvent) => {
				const sliderWrapper = sliderRange.parentElement;
				if (!sliderWrapper) return;
				const rect = sliderWrapper.getBoundingClientRect();
				let position = e.clientY - rect.top - 20;
				position = Math.max(
					-20,
					Math.min(position, sliderWrapper.offsetHeight - 20)
				);
				thumb.style.top = `${position}px`;
			};

			const moveSliderRange = (e: Event) => {
				const target = e.target as HTMLInputElement;
				const value = target.value;
				const slider = element.querySelector<HTMLDivElement>(
					"[data-image-comparison-slider]"
				);
				const overlay = element.querySelector<HTMLDivElement>(
					"[data-image-comparison-overlay]"
				);
				if (slider) slider.style.left = `${value}%`;
				if (overlay) overlay.style.width = `${value}%`;
			};

			const mouseMoveHandler = (e: MouseEvent) => moveSliderThumb(e);
			const mouseUpHandler = () =>
				element.removeEventListener("mousemove", mouseMoveHandler);

			sliderRange.addEventListener("mousedown", (e) => {
				moveSliderThumb(e as unknown as MouseEvent);
				element.addEventListener("mousemove", mouseMoveHandler);
			});
			sliderRange.addEventListener("mouseup", mouseUpHandler);
			sliderRange.addEventListener("mouseleave", mouseUpHandler);

			sliderRange.addEventListener("input", moveSliderRange);
			sliderRange.addEventListener("change", moveSliderRange);
		};

		if (sliderRef.current) initSlider(sliderRef.current);
	}, []);

	const afterUrl =
		work?.afterImage?.[0]?.formats?.large?.url ??
		work?.afterImage?.[0]?.url ??
		null;

	const beforeUrl =
		work?.beforeImage?.[0]?.formats?.large?.url ??
		work?.beforeImage?.[0]?.url ??
		null;

	return (
		<div
			className='relative overflow-hidden rounded-lg'
			key={work.id}>
			<div
				className='relative h-full group'
				ref={sliderRef}>
				<input
					type='range'
					min='0'
					max='100'
					defaultValue='50'
					className='absolute left-0 w-full h-full opacity-0 cursor-ew-resize z-2'
					data-image-comparison-range=''
					aria-label='Слайдер сравнения'
				/>

				{/* Левый слой (overlay) — условно "после" */}
				<div
					className='absolute top-0 left-0 w-1/2 h-full overflow-hidden z-1'
					data-image-comparison-overlay=''>
					<figure className='relative h-full'>
						{!!afterUrl && (
							<Image
								width={600}
								height={400}
								src={toSrc(afterUrl)}
								alt='После'
								className='absolute w-full h-full object-cover object-left'
							/>
						)}
					</figure>
				</div>

				{/* Вертикальный ползунок */}
				<div
					className='absolute top-0 left-1/2 w-0.5 h-full bg-white z-1 transition-opacity duration-300 group-active:opacity-0'
					data-image-comparison-slider=''>
					<span
						className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 
            bg-[#01B5E0] text-white rounded-full flex items-center justify-center 
            shadow-lg transition-all duration-300 scale-100 group-hover:scale-110 group-active:scale-95 group-active:opacity-50 z-1'
						data-image-comparison-thumb=''>
						<svg
							className='w-5 h-3'
							xmlns='http://www.w3.org/2000/svg'
							viewBox='0 0 18 10'
							fill='currentColor'>
							<path d='M12.121 4.703V.488c0-.302.384-.454.609-.24l4.42 4.214a.33.33 0 0 1 0 .481l-4.42 4.214c-.225.215-.609.063-.609-.24V4.703z' />
							<path d='M5.879 4.703V.488c0-.302-.384-.454-.609-.24L.85 4.462a.33.33 0 0 0 0 .481l4.42 4.214c.225.215.609.063.609-.24V4.703z' />
						</svg>
					</span>
				</div>

				{/* Правый слой — условно "до" */}
				<div className='relative h-full'>
					<figure className='relative h-full'>
						{!!beforeUrl && (
							<Image
								width={600}
								height={400}
								src={toSrc(beforeUrl)}
								alt='До'
								className='w-full h-full object-cover'
							/>
						)}
					</figure>
				</div>
			</div>
		</div>
	);
}
