import type { CompareSlider } from "@/types";
import CompareSliderItem from "./CompareSliderItem";
import Loading from "../Loading";
import ErrorMessage from "../ErrorMessage";

export default function CompareSlider({
	works,
	loading,
	loadingMore,
	error,
	pagination,
	apiUrl,
	onLoadMore,
}: CompareSlider) {
	if (loading) {
		return <Loading />;
	}

	if (error) {
		return <ErrorMessage />;
	}

	return (
		<div className='text-center'>
			<div className='grid grid-cols-1 min-[600px]:grid-cols-2 lg:grid-cols-3 gap-5 mx-auto'>
				{works && works?.length !== 0 ? (
					works.map((work, index) => (
						<CompareSliderItem
							key={work.id}
							work={work}
							apiUrl={apiUrl}
							index={index}
						/>
					))
				) : (
					<div className='col-span-full flex flex-col items-center justify-center py-20 border-2 border-dashed border-gray-300 rounded-lg'>
						<svg
							className='w-16 h-16 mb-4 text-gray-400'
							fill='none'
							stroke='currentColor'
							viewBox='0 0 24 24'>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth={2}
								d='M3 3h18v18H3V3z'
							/>
						</svg>
						<p className='text-gray-500 text-lg'>Пока что нет работ</p>
					</div>
				)}
			</div>

			{pagination && pagination.page < pagination.pageCount && (
				<div className='mt-8 flex justify-center'>
					<button
						onClick={onLoadMore}
						disabled={loadingMore}
						className='px-6 btn-primary disabled:opacity-50 disabled:cursor-not-allowed'>
						{loadingMore ? (
							<div className='flex items-center'>
								<div className='animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2'></div>
								Загрузка...
							</div>
						) : (
							"Загрузить еще работы"
						)}
					</button>
				</div>
			)}
		</div>
	);
}
