"use client";

import { getFeedback } from "@/services/feedback.api";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import React from "react";
import FeedbackCard from "./FeedbackCard";
import Loading from "../Loading";
import ErrorMessage from "../ErrorMessage";
import { Feedback } from "@/types";

const FeedbackCardContainer = (): JSX.Element => {
	const { isPending, isError, data, error } = useQuery({
		queryKey: ["feedback"],
		queryFn: () =>
			getFeedback(process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337"),
		staleTime: 1000 * 60 * 5, // 5 minutes
		placeholderData: keepPreviousData,
	});

	if (isPending) {
		return <Loading />;
	}

	if (isError) {
		return <ErrorMessage />;
	}

	return (
		<div>
			<div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 max-w-7xl mx-auto'>
				{data.data.map(({ id, name, rating, createdAt, review }: Feedback) => (
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

export default FeedbackCardContainer;
