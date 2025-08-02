import Slider from "./components/Slider";
import style from "./styles/module/hero.module.css";

export default function Home() {
	return (
		<div>
			<section className={style.heroContent}>
				<div className='max-w-[1200px] flex mx-auto px-[30px]'>
					<div className='max-w-115 min-h-[640px] flex flex-col items-start justify-center gap-[15px]'>
						<h1 className='text-[52px]/[62px] font-bold text-white'>
							Ваша улыбка — моя забота
						</h1>
						<p className="text-white">
							Профессиональные стоматологические услуги от врача с опытом,
							включая имплантацию и протезирование на имплантатах.
						</p>
						<button className='btn-secondary'>
							Бесплатная консультация
						</button>
					</div>
				</div>
			</section>
			<section className='about-me'>
				<div className='max-w-[1200px] p-[30px] mx-auto'>
					<h2 className='text-[42px] text-center font-bold'>Обо мне</h2>
					<Slider />
				</div>
			</section>
		</div>
	);
}
