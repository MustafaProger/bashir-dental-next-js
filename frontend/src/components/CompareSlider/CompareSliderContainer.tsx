"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import CompareSlider from "./CompareSlider";
import { getWorks } from "@/services/works.api";
import type { WorkItem, Pagination } from "@/types";

const PAGE_SIZE = 3;

const fadeUp = {
	hidden: { opacity: 0, y: 12 },
	show: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.45, ease: "easeOut" as const },
	},
};

export default function CompareSliderContainer() {
	const q = useInfiniteQuery({
		queryKey: ["works", { pageSize: PAGE_SIZE }],
		queryFn: ({ pageParam = 1, signal }) =>
			getWorks(pageParam, PAGE_SIZE, { signal }),
		initialPageParam: 1,
		getNextPageParam: (lastPage) => {
			const p = lastPage?.meta?.pagination;
			if (!p) return undefined;
			return p.page < p.pageCount ? p.page + 1 : undefined;
		},
		staleTime: 5 * 60 * 1000,
	});

	const works: WorkItem[] =
		q.data?.pages.flatMap((pg: any) => pg?.data ?? []) ?? [];
	const pagination: Pagination | null =
		q.data?.pages.at(-1)?.meta?.pagination ?? null;

	return (
		<CompareSlider
			works={works}
			loading={q.isPending}
			loadingMore={q.isFetchingNextPage}
			error={q.isError ? (q.error as Error).message : null}
			pagination={pagination}
			onLoadMore={() => q.fetchNextPage()}
		/>
	);
}
