"use client";

import React, { useMemo, useState } from "react";
import { Star, Loader2, CheckCircle2, Home } from "lucide-react";
import { createFeedback } from "@/services/feedback.api";
import Link from "next/link";
import { FormState } from "@/types";

export default function FeedbackCreatePage() {
	const [form, setForm] = useState<FormState>({
		name: "",
		rating: 0,
		review: "",
	});
	const [hover, setHover] = useState<number>(0);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [successName, setSuccessName] = useState<string | null>(null);

	const apiUrl = useMemo(
		() => process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337",
		[]
	);

	const isValid = useMemo(() => {
		const nameOk = form.name.trim().length >= 3;
		const ratingOk = form.rating >= 1 && form.rating <= 5;
		const reviewOk = form.review.trim().length >= 100;
		return nameOk && ratingOk && reviewOk;
	}, [form]);

	async function onSubmit(e: React.FormEvent) {
		e.preventDefault();
		if (!isValid || isSubmitting) return;
		setIsSubmitting(true);
		setError(null);

		try {
			await createFeedback(apiUrl, {
				name: form.name.trim(),
				rating: form.rating,
				review: form.review.trim(),
			});
			setSuccessName(form.name.trim());
			setForm({ name: "", rating: 0, review: "" });
		} catch (err: any) {
			setError("Не удалось отправить отзыв. Попробуйте ещё раз позже.");
			console.error(err);
		} finally {
			setIsSubmitting(false);
		}
	}

	// Экран "Спасибо"
	if (successName) {
		return (
			<div className='fixed inset-0 z-50 grid place-items-center bg-black/20 p-4'>
				<div className='max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center'>
					<div className='mx-auto mb-4 w-14 h-14 rounded-full bg-emerald-50 flex items-center justify-center'>
						<CheckCircle2
							className='text-emerald-500'
							size={28}
						/>
					</div>
					<h1 className='text-2xl font-semibold'>
						Спасибо за отзыв, {successName}!
					</h1>
					<p className='text-gray-600 mt-2'>
						Ваше мнение помогает другим пациентам сделать выбор.
					</p>
					<div className='mt-6'>
						<Link
							href='/#feedbacks'
							className='btn-primary inline-flex items-center gap-2'>
							<Home size={18} />
							На главную
						</Link>
					</div>
				</div>
			</div>
		);
	}

	// Форма
	return (
		<div className='min-h-[100dvh] mt-35 bg-[#F8F9FA] grid place-items-center p-6'>
			<div className='max-w-2xl w-full mx-auto bg-white rounded-2xl shadow p-6 sm:p-8'>
				<h1 className='text-2xl font-semibold'>Оставьте отзыв</h1>

				<form
					onSubmit={onSubmit}
					className='mt-6 space-y-6'>
					{/* Имя */}
					<div>
						<label className='block text-sm font-medium text-gray-700'>
							Фамилия и имя
						</label>
						<input
							type='text'
							inputMode='text'
							autoComplete='name'
							placeholder='Например: Иванов Иван'
							className='mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:ring-2 focus:ring-[#01B5DF]/40'
							value={form.name}
							onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
						/>
					</div>

					{/* Рейтинг */}
					<div>
						<label className='block text-sm font-medium text-gray-700'>
							Оценка
						</label>
						<div className='mt-2 flex items-center gap-2'>
							{[1, 2, 3, 4, 5].map((i) => {
								const active = (hover || form.rating) >= i;
								return (
									<button
										key={i}
										type='button'
										aria-label={`Поставить ${i} из 5`}
										onMouseEnter={() => setHover(i)}
										onMouseLeave={() => setHover(0)}
										onClick={() => setForm((f) => ({ ...f, rating: i }))}
										className='p-1 rounded hover:scale-105 transition'>
										<Star
											size={28}
											className={
												active
													? "text-yellow-400 fill-yellow-400"
													: "text-gray-300"
											}
										/>
									</button>
								);
							})}
							{form.rating > 0 && (
								<span className='ml-2 text-sm text-gray-700'>
									{form.rating} / 5
								</span>
							)}
						</div>
					</div>

					{/* Описание */}
					<div>
						<label className='block text-sm font-medium text-gray-700'>
							Описание
						</label>
						<textarea
							rows={5}
							placeholder='Опишите ваш опыт посещения...'
							className='mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:ring-2 focus:ring-[#01B5DF]/40'
							value={form.review}
							onChange={(e) =>
								setForm((f) => ({ ...f, review: e.target.value }))
							}
						/>
						<div className='mt-1 flex items-center justify-between text-xs text-gray-500'>
							<span>Минимум 100 символов</span>
							<span>{form.review.trim().length} / 1000</span>
						</div>
					</div>

					{/* Ошибка */}
					{error && (
						<div className='rounded-xl bg-red-50 text-red-700 text-sm px-3 py-2'>
							{error}
						</div>
					)}

					{/* Кнопка отправки */}
					<div className='pt-2'>
						<button
							type='submit'
							disabled={!isValid || isSubmitting}
							className='btn-primary inline-flex items-center gap-2 disabled:opacity-60'>
							{isSubmitting ? (
								<>
									<Loader2
										className='animate-spin'
										size={18}
									/>
									Отправка...
								</>
							) : (
								<>Отправить отзыв</>
							)}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
