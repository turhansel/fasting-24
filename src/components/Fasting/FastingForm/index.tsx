'use client';

import { useUseGetDraftFormValuesQuery } from '@/lib/redux/features/fastings/fastingsApiSlice';
import CreateForm from './CreateForm';
import FastingInProgressForm from './FastingInProgressForm';
import FastingCompletedForm from './FastingPreCompletedForm';
import React from 'react';

const FastingForm: React.FC = () => {
	const { data, isLoading } = useUseGetDraftFormValuesQuery();

	if (isLoading) return <div>Loading...</div>;

	if (!!data?.inProgressFasting) return <FastingInProgressForm {...data} />;

	if (!!data?.preCompletedFasting) return <FastingCompletedForm {...data} />;

	return <CreateForm />;
};

export default FastingForm;
