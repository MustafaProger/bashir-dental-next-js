// src/components/CompareSlider/CompareSliderItem.tsx
"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import type { CompareSliderItem as CompareSliderItemProps } from "@/types";
import Image from "next/image";

const STRAPI_BASE = (process.env.NEXT_PUBLIC_STRAPI_URL ?? "").replace(
	/\/$/,
	""
);
const toSrc = (u?: string | null) =>
	!u ? "" : u.startsWith("http") ? u : `${STRAPI_BASE}${u}`;

export default function CompareSliderItem({
	work,
	index,
}: CompareSliderItemProps) {
	const containerRef = useRef<HTMLDivElement>(null);
	const thumbRef = useRef<HTMLButtonElement>(null);

	const [value, setValue] = useState(50); // 0..100
	const [dragging, setDragging] = useState(false);

	// кеш под размеры
	const rectRef = useRef<DOMRect | null>(null);
	const pointerIdRef = useRef<number | null>(null);
	const rafRef = useRef<number | null>(null);
	const nextXRef = useRef<number | null>(null);

	const afterUrl =
		work?.afterImage?.[0]?.formats?.large?.url ??
		work?.afterImage?.[0]?.url ??
		null;

	const beforeUrl =
		work?.beforeImage?.[0]?.formats?.large?.url ??
		work?.beforeImage?.[0]?.url ??
		null;

	const measure = useCallback(() => {
		const el = containerRef.current;
		if (el) rectRef.current = el.getBoundingClientRect();
	}, []);

	// rAF-петля, чтобы плавно применять последнее положение
	const loop = useCallback(() => {
		if (nextXRef.current == null || !rectRef.current) {
			rafRef.current = null;
			return;
		}
		const rect = rectRef.current;
		const px = Math.min(Math.max(nextXRef.current - rect.left, 0), rect.width);
		const pct = Math.round((px / rect.width) * 100);
		setValue((v) => (v === pct ? v : pct));
		rafRef.current = requestAnimationFrame(loop);
	}, []);

	const startRAF = () => {
		if (rafRef.current == null) rafRef.current = requestAnimationFrame(loop);
	};
	const stopRAF = () => {
		if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
		rafRef.current = null;
	};

	useEffect(() => {
		measure();
		const ro = new ResizeObserver(measure);
		if (containerRef.current) ro.observe(containerRef.current);
		return () => ro.disconnect();
	}, [measure]);

	useEffect(() => {
		const thumb = thumbRef.current;
		if (!thumb) return;

		const onPointerMove = (e: PointerEvent) => {
			if (pointerIdRef.current == null) return;
			e.preventDefault(); // важно для iOS
			nextXRef.current = e.clientX;
			startRAF();
		};

		const endDrag = () => {
			if (pointerIdRef.current != null) {
				try {
					thumb.releasePointerCapture?.(pointerIdRef.current);
				} catch {}
			}
			pointerIdRef.current = null;
			setDragging(false);
			nextXRef.current = null;
			stopRAF();
			window.removeEventListener("pointermove", onPointerMove);
			window.removeEventListener("pointerup", endDrag);
			window.removeEventListener("pointercancel", endDrag);
		};

		const onPointerDown = (e: PointerEvent) => {
			measure();
			pointerIdRef.current = e.pointerId;
			thumb.setPointerCapture?.(e.pointerId);
			setDragging(true);
			nextXRef.current = e.clientX;
			startRAF();
			window.addEventListener("pointermove", onPointerMove, { passive: false });
			window.addEventListener("pointerup", endDrag, { passive: false });
			window.addEventListener("pointercancel", endDrag, { passive: false });
		};

		thumb.addEventListener("pointerdown", onPointerDown, { passive: false });

		return () => {
			thumb.removeEventListener("pointerdown", onPointerDown);
			window.removeEventListener("pointermove", onPointerMove);
			window.removeEventListener("pointerup", endDrag);
			window.removeEventListener("pointercancel", endDrag);
			stopRAF();
		};
	}, [measure, loop]);

	// клавиатура
	const onKeyDown: React.KeyboardEventHandler<HTMLButtonElement> = (e) => {
		const step = e.shiftKey ? 10 : 2;
		if (e.key === "ArrowLeft") {
			e.preventDefault();
			setValue((v) => Math.max(0, v - step));
		} else if (e.key === "ArrowRight") {
			e.preventDefault();
			setValue((v) => Math.min(100, v + step));
		} else if (e.key === "Home") {
			e.preventDefault();
			setValue(0);
		} else if (e.key === "End") {
			e.preventDefault();
			setValue(100);
		}
	};

	return (
		<div className='relative overflow-hidden rounded-lg'>
			<div
				ref={containerRef}
				className='relative h-full select-none'
				style={{ touchAction: "pan-y pinch-zoom" }}>
				{/* Левый слой (после) */}
				<div
					className='absolute top-0 left-0 h-full overflow-hidden z-10 will-change-[width]'
					style={{ width: `${value}%` }}
					data-image-comparison-overlay=''>
					<figure className='relative h-full'>
						{afterUrl && (
							<Image
								width={1200}
								height={800}
								src={toSrc(afterUrl)}
								alt='После'
								className='absolute w-full h-full object-cover object-left'
								priority={index < 3}
								draggable={false}
							/>
						)}
					</figure>
				</div>

				{/* Вертикальная линия — плавно исчезает/появляется */}
				<div
					className='absolute top-0 h-full z-20 pointer-events-none'
					style={{
						left: `${value}%`,
						transform: "translateX(-50%)",
						opacity: dragging ? 0 : 1,
						transition: "opacity .18s ease",
					}}
					aria-hidden>
					<div className='w-0.5 h-full bg-white/90' />
				</div>

				{/* Ручка — плавная прозрачность + сдвиг на +2px */}
				<button
					ref={thumbRef}
					type='button'
					aria-label='Сравнить (потяните)'
					onKeyDown={onKeyDown}
					className='absolute z-30 rounded-full text-white focus:opacity-0'
					style={{
						left: `${value}%`,
						top: "50%",
						transform: "translate(calc(-50% + 4px), -50%)",
						width: "48px",
						height: "48px",
						padding: 0,
						touchAction: "none",
						opacity: dragging ? 0 : 1,
						transition: "opacity .38s ease", // только opacity, позицию не анимируем
					}}>
					<div
						className='grid place-items-center rounded-full'
						style={{
							width: 40,
							height: 40,
							background: "#01B5E0",
							willChange: "transform",
						}}>
						<svg
							width='22'
							height='12'
							viewBox='0 0 18 10'
							fill='currentColor'>
							<path d='M12.121 4.703V.488c0-.302.384-.454.609-.24l4.42 4.214a.33.33 0 0 1 0 .481l-4.42 4.214c-.225.215-.609.063-.609-.24V4.703z' />
							<path d='M5.879 4.703V.488c0-.302-.384-.454-.609-.24L.85 4.462a.33.33 0 0 0 0 .481l4.42 4.214c.225.215.609.063.609-.24V4.703z' />
						</svg>
					</div>
				</button>

				{/* Правый слой (до) */}
				<div className='relative h-full'>
					<figure className='relative h-full'>
						{beforeUrl && (
							<Image
								width={1200}
								height={800}
								src={toSrc(beforeUrl)}
								alt='До'
								className='w-full h-full object-cover'
								priority={index < 3}
								draggable={false}
							/>
						)}
					</figure>
				</div>
			</div>
		</div>
	);
}
