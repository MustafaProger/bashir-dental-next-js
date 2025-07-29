import style from "./styles/style.module.css";

export default function Home() {
	return (
		<div className="">
			<section className={style.heroContent}>
				<div className='max-w-[1200px] flex mx-auto px-[30px]'>
					<div className='max-w-115 min-h-[640px] flex flex-col items-start justify-center gap-[15px]'>
						<h1 className='text-[52px]/[62px] font-bold '>
							Ваша улыбка — моя забота
						</h1>
						<p>
							Профессиональные стоматологические услуги от врача с опытом,
							включая имплантацию и протезирование на имплантатах.
						</p>
						<button className='btn text-[white] bg-[transparent] border-[white] hover:border-[#01b5e1] hover:bg-[#01b5e1]'>
							Бесплатная консультация
						</button>
					</div>
				</div>
			</section>
		</div>
	);
}
