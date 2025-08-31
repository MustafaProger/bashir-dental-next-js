"use client";

import { useState } from "react";

import Image from "next/image";
import { ServicesContent } from "@/types";

const FlipCard = ({ services }: { services: ServicesContent[] }) => {
	const [flipped, setFlipped] = useState(Array(services.length).fill(false));

	const handleFlip = (index: number) => {
		setFlipped((prev) => prev.map((item, i) => (i === index ? !item : item)));
	};

	return (
		<div className='flex flex-wrap justify-center gap-6'>
			{services.map((service: ServicesContent, index: number) => (
				<div
					key={index}
					className={`[perspective:1000px] min-w-[360px] min-h-[360px]`}>
					<div
						className={`relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] ${
							flipped[index] ? "rotate-y-180" : ""
						}`}>
						<div className='absolute w-full h-full backface-hidden bg-white rounded-4xl shadow flex flex-col items-center justify-center gap-4 p-6'>
							<Image
								src={service.img}
								alt={service.alt}
								width={50}
								height={60}
								className='h-12 w-auto'
							/>
							<h3 className='text-xl font-semibold'>{service.title}</h3>
							<p className='text-sm text-gray-700'>{service.frontText}</p>
							<button
								onClick={() => handleFlip(index)}
								className='btn-primary'>
								Подробнее
							</button>
						</div>

						<div className='absolute w-full h-full backface-hidden rotate-y-180 bg-[#01b5e1] rounded-4xl shadow flex flex-col items-center justify-center gap-4 p-6 text-white'>
							<h3 className='text-xl font-semibold'>{service.title}</h3>
							<p className='text-sm'>{service.backText}</p>
							<button
								onClick={() => handleFlip(index)}
								className='btn-secondary'>
								Назад
							</button>
						</div>
					</div>
				</div>
			))}
		</div>
	);
};

export default FlipCard;
