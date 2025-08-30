"use client";

import { getFeedback } from "@/services/feedback.api";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import React, { useMemo } from "react";
import FeedbackCard from "./FeedbackCard";
import Loading from "../Loading";
import ErrorMessage from "../ErrorMessage";
import { Feedback } from "@/types";
import FeedbackAverageWriteContainer from "./FeedbackAverageWriteContainer";

const FeedbackContainer = (): JSX.Element => {
	const { isPending, isError, data } = useQuery({
		queryKey: ["feedback"],
		queryFn: () =>
			getFeedback(process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337"),
		staleTime: 1000 * 60 * 5,
		placeholderData: keepPreviousData,
	});

	// Надёжно сортируем по дате (DESC). Некорректные даты уходят в конец.
	const sortedData = useMemo<Feedback[]>(() => {
		const list = (data?.data ?? []) as Feedback[];
		return [...list].sort((a, b) => {
			const ta = Date.parse(a.createdAt ?? "");
			const tb = Date.parse(b.createdAt ?? "");
			// сначала валидные даты, потом невалидные
			if (isNaN(ta) && isNaN(tb)) return 0;
			if (isNaN(ta)) return 1;
			if (isNaN(tb)) return -1;
			return tb - ta; // новое раньше
		});
	}, [data]);

	const items = useMemo(
		() =>
			sortedData
				.filter((i) => Number.isFinite(Number(i.rating)))
				.map((i) => ({
					rating: Number(i.rating),
					createdAt: i.createdAt,
				})),
		[sortedData]
	);

	if (isPending) return <Loading />;
	if (isError) return <ErrorMessage />;

	return (
		<div className='space-y-6 mx-auto'>
			{/* Сводка + CTA */}
			<FeedbackAverageWriteContainer
				items={items}
				ctaHref='/feedbacks/new'
			/>

			{/* Лента отзывов (от новых к старым) */}
			<div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'>
				{sortedData.map(({ id, name, rating, createdAt, review }) => (
					<div
						key={id}
						className='relative'>
						<FeedbackCard
							id={id}
							name={name}
							createdAt={createdAt}
							rating={rating}
							review={review}
						/>
					</div>
				))}
			</div>
		</div>
	);
};

export default FeedbackContainer;
