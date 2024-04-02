import { useEffect, useState } from 'react';

export default function useCountdown({
	duration,
	interval = 1000,
	onEnd,
}: {
	duration: number;
	interval: number;
	onEnd?: () => void;
}) {
	const [timeLeft, setTimeLeft] = useState(duration);

	useEffect(() => {
		const timer = setInterval(() => {
			if (timeLeft <= 0) {
				clearInterval(timer);
				if (onEnd) {
					onEnd();
				}
				return;
			}
			setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
		}, interval);

		return () => {
			clearInterval(timer);
		};
	}, [duration, interval, onEnd]);

	return timeLeft;
}
