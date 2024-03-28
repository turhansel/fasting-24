'use client';

import { useUseGetDraftFormValuesQuery } from '@/lib/redux/features/fastings/fastingsApiSlice';
import CreateForm from './CreateForm';
import FastingInProgressForm from './FastingInProgressForm';
import FastingCompletedForm from './FastingPreCompletedForm';
import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

const FastingForm: React.FC = () => {
	const { data, isLoading, isFetching } = useUseGetDraftFormValuesQuery();

	if (isLoading || isFetching)
		return <Skeleton className='h-[514px] w-[530px] rounded-xl' />;

	if (!!data?.inProgressFasting) return <FastingInProgressForm {...data} />;

	if (!!data?.preCompletedFasting) return <FastingCompletedForm {...data} />;

	return <CreateForm />;
};

export default FastingForm;
