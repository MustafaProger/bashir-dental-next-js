import { useEffect, useState } from "react";
import { getWorks } from "@/services/works";
import { Pagination, WorkItem } from "@/types";

export const useCompareSlider = () => {
	const [works, setWorks] = useState<WorkItem[]>([]);
	const [loading, setLoading] = useState(true);
	const [loadingMore, setLoadingMore] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [pagination, setPagination] = useState<Pagination | null>(null);
	const apiUrl = "http://localhost:1337";

	useEffect(() => {
		const load = async () => {
			try {
				setLoading(true);
				const data = await getWorks(apiUrl, 1, 3);
				setWorks(data.data);
				setPagination(data.meta.pagination);
			} catch (err) {
				setError(err instanceof Error ? err.message : "Неизвестная ошибка");
			} finally {
				setLoading(false);
			}
		};
		load();
	}, []);

	const loadMore = async () => {
		if (!pagination || pagination.page >= pagination.pageCount) return;
		try {
			setLoadingMore(true);
			const data = await getWorks(apiUrl, pagination.page + 1, 3);
			setWorks((prev) => [...prev, ...data.data]);
			setPagination(data.meta.pagination);
		} catch (err) {
			setError(err instanceof Error ? err.message : "Неизвестная ошибка");
		} finally {
			setLoadingMore(false);
		}
	};

	return { works, loading, loadingMore, error, pagination, loadMore };
};
