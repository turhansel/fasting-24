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
import { useMemo } from 'react';
import { CreateFastingRequest, DraftFormResponse } from '@/lib/types';
import { useCreateNewFastingMutation } from '@/lib/redux/features/fastings/fastingsApiSlice';
import ProgressCircle from '@/components/CircularProgressBar';

const CreateForm: React.FC = () => {
	const form = useForm<z.infer<typeof FastingFormSchema>>({
		resolver: zodResolver(FastingFormSchema),
		defaultValues: {
			start_date: dayjs().format('HH:mm'),
			end_date: dayjs().add(8, 'hour').format('HH:mm'),
		},
	});

	const [createFasting, { isLoading }] = useCreateNewFastingMutation();

	const { fastingDuration, progressValue } = useMemo(() => {
		// Parse start and end times as today's dates for comparison
		const now = dayjs();
		const startDate = now
			.hour(parseInt(form.getValues('start_date').substring(0, 2)))
			.minute(parseInt(form.getValues('start_date').substring(3)))
			.second(0);
		const endDate = now
			.hour(parseInt(form.getValues('end_date').substring(0, 2)))
			.minute(parseInt(form.getValues('end_date').substring(3)))
			.second(0);

		let durationInSeconds = endDate.diff(startDate, 'second');
		if (durationInSeconds < 0) {
			durationInSeconds += 24 * 60 * 60; // Add one day's worth of seconds
		}

		const hours = Math.floor(durationInSeconds / 3600);
		const minutes = Math.floor((durationInSeconds % 3600) / 60);
		const seconds = durationInSeconds % 60;

		const formattedDuration = `${hours
			.toString()
			.padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds
			.toString()
			.padStart(2, '0')}`;

		const progressValue = Math.round(
			(durationInSeconds / (24 * 60 * 60)) * 100
		);

		return { fastingDuration: formattedDuration, progressValue };
	}, [form.watch('start_date'), form.watch('end_date')]);

	const onSubmit = async (values: z.infer<typeof FastingFormSchema>) => {
		const baseDate = dayjs().format('YYYY-MM-DD');

		let startDateTimeStamp = dayjs(`${baseDate}T${values.start_date}:00`);
		let endDateTimeStamp = dayjs(`${baseDate}T${values.end_date}:00`);

		if (endDateTimeStamp.isBefore(startDateTimeStamp)) {
			endDateTimeStamp = endDateTimeStamp.add(1, 'day');
		}

		const startDateTimeISO = startDateTimeStamp.toISOString();
		const endDateTimeISO = endDateTimeStamp.toISOString();
		const duration = endDateTimeStamp.diff(startDateTimeStamp, 'second');

		const payload: CreateFastingRequest = {
			start_date: startDateTimeISO,
			end_date: endDateTimeISO,
			duration,
		};

		try {
			const result = await createFasting(payload).unwrap();
			toast.success(result.message);
		} catch (error: any) {
			const message = error?.data?.message;
			toast.error(message ?? 'Unknown error');
		}
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='animate-in flex flex-col w-full justify-center gap-2 text-foreground p-2 sm:p-0'
			>
				<Card className='w-full '>
					<CardHeader className='pt-16'>
						<CardTitle className='text-2xl text-center text-primaryBlack'>
							Ready to Fasting
						</CardTitle>
					</CardHeader>
					<CardContent className='flex flex-col'>
						<ProgressCircle
							value={progressValue}
							strokeColor='stroke-[#9192EA]'
						>
							<div className='flex items-center flex-col'>
								<span className='text-sm text-[##575757]'>
									Set Fasting Time
								</span>
								<div className='text-2xl font-bold text-primaryBlack'>
									{fastingDuration}
								</div>
							</div>
						</ProgressCircle>

						<div className='flex items-center justify-between mt-4 px-2 sm:px-12'>
							<FormField
								control={form.control}
								name='start_date'
								render={({ field }) => (
									<FormItem className='text-center'>
										<FormLabel>Start to</FormLabel>
										<FormControl>
											<Input type='time' {...field} />
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
										<FormLabel>End to</FormLabel>
										<FormControl>
											<Input type='time' {...field} />
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
							Start Fasting
						</Button>
					</CardFooter>
				</Card>
			</form>
		</Form>
	);
};

export default CreateForm;
