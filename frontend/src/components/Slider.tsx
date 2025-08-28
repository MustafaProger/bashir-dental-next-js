"use client";

import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { SlideContent } from "@/types";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

type Props = {
	slides: SlideContent[];
};

const Slider: React.FC<Props> = ({ slides }) => {
	const [activeIndex, setActiveIndex] = useState<number>(1);

	return (
		<div className='relative mx-auto'>
			<Swiper
				slidesPerView={1}
				centeredSlides
				spaceBetween={20}
				navigation
				pagination={{
					clickable: true,
				}}
				modules={[Navigation, Pagination]}
				onSwiper={(swiper) => {
					swiper.slideToLoop(1);
					setActiveIndex(1);
				}}
				onSlideChange={(swiper) => {
					setActiveIndex(swiper.realIndex);
				}}
				breakpoints={{

					1024: {
						slidesPerView: 3,
					},

					768: {
						slidesPerView: 2,
					},
					320: {
						slidesPerView: 1,
					},
				}}
				className='group'>
				{slides.map((slide, idx) => {
					const isActive = idx === activeIndex;

					return (
						<SwiperSlide
							key={idx}
							className='my-[40px] self-center'>
							<div
								className={`flex flex-col p-5 rounded-4xl border-[#00AEEF] text-black sm:shadow-[0px_0px_30px_rgba(1,181,225,0.6)] transition-all duration-500 border-4  ${
									isActive ? "opacity-100" : "opacity-30 scale-80"
								}`}>
								<h3>{slide.title}</h3>
								<hr className='h-[3px] my-4 border-t-0 transition-all duration-500 bg-[#00AEEF]' />
								<p>{slide.text}</p>
							</div>
						</SwiperSlide>
					);
				})}
			</Swiper>
		</div>
	);
};

export default Slider;
