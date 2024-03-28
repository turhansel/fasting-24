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
import { DraftFormResponse } from '@/lib/types';
import { useUpdateFastingMutation } from '@/lib/redux/features/fastings/fastingsApiSlice';
import ProgressCircle from '@/components/CircularProgressBar';
import Confetti from 'react-confetti';

const FastingPreCompletedForm: React.FC<DraftFormResponse> = ({
	preCompletedFasting,
}) => {
	const startDate = dayjs(preCompletedFasting?.start_date);
	const endDate = dayjs(preCompletedFasting?.end_date);

	const form = useForm<z.infer<typeof FastingFormSchema>>({
		resolver: zodResolver(FastingFormSchema),
		defaultValues: {
			start_date: startDate.format('HH:mm'),
			end_date: endDate.format('HH:mm'),
		},
	});

	const totalDurationSeconds = endDate.diff(startDate, 'second');
	const progressValue = (totalDurationSeconds / totalDurationSeconds) * 100;

	const hours = Math.floor(totalDurationSeconds / 3600);
	const minutes = Math.floor((totalDurationSeconds % 3600) / 60);
	const seconds = totalDurationSeconds % 60;

	const fastingDuration = `${hours.toString().padStart(2, '0')}:${minutes
		.toString()
		.padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

	const [updateMutation, { isLoading }] = useUpdateFastingMutation();

	const onSubmit = async () => {
		try {
			const result = await updateMutation({
				fastingId: preCompletedFasting?.id!,
			}).unwrap();
			toast.success(result.message);
		} catch (error: any) {
			const message = error?.data?.message;
			toast.error(message ?? 'Unknown error');
		}
	};

	return (
		<Form {...form}>
			<Confetti width={window.innerWidth} height={window.innerHeight} />
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='animate-in flex flex-col w-full justify-center gap-2 text-foreground'
			>
				<Card className='w-full '>
					<CardHeader className='pt-16'>
						<CardTitle className='text-2xl text-center text-primaryBlack'>
							Fasting is Completed!
						</CardTitle>
					</CardHeader>
					<CardContent className='flex flex-col'>
						<ProgressCircle
							value={progressValue}
							strokeColor='stroke-[#52D13D]'
						>
							<div className='flex items-center flex-col'>
								<span className='text-sm text-[##575757]'>
									Total Time (%{Math.round(progressValue)})
								</span>
								<div className='text-2xl font-bold text-primaryBlack'>
									{fastingDuration}
								</div>
							</div>
						</ProgressCircle>

						<div className='flex items-center px-20 gap-4 mt-4'>
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
										<FormLabel>Ended</FormLabel>
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

export default FastingPreCompletedForm;
