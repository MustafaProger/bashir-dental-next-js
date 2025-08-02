"use client";

import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Navigation, Pagination, Scrollbar } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const slides = [
	{
		title: "Миссия и цели",
		text: `Сегодня я сосредоточен на том, чтобы каждый мой пациент уходил с уверенной улыбкой. Моё желание — сделать стоматологию доступной, понятной и комфортной. Я верю, что здоровая улыбка — это уверенность в себе и качество жизни.`,
	},
	{
		title: "Мой подход к работе",
		text: `За время своей карьеры я понял, что каждый пациент — это индивидуальность. Моя цель — сделать визит к стоматологу комфортным и безболезненным. Я использую современные методы лечения и уделяю особое внимание безопасности.`,
	},
	{
		title: "Достижения",
		text: `С отличием окончил медицинский университет и прошел стажировку в лучших клиниках. Полученные знания позволяют мне применять самые современные методы лечения зубов, обеспечивая высокое качество и долговременные результаты.`,
	},
];

export default function CustomSlider() {
	const [activeIndex, setActiveIndex] = useState(1);

	return (
		<div className='relative max-w-6xl mx-auto'>
			<Swiper
				slidesPerView={1}
				centeredSlides
				spaceBetween={20}
				navigation
				pagination={{
					clickable: true,
				}}
				modules={[Navigation, Pagination, Scrollbar, A11y]}
				onSwiper={(swiper) => {
					swiper.slideToLoop(1);
					setActiveIndex(1);
				}}
				onSlideChange={(swiper) => {
					setActiveIndex(swiper.realIndex);
				}}
				breakpoints={{
					1200: {
						slidesPerView: 3,
					},
					1024: {
						slidesPerView: 2,
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
								<h3
									className={` font-bold ${
										isActive ? "text-lg" : "text-base text-gray-400"
									}`}>
									{slide.title}
								</h3>
								<hr
									className={`h-[3px] my-4 border-t-0 transition-all duration-500 ${
										isActive ? "bg-[#00AEEF]" : "bg-[#D9EAF7]"
									}`}
								/>
								<p>{slide.text}</p>
							</div>
						</SwiperSlide>
					);
				})}
			</Swiper>
		</div>
	);
}
