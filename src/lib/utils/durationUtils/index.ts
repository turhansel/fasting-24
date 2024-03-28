import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);
dayjs.extend(duration);

export function formatDuration(seconds: number): string {
	const dur = dayjs.duration(seconds, 'seconds');

	const hours = Math.floor(dur.asHours());
	const minutes = dur.minutes();

	let formattedDuration = `${hours} Hour${hours !== 1 ? 's' : ''}`;
	if (minutes > 0) {
		formattedDuration += ` ${minutes} Minute${minutes !== 1 ? 's' : ''}`;
	}

	return formattedDuration;
}

export function calculateDurationDifference({
	startDate,
	endDate,
}: {
	startDate: string;
	endDate: string;
}) {
	const start = dayjs(startDate);
	const end = dayjs(endDate);

	const durationInSeconds = end.diff(start, 'seconds');

	return durationInSeconds;
}

export function timeDiffFromNow(endDate: string): string {
	const now = dayjs();
	const end = dayjs(endDate);
	const diffInMinutes = now.diff(end, 'minute');
	const diffInHours = now.diff(end, 'hour');
	const diffInDays = now.diff(end, 'day');

	if (diffInMinutes < 60) {
		return `${diffInMinutes} min ago`;
	} else if (diffInHours < 24) {
		const remainingMinutes = diffInMinutes % 60;
		return `${diffInHours} hours ${remainingMinutes} min ago`;
	} else {
		return `${diffInDays} days ago`;
	}
}
