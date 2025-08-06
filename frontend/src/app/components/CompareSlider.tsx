"use client";

import { getWorks } from "@/services/wokrs";
import { Work } from "@/types";
import { useEffect, useState } from "react";

function CompareSlider() {
	const [works, setWorks] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await getWorks();
				setWorks(response.data);
			} catch (error) {
				console.error("Ошибка при загрузке работ:", error);
			}
		};

		fetchData();
	}, []);

	const baseURL = "http://localhost:1337";

	return (
		<div>
			{works.map((work: Work) => {
				const before = work.beforeImage?.[0]?.url;
				const after = work.afterImage?.[0]?.url;

				return (
					<div key={work.id}>
						<div className='flex gap-4'>
							{before && (
								<div>
									<p>Before</p>
									<img
										src={`${baseURL}${before}`}
										alt='Before'
									/>
								</div>
							)}

							{after && (
								<div>
									<p>After</p>
									<img
										src={`${baseURL}${after}`}
										alt='After'
									/>
								</div>
							)}
						</div>
					</div>
				);
			})}
		</div>
	);
}

export default CompareSlider;
