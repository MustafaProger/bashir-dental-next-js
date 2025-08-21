import Slider from "./components/Slider";
import FlipCard from "./components/FlipCard";

import style from "./styles/module/hero.module.css";

import { servicesContent, slidesContent } from "./data/data";
import CompareSlider from "./components/CompareSlider";

export default function Home(): React.JSX.Element {
	return (
		<div>
			<section
				className={`scroll-mt-[140px] ${style.heroContent}`}
				id='hero'>
				<div className='max-w-[1200px] flex mx-auto px-[30px]'>
					<div className='max-w-115 min-h-[640px] flex flex-col items-start justify-center gap-[15px]'>
						<h1 className='text-[52px]/[62px] font-bold text-white'>
							Ваша улыбка — моя забота
						</h1>
						<p className='text-white'>
							Профессиональные стоматологические услуги от врача с опытом,
							включая имплантацию и протезирование на имплантатах.
						</p>
						<a
							href='https://wa.me/+79880246554'
							target='_blank'
							className='btn-secondary bg-transparent text-white hover:bg-[#01b5e1] hover:border-[#01b5e1]'>
							Бесплатная консультация
						</a>
					</div>
				</div>
			</section>
			<section id='about-me'>
				<div className='container'>
					<h2 className='title_h2 mb-0'>Обо мне</h2>
					<Slider slides={slidesContent} />
				</div>
			</section>
			<section
				id='services'
				className='bg-[#F8F9FA] text-center'>
				<div className='container'>
					<h2 className='title_h2'>Мои услуги</h2>
					<FlipCard servicesContent={servicesContent} />
				</div>
			</section>

			<section id="works">
				<div className="container">
					{/* <h2 className="title_h2">Работы</h2> */}
					<CompareSlider/>
				</div>
			</section>
		</div>
	);
}
