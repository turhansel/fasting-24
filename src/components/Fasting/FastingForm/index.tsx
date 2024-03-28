'use client';

import { useUseGetDraftFormValuesQuery } from '@/lib/redux/features/fastings/fastingsApiSlice';
import CreateForm from './CreateForm';
import FastingInProgressForm from './FastingInProgressForm';
import FastingCompletedForm from './FastingPreCompletedForm';
import { DraftFormResponse } from '@/lib/types';

enum FormType {
	CREATE = 'CREATE',
	IN_PROGRESS = 'IN_PROGRESS',
	PRE_COMPLETED = 'COMPLETED',
}

const DecideFastingFormType: Record<FormType, React.FC<DraftFormResponse>> = {
	[FormType.CREATE]: CreateForm,
	[FormType.IN_PROGRESS]: FastingInProgressForm,
	[FormType.PRE_COMPLETED]: FastingCompletedForm,
};

const FastingForm: React.FC = () => {
	const { data, isLoading } = useUseGetDraftFormValuesQuery();

	let formType = FormType.CREATE;

	if (isLoading) {
		return <div>loading...</div>;
	}

	if (data?.inProgressFasting) {
		formType = FormType.IN_PROGRESS;
	}

	if (data?.preCompletedFasting) {
		formType = FormType.PRE_COMPLETED;
	}

	const DecidedForm = DecideFastingFormType[formType];

	return <DecidedForm {...data} />;
};

export default FastingForm;
