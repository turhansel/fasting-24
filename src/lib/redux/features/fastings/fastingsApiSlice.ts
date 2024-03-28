import {
	CompletedFastingsResponse,
	CompletedFastingsStatisticsResponse,
} from '@/lib/types';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import dayjs from 'dayjs';

export const fastingsApiSlice = createApi({
	baseQuery: fetchBaseQuery({
		baseUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/fastings`,
	}),
	reducerPath: 'fastingsApi',
	tagTypes: ['Fastings'],
	endpoints: (build) => ({
		getCompletedFastingsByUserId: build.query<
			CompletedFastingsResponse,
			void
		>({
			providesTags: ['Fastings'],
			query: () => ({
				url: '',
				method: 'GET',
			}),
		}),
		deleteFasting: build.mutation<any, { fastingId: number }>({
			invalidatesTags: ['Fastings'],
			query: ({ fastingId }) => ({
				url: `/${fastingId}`,
				method: 'PATCH',
			}),
		}),
	}),
});

export const {
	useGetCompletedFastingsByUserIdQuery,
	useDeleteFastingMutation,
} = fastingsApiSlice;

export const useGetCompletedFastingsStatistics =
	(): CompletedFastingsStatisticsResponse => {
		const { data, error } = useGetCompletedFastingsByUserIdQuery();

		if (!data?.completedFastings.length || error) {
			return null;
		}

		const totalCompletedHours = data?.completedFastings.reduce(
			(acc, record) => {
				const start = dayjs(record.start_date);
				const end = dayjs(record.end_date);
				const durationHours = end.diff(start, 'hour', true); // 'true' for floating point result
				return acc + durationHours;
			},
			0
		);

		const totalCompletedFastingCount = data?.completedFastings?.length;

		return {
			totalCompletedHours,
			totalCompletedFastingCount,
		};
	};
