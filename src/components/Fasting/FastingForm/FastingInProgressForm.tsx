'use client';

import { Button } from '@/components/ui/button';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { toast } from 'sonner';
import { FastingFormSchema } from '@/lib/redux/features/fastings/schemas';
import dayjs from 'dayjs';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { DraftFormResponse } from '@/lib/types';
import { useUpdateFastingMutation } from '@/lib/redux/features/fastings/fastingsApiSlice';
import ProgressCircle from '@/components/CircularProgressBar';
import useCountdown from '@/lib/hooks/useCountdown';

const FastingInProgressForm: React.FC<DraftFormResponse> = ({
	inProgressFasting,
}) => {
	const startDate = dayjs(inProgressFasting?.start_date);
	const endDate = dayjs(inProgressFasting?.end_date);

	const form = useForm<z.infer<typeof FastingFormSchema>>({
		resolver: zodResolver(FastingFormSchema),
		defaultValues: {
			start_date: startDate.format('HH:mm'),
			end_date: endDate.format('HH:mm'),
		},
	});

	const { getValues } = form;

	const [updateMutation, { isLoading }] = useUpdateFastingMutation();

	const calculateStartAndEndTimes = useCallback(() => {
		const now = dayjs();
		const startOfDay = now.startOf('day');
		let startDateTime = startOfDay
			.add(startDate.hour(), 'hour')
			.add(startDate.minute(), 'minute');
		let endDateTime = startOfDay
			.add(endDate.hour(), 'hour')
			.add(endDate.minute(), 'minute');

		if (endDateTime.isBefore(startDateTime)) {
			endDateTime = endDateTime.add(1, 'day');
		}

		return { startDateTime, endDateTime };
	}, [startDate, endDate]);

	const { startDateTime, endDateTime } = calculateStartAndEndTimes();
	const totalDuration = endDateTime.diff(startDateTime, 'second');
	const now = dayjs();
	const elapsed = now.diff(startDateTime, 'second');
	const remaining = Math.max(0, totalDuration - elapsed);

	const [progressValue, setProgressValue] = useState(0);

	const getPayload = useCallback(
		(values: z.infer<typeof FastingFormSchema>) => {
			const baseDate = dayjs().format('YYYY-MM-DD');

			let startDateTimeStamp = dayjs(
				`${baseDate}T${values.start_date}:00`
			);
			let endDateTimeStamp = dayjs(
				`${baseDate}T${dayjs().format('HH:mm')}:00`
			);

			if (endDateTimeStamp.isBefore(startDateTimeStamp)) {
				endDateTimeStamp = endDateTimeStamp.add(1, 'day');
			}

			const duration = endDateTimeStamp.diff(
				startDateTimeStamp,
				'second'
			);

			return {
				duration,
				end_date: endDateTimeStamp.toISOString(),
			};
		},
		[startDate, endDate]
	);

	useEffect(() => {
		const progress = Math.min(
			100,
			Math.max(0, (elapsed / totalDuration) * 100)
		);
		setProgressValue(progress);
	}, [elapsed, totalDuration]);

	const onSubmit = async (values: z.infer<typeof FastingFormSchema>) => {
		const payload = getPayload(values);
		try {
			const result = await updateMutation({
				fastingId: inProgressFasting?.id!,
				endFasting: true,
				...payload,
			}).unwrap();
			toast.success(result.message);
		} catch (error: any) {
			const message = error?.data?.message;
			toast.error(message ?? 'Unknown error');
		}
	};

	const handleComplete = async () => {
		toast.info('Congrats! You have completed your fasting.');
		await onSubmit(getValues());
	};

	const coundtDown = useCountdown({
		interval: 1000,
		duration: remaining,
		onEnd: handleComplete,
	});

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='animate-in flex flex-col w-full justify-center gap-2 text-foreground p-2 sm:p-0'
			>
				<Card className='w-full '>
					<CardHeader className='pt-16'>
						<CardTitle className='text-2xl text-center text-primaryBlack'>
							You are fasting
						</CardTitle>
					</CardHeader>
					<CardContent className='flex flex-col'>
						<ProgressCircle
							value={progressValue}
							strokeColor='stroke-[#FFDCC2]'
						>
							<div className='flex items-center flex-col'>
								<span className='text-sm text-[##575757]'>
									Elapsed Time (%{Math.round(progressValue)})
								</span>
								<div className='text-2xl font-bold text-primaryBlack'>
									{dayjs
										.duration(coundtDown, 'seconds')
										.format('HH:mm:ss')}
								</div>
							</div>
						</ProgressCircle>

						<div className='flex items-center justify-between mt-4 px-2 sm:px-12'>
							<FormField
								control={form.control}
								name='start_date'
								render={({ field }) => (
									<FormItem className='text-center'>
										<FormLabel>Started</FormLabel>
										<FormControl>
											<Input
												type='time'
												{...field}
												disabled
											/>
										</FormControl>

										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name='end_date'
								render={({ field }) => (
									<FormItem className='text-center'>
										<FormLabel>End</FormLabel>
										<FormControl>
											<Input
												type='time'
												{...field}
												disabled
											/>
										</FormControl>

										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
					</CardContent>
					<CardFooter>
						<Button
							className='w-full'
							type='submit'
							size='lg'
							loading={isLoading}
							disabled={isLoading}
						>
							End Fasting
						</Button>
					</CardFooter>
				</Card>
			</form>
		</Form>
	);
};

export default FastingInProgressForm;
