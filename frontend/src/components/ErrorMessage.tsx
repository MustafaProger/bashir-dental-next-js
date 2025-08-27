import { AlertCircle } from "lucide-react";

const ErrorMessage = () => {
	return (
		<div className='flex justify-center items-center h-64'>
			<div className='bg-red-50 border border-red-200 rounded-xl p-6 flex flex-col items-center text-center shadow-sm max-w-md'>
				<AlertCircle className='w-12 h-12 text-red-500 mb-3' />
				<h2 className='text-lg font-semibold text-red-700'>Произошла ошибка</h2>
				<p className='text-red-500 mt-2 text-sm'>Что-то пошло не так</p>
			</div>
		</div>
	);
};

export default ErrorMessage;
