"use client";

import Image from "next/image";
import Link from "next/link";
import { contactLinks, mediaLinks } from "../data/data";

export default function ContactSection() {
	return (
		<div className='grid gap-6 md:gap-8 min-[880px]:grid-cols-2'>
			<div className='min-w-0'>
				<div className='w-full bg-white rounded-2xl shadow p-6 sm:p-8 border border-[#01B5E1]/40'>
					<h2 className='text-2xl font-semibold'>Связаться</h2>

					<ul className='mt-6 space-y-4'>
						{contactLinks.map((c) => (
							<li
								key={c.href}
								className='min-w-0'>
								<Link
									href={c.href}
									target={c.href.startsWith("http") ? "_blank" : undefined}
									rel={
										c.href.startsWith("http")
											? "noopener noreferrer"
											: undefined
									}
									className='group flex items-center gap-3 rounded-xl border border-gray-300 p-4 hover:shadow-sm hover:-translate-y-[3px] transition-all duration-300 w-full'
									aria-label={c.alt}
									title={c.text}>
									<span className='shrink-0 inline-flex size-10 rounded-lg bg-[#01B5DF]/10 items-center justify-center'>
										<Image
											src={c.img}
											alt={c.alt}
											width={20}
											height={20}
										/>
									</span>
									<span className='font-medium [overflow-wrap:anywhere] min-w-0'>
										{c.text}
									</span>
								</Link>
							</li>
						))}
					</ul>
				</div>
			</div>

			<div className='min-w-0'>
				<div className='w-full bg-white rounded-2xl shadow p-6 sm:p-8 border border-[#01B5E1]/40'>
					<h2 className='text-2xl font-semibold'>Соцсети и мессенджеры</h2>

					<div className='mt-6 flex flex-wrap items-center gap-3'>
						{mediaLinks.map((m) => (
							<Link
								key={m.href}
								href={m.href}
								target='_blank'
								rel='noopener noreferrer'
								className='inline-flex items-center gap-3 rounded-xl border border-gray-300 px-4 py-3 hover:shadow-sm hover:-translate-y-[3px] transition-all duration-300'
								aria-label={m.alt}>
								<Image
									src={m.img}
									alt={m.alt}
									width={22}
									height={22}
								/>
								<span className='font-medium capitalize [overflow-wrap:anywhere]'>
									{m.alt}
								</span>
							</Link>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
