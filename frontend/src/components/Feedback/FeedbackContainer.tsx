"use client";

import { getFeedback } from "@/services/feedback.api";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import React, { useMemo } from "react";
import FeedbackCard from "./FeedbackCard";
import Loading from "../Loading";
import ErrorMessage from "../ErrorMessage";
import { Feedback } from "@/types";
import FeedbackAverageWriteContainer from "./FeedbackAverageWriteContainer";
import { motion, type Variants } from "framer-motion";

const listVariants = {
	hidden: {},
	show: {
		transition: { staggerChildren: 0.12, delayChildren: 0.05 },
	},
} satisfies Variants;

const itemVariants = {
	hidden: { opacity: 0, y: 14 },
	show: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.45, ease: "easeOut" as const },
	},
} satisfies Variants;

export default function FeedbackContainer(): JSX.Element {
	const { isPending, isError, data } = useQuery({
		queryKey: ["feedback"],
		queryFn: () =>
			getFeedback(process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337"),
		staleTime: 1000 * 60 * 5,
		placeholderData: keepPreviousData,
	});

	const sortedData = useMemo<Feedback[]>(() => {
		const list = (data?.data ?? []) as Feedback[];
		return [...list].sort((a, b) => {
			const ta = Date.parse(a.createdAt ?? "");
			const tb = Date.parse(b.createdAt ?? "");
			if (isNaN(ta) && isNaN(tb)) return 0;
			if (isNaN(ta)) return 1;
			if (isNaN(tb)) return -1;
			return tb - ta;
		});
	}, [data]);

	const items = useMemo(
		() =>
			sortedData
				.filter((i) => Number.isFinite(Number(i.rating)))
				.map((i) => ({ rating: Number(i.rating), createdAt: i.createdAt })),
		[sortedData]
	);

	if (isPending) return <Loading />;
	if (isError) return <ErrorMessage />;

	return (
		<div className='space-y-6 mx-auto'>
			<FeedbackAverageWriteContainer
				items={items}
				ctaHref='/feedbacks/new'
			/>

			<motion.div
				variants={listVariants}
				initial='hidden'
				whileInView='show'
				viewport={{ once: true, amount: 0.2 }}
				className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'>
				{sortedData.map(({ id, name, rating, createdAt, review }) => (
					<motion.div
						key={id}
						variants={itemVariants}
						whileHover={{ y: -2 }}>
						<FeedbackCard
							id={id}
							name={name}
							createdAt={createdAt}
							rating={rating}
							review={review}
						/>
					</motion.div>
				))}
			</motion.div>
		</div>
	);
}
