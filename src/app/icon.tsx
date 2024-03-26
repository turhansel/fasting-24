import { ImageResponse } from 'next/og';

// Route segment config
export const runtime = 'edge';

// Image metadata
export const size = {
	width: 32,
	height: 32,
};
export const contentType = 'image/png';

// Image generation
export default function Icon() {
	return new ImageResponse(
		(
			// ImageResponse JSX element
			<div
				style={{
					fontSize: 24,
					background: 'white',
					width: '100%',
					height: '100%',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					color: 'white',
				}}
			>
				<svg width='50' height='50' viewBox='0 0 50 50'>
					<path
						d='M24.7 0C11.1 0 0 11.1 0 24.7C0 38.3 11.1 49.4 24.7 49.4C38.3 49.4 49.4 38.3 49.4 24.7C49.4 11.1 38.3 0 24.7 0ZM6.9 24.7C6.9 19.6 9.1 14.9 12.6 11.7C14 10.4 16.4 10.8 17.4 12.5L23.6 23.2C24.2 24.2 24.2 25.4 23.6 26.4L17.4 37.1C16.4 38.9 14 39.2 12.5 37.8C9.1 34.4 6.9 29.8 6.9 24.7ZM32 36.9L25.8 26.2C25.2 25.2 25.2 24 25.8 23L32 12.3C33 10.6 35.3 10.2 36.8 11.5C40.3 14.7 42.5 19.4 42.5 24.5C42.5 29.6 40.3 34.3 36.8 37.5C35.3 39.1 33 38.7 32 36.9Z'
						fill='#002548'
					/>
				</svg>
			</div>
		),
		// ImageResponse options
		{
			// For convenience, we can re-use the exported icons size metadata
			// config to also set the ImageResponse's width and height.
			...size,
		}
	);
}
