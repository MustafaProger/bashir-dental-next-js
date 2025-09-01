"use client";

import { servicesContent, slidesContent } from "../data/data";
import Slider from "../components/Slider";
import FlipCard from "../components/FlipCard";

import style from "./styles/module/hero.module.css";
import CompareSliderContainer from "../components/CompareSlider/CompareSliderContainer";
import FeedbackCardContainer from "@/components/Feedback/FeedbackContainer";
import ContactSection from "@/components/ContactSection";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/motion";

export default function Home() {
	return (
		<div>
			{/* Hero section (с анимацией) */}
			<section
				id='hero'
				className={`scroll-mt-[140px] ${style.heroContent}`}>
				<div className='max-w-[1200px] flex mx-auto px-[30px]'>
					<motion.div
						className='max-w-115 min-h-[640px] flex flex-col items-start justify-center gap-[15px]'
						initial='hidden'
						animate='show'
						variants={staggerContainer(0.2, 0.12)}>
						<motion.h1
							className='text-[52px]/[62px] font-bold text-white'
							variants={fadeUp}>
							Ваша улыбка — моя забота
						</motion.h1>

						<motion.p
							className='text-white'
							variants={fadeUp}>
							Профессиональные стоматологические услуги от врача с опытом,
							включая имплантацию и протезирование на имплантатах.
						</motion.p>

						<motion.a
							href='https://wa.me/79880246554'
							target='_blank'
							className='btn-secondary bg-transparent text-white hover:bg-[#01b5e1] hover:border-[#01b5e1]'
							variants={fadeUp}>
							Бесплатная консультация
						</motion.a>
					</motion.div>
				</div>
			</section>

			{/* About me section (без анимации) */}
			<section
				id='about-me'
				className='scroll-mt-[140px]'>
				<div className='container'>
					<h2 className='title_h2 mb-0'>Обо мне</h2>
					<Slider slides={slidesContent} />
				</div>
			</section>

			{/* Services section (без анимации) */}
			<section
				id='services'
				className='scroll-mt-[140px] bg-[#F8F9FA] text-center'>
				<div className='container'>
					<h2 className='title_h2'>Услуги</h2>
					<FlipCard services={servicesContent} />
				</div>
			</section>

			{/* Works section (без анимации) */}
			<section
				id='works'
				className='scroll-mt-[140px] bg-[#F8F9FA] text-center'>
				<div className='container'>
					<h2 className='title_h2'>Работы</h2>
					<CompareSliderContainer />
				</div>
			</section>

			{/* Feedbacks section (без анимации) */}
			<section
				id='feedbacks'
				className='scroll-mt-[140px] bg-[#F8F9FA]'>
				<div className='container'>
					<h2 className='title_h2'>Отзывы</h2>
					<FeedbackCardContainer />
				</div>
			</section>

			{/* Contacts section (без анимации) */}
			<section
				id='contacts'
				className='scroll-mt-[140px] bg-[#F8F9FA]'>
				<div className='container'>
					<h2 className='title_h2'>Связаться</h2>
					<ContactSection />
				</div>
			</section>

			<footer className='scroll-mt-[140px] bg-[#F8F9FA]'>
				<div className='py-6'>
					<div className='text-sm text-center text-gray-600'>
						© {new Date().getFullYear()} Bashir Dental. Все права защищены.
					</div>
				</div>
			</footer>
		</div>
	);
}
