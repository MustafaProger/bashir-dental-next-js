"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import CompareSlider from "./CompareSlider";
import { getWorks } from "@/services/works.api";
import type { WorkItem, Pagination } from "@/types";

const BASE_URL = "http://localhost:1337";
const PAGE_SIZE = 3;

export default function CompareSliderContainer() {
	// грузим постранично, накапливая
	const q = useInfiniteQuery({
		queryKey: ["works", { pageSize: PAGE_SIZE }],
		queryFn: ({ pageParam = 1, signal }) =>
			getWorks(BASE_URL, pageParam, PAGE_SIZE, { signal }),
		initialPageParam: 1,
		getNextPageParam: (lastPage) => {
			const p = lastPage?.meta?.pagination;
			if (!p) return undefined;
			return p.page < p.pageCount ? p.page + 1 : undefined;
		},
		staleTime: 5 * 60 * 1000,
	});

	// плоский список работ
	const works: WorkItem[] =
		q.data?.pages.flatMap((pg: any) => pg?.data ?? []) ?? [];

	// текущая пагинация (из последней страницы)
	const pagination: Pagination | null =
		q.data?.pages.at(-1)?.meta?.pagination ?? null;

	return (
		<CompareSlider
			works={works}
			loading={q.isPending} // первичная загрузка
			loadingMore={q.isFetchingNextPage} // загрузка "ещё"
			error={q.isError ? (q.error as Error).message : null}
			pagination={pagination}
			apiUrl={BASE_URL}
			onLoadMore={() => q.fetchNextPage()} // твоя кнопка "Загрузить ещё"
		/>
	);
}
