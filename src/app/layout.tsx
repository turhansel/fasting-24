import type { Metadata } from 'next';
import './globals.css';
import { Roboto, Sen } from 'next/font/google';
import Header from '@/components/Header';
import { Toaster } from '@/components/ui/sonner';
import { StoreProvider } from './StoreProvider';

const roboto = Roboto({
	subsets: ['latin'],
	variable: '--font-roboto',
	weight: ['400', '700'],
	style: ['normal'],
	display: 'swap',
});

const sen = Sen({
	subsets: ['latin'],
	variable: '--font-sen',
	weight: ['400', '800'],
	style: ['normal'],
	display: 'swap',
});

const defaultUrl = process.env.NEXT_PUBLIC_SITE_URL as string;

export const metadata: Metadata = {
	metadataBase: new URL(defaultUrl),
	title: 'Fasting 24',
	description: 'Intermittent fasting',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en' className={`${roboto.variable} ${sen.variable}`}>
			<body className='min-h-svh antialiased font-roboto flex flex-col items-center'>
				<StoreProvider>
					<Header />
					<main className='flex flex-col items-center container'>
						{children}
					</main>
					<Toaster
						richColors
						expand={false}
						position='bottom-center'
					/>
				</StoreProvider>
			</body>
		</html>
	);
}
