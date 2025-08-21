"use client";

import { useEffect, useRef, useState } from "react";
import { Work } from "@/types";
import { getWorks } from "@/services/works";
import Image from "next/image";

export default function CompareSlider() {
	const [works, setWorks] = useState<Work[] | undefined>(undefined);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const sliderRefs = useRef<(HTMLDivElement | null)[]>([]);
	const baseURL = "http://localhost:1337";

	useEffect(() => {
		setLoading(true);
		setError(null);

		getWorks(baseURL)
			.then((response) => {
				console.log("Полученные работы:", response);
				setWorks(response.data);
				setLoading(false);
			})
			.catch((error) => {
				console.error("Ошибка при загрузке работ:", error);
				setError(error.message);
				setLoading(false);
			});
	}, []);

	useEffect(() => {
		if (!works || works.length === 0) return;

		console.log("Инициализация слайдеров для", works.length, "работ");

		sliderRefs.current.forEach((element, index) => {
			if (!element) {
				console.log(`Элемент ${index} не найден`);
				return;
			}

			const sliderRange =
				element.querySelector<HTMLInputElement>("[data-range]");
			const thumb = element.querySelector<HTMLSpanElement>("[data-thumb]");
			const slider = element.querySelector<HTMLDivElement>("[data-slider]");
			const overlay = element.querySelector<HTMLDivElement>("[data-overlay]");

			if (!sliderRange || !thumb || !slider || !overlay) {
				console.log(`Не все элементы слайдера найдены для работы ${index}`);
				return;
			}

			console.log(`Слайдер ${index} инициализирован`);

			const setSliderState = (e: Event) => {
				// Обновляем состояние активного слайдера
				if (e.type === "input") {
					thumb.classList.add("active");
				} else {
					thumb.classList.remove("active");
				}
			};

			const moveSliderThumb = (e: MouseEvent) => {
				const rect = element.getBoundingClientRect();
				let position = e.clientY - rect.top - 20;
				position = Math.max(-20, Math.min(position, element.offsetHeight - 20));
				thumb.style.top = `${position}px`;
			};

			const moveSliderRange = (e: Event) => {
				const value = (e.target as HTMLInputElement).value;
				console.log(`Слайдер ${index}: значение = ${value}%`);
				// Управление позицией слайдера (полоска)
				slider.style.left = `${value}%`;
				// Управление шириной overlay (до слайдера)
				overlay.style.width = `${value}%`;
				setSliderState(e);
			};

			const mouseMoveHandler = (e: MouseEvent) => moveSliderThumb(e);
			const mouseUpHandler = () => {
				element.removeEventListener("mousemove", mouseMoveHandler);
			};

			sliderRange.addEventListener("mousedown", (e) => {
				moveSliderThumb(e as MouseEvent);
				thumb.classList.add("active-thumb");
				element.addEventListener("mousemove", mouseMoveHandler);
			});

			sliderRange.addEventListener("mouseup", () => {
				mouseUpHandler();
				thumb.classList.remove("active-thumb");
			});

			sliderRange.addEventListener("mouseleave", () => {
				mouseUpHandler();
				thumb.classList.remove("active-thumb");
			});

			sliderRange.addEventListener("input", moveSliderRange);
			sliderRange.addEventListener("change", moveSliderRange);
		});
	}, [works]);

	if (loading) {
		return (
			<section
				id='works'
				className='text-center py-10'>
				<h1 className='text-4xl font-bold mb-10'>Мои работы</h1>
				<div className='flex justify-center items-center py-20'>
					<div className='animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500'></div>
				</div>
			</section>
		);
	}

	if (error) {
		return (
			<section
				id='works'
				className='text-center py-10'>
				<h1 className='text-4xl font-bold mb-0'>Мои работы</h1>
				<div className='text-red-500 pt-10'>
					<p>Ошибка загрузки: {error}</p>
				</div>
			</section>
		);
	}

	return (
		<section
			id='works'
			className='text-center py-10'>
			<h1 className='text-4xl font-bold mb-10'>Мои работы</h1>

			<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto'>
				{works && works?.length !== 0 ? (
					works.map((work, index) => {
						const before = work.beforeImage?.[0]?.url;
						const after = work.afterImage?.[0]?.url;

						if (!before || !after) return null;

						return (
							<div
								key={work.id}
								ref={(el) => {
									sliderRefs.current[index] = el;
								}}
								className='relative group overflow-hidden rounded-[8px]'>
								<input
									type='range'
									min='0'
									max='100'
									defaultValue='50'
									data-range
									className='peer absolute top-0 left-0 w-full h-full appearance-none z-2 bg-transparent'
								/>

								{/* Overlay container with fixed position and overflow-hidden */}
								<div
									className='absolute top-0 left-0 w-[50%] h-full overflow-hidden z-1'
									data-overlay>
									<div className='overflow-hidden relative w-full h-full'>
										<Image
											src={`${baseURL}${before}`}
											alt='Before'
											width={300}
											height={300}
											className='w-full h-full object-cover object-left-center'
										/>
									</div>
								</div>

								{/* Slider handle and line */}
								<div
									className='absolute top-0 left-1/2 w-[2px] h-full bg-white z-1 transition-colors peer-active:bg-transparent'
									data-slider>
									<span
										className={`absolute top-1/2 left-1/2 w-10 h-10 -translate-x-1/2 -translate-y-1/2
    bg-cyan-500 text-white rounded-full shadow-md flex items-center justify-center z-20
    transition-transform transition-opacity duration-300
    group-hover:scale-120 group-hover:shadow-xl
    `}
										// thumb масштабируется при активном состоянии
										data-thumb>
										<svg
											xmlns='http://www.w3.org/2000/svg'
											width='18'
											height='10'
											fill='currentColor'
											viewBox='0 0 18 10'>
											<path d='M12.121 4.703V.488c0-.302.384-.454.609-.240l4.42 4.214a.33.33 0 0 1 0 .481l-4.42 4.214c-.225.215-.609.063-.609-.24V4.703z' />
											<path d='M5.879 4.703V.488c0-.302-.384-.454-.609-.240L.85 4.462a.33.33 0 0 0 0 .481l4.42 4.214c.225.215.609.063.609-.24V4.703z' />
										</svg>
									</span>
								</div>

								<Image
									src={`${baseURL}${after}`}
									alt='After'
									width={300}
									height={300}
									className='w-full h-full object-cover'
								/>
							</div>
						);
					})
				) : (
					<div className='col-span-full flex flex-col items-center justify-center py-20 border-2 border-dashed border-gray-300 rounded-lg'>
						<svg
							className='w-16 h-16 mb-4 text-gray-400'
							fill='none'
							stroke='currentColor'
							viewBox='0 0 24 24'>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth={2}
								d='M3 3h18v18H3V3z'
							/>
						</svg>
						<p className='text-gray-500 text-lg'>Пока что нет работ</p>
					</div>
				)}
			</div>
			{works && works?.length !== 0 && (
				<button className='mt-8 px-6 btn-primary'>Загрузить еще работы</button>
			)}
		</section>
	);
}
