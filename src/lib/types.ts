export enum FastingStatus {
	InProgress = 'InProgress',
	Completed = 'Completed',
	PreCompleted = 'PreCompleted',
	Deteled = 'Deleted',
}

export type FastingRecord = {
	id: number;
	user_id: number;
	start_date: string;
	end_date: string;
	duration: number;
	status: FastingStatus;
};

export type CompletedFastingsResponse = {
	status: number;
	completedFastings: FastingRecord[] | [];
};

export type CompletedFastingsStatisticsResponse = {
	totalCompletedHours: number;
	totalCompletedFastingCount: number;
} | null;

export type CreateFastingRequest = {
	start_date: string;
	end_date: string;
	duration: number;
};

export type UpdateFastingRequest = {
	end_date?: string;
	duration?: number;
	fastingId: number;
	endFasting?: boolean;
};

export type DraftFormResponse = {
	status?: number;
	inProgressFasting?: FastingRecord | null;
	preCompletedFasting?: FastingRecord | null;
};
