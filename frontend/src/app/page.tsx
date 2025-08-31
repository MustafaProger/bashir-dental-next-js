"use client";

import { servicesContent, slidesContent } from "../data/data";
import Slider from "../components/Slider";
import FlipCard from "../components/FlipCard";

import style from "./styles/module/hero.module.css";
import CompareSliderContainer from "../components/CompareSlider/CompareSliderContainer";
import FeedbackCardContainer from "@/components/Feedback/FeedbackContainer";
import ContactSection from "@/components/ContactSection";

import { motion } from "framer-motion";
import { fadeUp, fade, staggerContainer } from "@/lib/motion";

export default function Home() {
	return (
		<div>
			{/* Hero section */}
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
							href='https://wa.me/79880246554' // без +
							target='_blank'
							className='btn-secondary bg-transparent text-white hover:bg-[#01b5e1] hover:border-[#01b5e1]'
							variants={fadeUp}>
							Бесплатная консультация
						</motion.a>
					</motion.div>
				</div>
			</section>

			{/* About me section */}
			<motion.section
				id='about-me'
				className='scroll-mt-[140px]'
				initial='hidden'
				whileInView='show'
				viewport={{ once: true, amount: 0.4 }}
				variants={staggerContainer()}>
				<div className='container'>
					<motion.h2
						className='title_h2 mb-0'
						variants={fadeUp}>
						Обо мне
					</motion.h2>
					<motion.div variants={fadeUp}>
						<Slider slides={slidesContent} />
					</motion.div>
				</div>
			</motion.section>

			{/* Services section */}
			<motion.section
				id='services'
				className='scroll-mt-[140px] bg-[#F8F9FA] text-center'
				initial='hidden'
				whileInView='show'
				viewport={{ once: true, amount: 0.4 }}
				variants={staggerContainer()}>
				<div className='container'>
					<motion.h2
						className='title_h2'
						variants={fadeUp}>
						Услуги
					</motion.h2>
					<motion.div variants={fadeUp}>
						<FlipCard services={servicesContent} />
					</motion.div>
				</div>
			</motion.section>

			{/* Works section */}
			<motion.section
				id='works'
				className='scroll-mt-[140px] bg-[#F8F9FA] text-center'
				initial='hidden'
				whileInView='show'
				viewport={{ once: true, amount: 0.2 }}
				variants={staggerContainer()}>
				<div className='container'>
					<motion.h2
						className='title_h2'
						variants={fadeUp}>
						Работы
					</motion.h2>
					<CompareSliderContainer />
				</div>
			</motion.section>

			{/* Feedbacks section */}
			<motion.section
				id='feedbacks'
				className='scroll-mt-[140px] bg-[#F8F9FA]'
				initial='hidden'
				whileInView='show'
				viewport={{ once: true, amount: 0.4 }}
				variants={staggerContainer()}>
				<div className='container'>
					<motion.h2
						className='title_h2'
						variants={fadeUp}>Отзывы</motion.h2>
					<FeedbackCardContainer />
				</div>
			</motion.section>

			{/* Contacts section */}
			<motion.section
				id='contacts'
				className='scroll-mt-[140px] bg-[#F8F9FA]'
				initial='hidden'
				whileInView='show'
				viewport={{ once: true, amount: 0.4 }}
				variants={staggerContainer()}>
				<div className='container'>
					<motion.h2
						className='title_h2'
						variants={fadeUp}>Связаться</motion.h2>
					<ContactSection />
				</div>
			</motion.section>

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
