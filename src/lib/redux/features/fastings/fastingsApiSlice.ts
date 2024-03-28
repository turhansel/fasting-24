import {
	CompletedFastingsResponse,
	CompletedFastingsStatisticsResponse,
	CreateFastingRequest,
	DraftFormResponse,
	UpdateFastingRequest,
} from '@/lib/types';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import dayjs from 'dayjs';

export const fastingsApiSlice = createApi({
	baseQuery: fetchBaseQuery({
		baseUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/fastings`,
	}),
	reducerPath: 'fastingsApi',
	tagTypes: ['Fastings', 'Draft'],
	endpoints: (build) => ({
		getCompletedFastingsByUserId: build.query<
			CompletedFastingsResponse,
			void
		>({
			providesTags: ['Fastings'],
			query: () => ({
				url: '/completed',
				method: 'GET',
			}),
		}),
		useGetDraftFormValues: build.query<DraftFormResponse, void>({
			providesTags: ['Draft'],
			query: () => ({
				url: '/draft',
				method: 'GET',
			}),
		}),
		deleteFasting: build.mutation<
			{ message: string },
			{ fastingId: number }
		>({
			invalidatesTags: ['Fastings'],
			query: ({ fastingId }) => ({
				url: `/${fastingId}`,
				method: 'DELETE',
			}),
		}),
		updateFasting: build.mutation<
			{ message: string },
			UpdateFastingRequest
		>({
			invalidatesTags: ['Fastings'],
			query: (body) => ({
				url: `/${body.fastingId}`,
				method: 'PATCH',
				body,
			}),
		}),
		createNewFasting: build.mutation<
			{ message: string },
			CreateFastingRequest
		>({
			invalidatesTags: ['Fastings', 'Draft'],
			query: (body) => ({
				url: '',
				method: 'POST',
				body,
			}),
		}),
	}),
});

export const {
	useGetCompletedFastingsByUserIdQuery,
	useDeleteFastingMutation,
	useCreateNewFastingMutation,
	useUseGetDraftFormValuesQuery,
	useUpdateFastingMutation,
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
