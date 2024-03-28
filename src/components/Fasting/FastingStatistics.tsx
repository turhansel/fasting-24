'use client';

import React from 'react';
import { useGetCompletedFastingsStatistics } from '@/lib/redux/features/fastings/fastingsApiSlice';
import { Card, CardContent } from '../ui/card';

const FastingStatistics: React.FC = () => {
	const data = useGetCompletedFastingsStatistics();

	if (!data) return null;

	return (
		<div className='mt-6 sm:mt-14 grid grid-cols-2 justify-between w-full gap-4 sm:gap-[30px] px-2 sm:px-0'>
			<Card className='flex items-center justify-center'>
				<CardContent className='p-4 sm:p-6 flex flex-col items-center'>
					<span className='mb-2'>⌛️</span>
					<h3 className='text-primaryBlack font-bold text-2xl'>
						{Math.round(data.totalCompletedHours)}
					</h3>
					<span className='text-[#696C74] text-balance'>
						Total Hours
					</span>
				</CardContent>
			</Card>
			<Card className=''>
				<CardContent className='p-4 sm:p-6 flex flex-col items-center'>
					<span className='mb-2'>🎉</span>
					<h3 className='text-primaryBlack font-bold text-2xl'>
						{data.totalCompletedFastingCount}
					</h3>
					<span className='text-[#696C74] text-balance text-center'>
						Total Completed Fasting
					</span>
				</CardContent>
			</Card>
		</div>
	);
};

export default FastingStatistics;
