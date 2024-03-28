export enum FastingStatus {
	InProgress = 'InProgress',
	Completed = 'Completed',
	Deteled = 'Deleted',
}

export type FastingRecord = {
	id: number;
	user_id: number;
	start_date: string;
	end_date: string;
	completed_date: string;
	duration: number;
	status: FastingStatus;
};

export type CompletedFastingsResponse = {
	completedFastings: FastingRecord[] | [];
};

export type CompletedFastingsStatisticsResponse = {
	totalCompletedHours: number;
	totalCompletedFastingCount: number;
} | null;
