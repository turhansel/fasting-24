'use client';

import Link from 'next/link';
import React from 'react';
import { Card, CardContent } from '../ui/card';
import { formatDuration, timeDiffFromNow } from '@/lib/utils/durationUtils';
import dayjs from 'dayjs';
import { Badge } from '../ui/badge';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { EllipsisVerticalIcon, Trash2Icon, TrashIcon } from 'lucide-react';
import { Button } from '../ui/button';
import {
	useDeleteFastingMutation,
	useGetCompletedFastingsByUserIdQuery,
} from '@/lib/redux/features/fastings/fastingsApiSlice';
import { toast } from 'sonner';

const FastingList: React.FC = () => {
	const { data, error, isLoading } = useGetCompletedFastingsByUserIdQuery();
	const [deleteFasting, { isLoading: isLoadingDeleteMutation }] =
		useDeleteFastingMutation();

	const handleDeleteFasting = async (fastingId: number) => {
		try {
			const result = await deleteFasting({ fastingId }).unwrap();
			toast.success(result.message);
		} catch (error: any) {
			const message = error?.data?.message;
			toast.error(message ?? 'Failed to delete fasting record.');
		}
	};

	const loading = isLoading || isLoadingDeleteMutation;

	if (loading) return <div>Loading...</div>;

	if (!data?.completedFastings?.length || error) {
		return null;
	}

	return (
		<div className='flex flex-col items-center w-full gap-3 sm:gap-[20px] mt-10 mb-10 px-2 sm:px-0'>
			<div className='flex items-center justify-between w-full'>
				<h2 className='text-primaryBlack font-bold text-xl sm:text-2xl'>
					My Latest Fastings
				</h2>

				<Link href='/fastings/list' className='text-primaryPurple'>
					View All
				</Link>
			</div>

			{data?.completedFastings?.map((fasting) => (
				<Card key={fasting.id} className='w-full'>
					<CardContent className='p-6 sm:p-[30px] flex items-center justify-between'>
						<div className='flex flex-col'>
							<div className='flex items-center gap-[14px]'>
								<span className='text-purple font-bold text-xl sm:text-[32px]'>
									{formatDuration(fasting.duration)}
								</span>
								<Badge className='select-none'>
									{timeDiffFromNow(fasting.end_date)}
								</Badge>
							</div>
							<span className='text-gray400 text-xs sm:text-base'>{`${dayjs(
								fasting.start_date
							).format('hh:mm')} - ${dayjs(
								fasting.end_date
							).format('hh:mm')}`}</span>
						</div>

						<Popover>
							<PopoverTrigger>
								<EllipsisVerticalIcon />
							</PopoverTrigger>
							<PopoverContent>
								<Button
									className='flex gap-[6px] hover:bg-red-200'
									variant={'ghost'}
									onClick={() =>
										handleDeleteFasting(fasting.id)
									}
								>
									<Trash2Icon
										stroke-linejoin='black'
										size={16}
									/>
									<span className='text-black'>
										Delete Fasting Session
									</span>
								</Button>
							</PopoverContent>
						</Popover>
					</CardContent>
				</Card>
			))}
		</div>
	);
};

export default FastingList;
