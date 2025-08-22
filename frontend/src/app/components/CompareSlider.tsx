"use client";
import { getWorks } from "@/services/works";
import { Pagination, WorkItem, WorksResponse } from "@/types";
import { useRef, useEffect, useState } from "react";

export default function CompareSlider() {
	const [works, setWorks] = useState<WorkItem[]>([]);
	const [loading, setLoading] = useState(true);
	const [loadingMore, setLoadingMore] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [pagination, setPagination] = useState<Pagination | null>(null);
	const sliderRefs = useRef<(HTMLDivElement | null)[]>([]);
	const apiUrl = "http://localhost:1337";

	const loadMoreWorks = async () => {
		if (!pagination || pagination.page >= pagination.pageCount) return;

		try {
			setLoadingMore(true);
			const nextPage = pagination.page + 1;
			const worksData = await getWorks(apiUrl, nextPage, 3);

			setWorks((prevWorks) => [...prevWorks, ...worksData.data]);
			setPagination(worksData.meta.pagination);
		} catch (err) {
			setError(err instanceof Error ? err.message : "Неизвестная ошибка");
		} finally {
			setLoadingMore(false);
		}
	};

	useEffect(() => {
		const loadWorks = async () => {
			try {
				setLoading(true);
				const worksData = await getWorks(apiUrl, 1, 3);
				setWorks(worksData.data);
				setPagination(worksData.meta.pagination);
			} catch (err) {
				setError(err instanceof Error ? err.message : "Неизвестная ошибка");
			} finally {
				setLoading(false);
			}
		};

		loadWorks();
	}, [apiUrl]);

	useEffect(() => {
		const initSlider = (element: HTMLDivElement) => {
			const sliderRange = element.querySelector<HTMLInputElement>(
				"[data-image-comparison-range]"
			);
			const thumb = element.querySelector<HTMLSpanElement>(
				"[data-image-comparison-thumb]"
			);

			if (!sliderRange || !thumb) return;

			const setSliderState = (e: Event) => {
				sliderRange.classList.toggle("bg-blue-500/50", e.type === "input");
			};

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
				setSliderState(e);
			};

			const mouseMoveHandler = (e: MouseEvent) => moveSliderThumb(e);
			const mouseUpHandler = () => {
				element.removeEventListener("mousemove", mouseMoveHandler);
			};

			sliderRange.addEventListener("mousedown", (e) => {
				moveSliderThumb(e);
				element.addEventListener("mousemove", mouseMoveHandler);
			});
			sliderRange.addEventListener("mouseup", mouseUpHandler);
			sliderRange.addEventListener("mouseleave", mouseUpHandler);

			sliderRange.addEventListener("input", moveSliderRange);
			sliderRange.addEventListener("change", moveSliderRange);
		};

		sliderRefs.current.forEach((el) => {
			if (el) initSlider(el);
		});
	}, [works]);

	if (loading) {
		return (
			<div className='flex justify-center items-center py-20'>
				<div className='animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500'></div>
			</div>
		);
	}

	if (error) {
		return (
			<div className='flex justify-center items-center h-64'>
				<p className='text-red-500'>Ошибка: {error}</p>
			</div>
		);
	}

	return (
		<div className='text-center'>
			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto'>
				{works && works?.length !== 0 ? (
					works.map((work, index) => (
						<div
							className='relative overflow-hidden rounded-lg'
							key={work.id}>
							<div
								className='relative h-full group'
								ref={(el) => {
									sliderRefs.current[index] = el;
								}}>
								<input
									type='range'
									min='0'
									max='100'
									defaultValue='50'
									className='absolute left-0 w-full h-full opacity-0 cursor-ew-resize z-2'
									data-image-comparison-range=''
								/>

								<div
									className='absolute top-0 left-0 w-1/2 h-full overflow-hidden z-1'
									data-image-comparison-overlay=''>
									<figure className='relative h-full'>
										<img
											src={`${apiUrl}${
												work.afterImage[0]?.formats?.large?.url ||
												work.afterImage[0]?.url
											}`}
											alt='Before'
											className='absolute w-full h-full object-cover object-left'
										/>
									</figure>
								</div>

								<div
									className='absolute top-0 left-1/2 w-0.5 h-full bg-white z-1 transition-opacity duration-300
             group-active:opacity-0'
									data-image-comparison-slider=''>
									<span
										className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 
               bg-[#01B5E0] text-white rounded-full flex items-center justify-center 
               shadow-lg transition-all duration-300 scale-100 
               group-hover:scale-120 
               group-active:scale-90 group-active:opacity-50 z-1'
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

								<div className='relative h-full'>
									<figure className='relative h-full'>
										<img
											src={`${apiUrl}${
												work.beforeImage[0]?.formats?.large?.url ||
												work.beforeImage[0]?.url
											}`}
											alt='After'
											className='w-full h-full object-cover'
										/>
									</figure>
								</div>
							</div>
						</div>
					))
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

			{pagination && pagination.page < pagination.pageCount && (
				<div className='mt-8 flex justify-center'>
					<button
						onClick={loadMoreWorks}
						disabled={loadingMore}
						className='px-6 btn-primary disabled:opacity-50 disabled:cursor-not-allowed'>
						{loadingMore ? (
							<div className='flex items-center'>
								<div className='animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2'></div>
								Загрузка...
							</div>
						) : (
							"Загрузить еще работы"
						)}
					</button>
				</div>
			)}
		</div>
	);
}
