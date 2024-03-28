import FastingStatistics from '@/components/Fasting/FastingStatistics';
import FastingList from '@/components/Fasting/FastingList';

export default async function Fastings() {
	return (
		<>
			<FastingStatistics />

			<FastingList />
		</>
	);
}
