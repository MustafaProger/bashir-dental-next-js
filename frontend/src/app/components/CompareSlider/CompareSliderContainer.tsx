"use client";
import { getWorks } from "@/services/works";
import { Pagination, WorkItem } from "@/types";
import { useState, useEffect } from "react";
import CompareSlider from "./CompareSlider";

export default function CompareSliderContainer() {
	const [works, setWorks] = useState<WorkItem[]>([]);
	const [loading, setLoading] = useState(true);
	const [loadingMore, setLoadingMore] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [pagination, setPagination] = useState<Pagination | null>(null);
	const apiUrl = "http://localhost:1337";

	const loadMoreWorks = async () => {
		if (!pagination || pagination.page >= pagination.pageCount) return;

		try {
			setLoadingMore(true);
			const nextPage = pagination.page + 1;
			const worksData = await getWorks(apiUrl, nextPage, 3);
			setWorks((prevWorks) => [...prevWorks, ...worksData.data]);
			setPagination(worksData.meta.pagination);
		} catch (err) {
			setError(err instanceof Error ? err.message : "Неизвестная ошибка");
		} finally {
			setLoadingMore(false);
		}
	};

	useEffect(() => {
		const loadWorks = async () => {
			try {
				setLoading(true);
				const worksData = await getWorks(apiUrl, 1, 3);
				setWorks(worksData.data);
				setPagination(worksData.meta.pagination);
			} catch (err) {
				setError(err instanceof Error ? err.message : "Неизвестная ошибка");
			} finally {
				setLoading(false);
			}
		};

		loadWorks();
	}, [apiUrl]);

	return (
		<CompareSlider
			works={works}
			loading={loading}
			loadingMore={loadingMore}
			error={error}
			pagination={pagination}
			apiUrl={apiUrl}
			onLoadMore={loadMoreWorks}
		/>
	);
}
