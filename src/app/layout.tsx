import type { Metadata } from 'next';
import './globals.css';
import { Roboto } from 'next/font/google';
import { cn } from '@/lib/utils';

const roboto = Roboto({
	subsets: ['latin'],
	variable: '--font-roboto',
	weight: ['400', '700'],
	style: ['normal'],
	display: 'swap',
});

export const metadata: Metadata = {
	title: 'Fasting 24',
	description: 'Intermittent fasting',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body
				className={cn(
					'min-h-screen bg-background font-roboto antialiased',
					roboto.variable
				)}
			>
				{children}
			</body>
		</html>
	);
}
