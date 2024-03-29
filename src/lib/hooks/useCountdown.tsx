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
			setTimeLeft((prevTimeLeft) => {
				if (prevTimeLeft <= 0) {
					clearInterval(timer);
					if (onEnd) {
						onEnd();
					}

					return 0;
				}

				return prevTimeLeft - 1;
			});
		}, interval);

		return () => {
			clearInterval(timer);
		};
	}, [duration, interval, onEnd]);

	return timeLeft;
}
