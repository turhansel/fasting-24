//https:github.com/tremorlabs/tremor/blob/main/src/components/vis-elements/ProgressCircle/ProgressCircle.tsx

import { cn } from '@/lib/utils/cn';
import React from 'react';

export interface ProgressCircleProps
	extends React.HTMLAttributes<HTMLDivElement> {
	value?: number;
	strokeColor?: string;
	children?: React.ReactNode;
}

function getLimitedValue(input: number | undefined) {
	if (input === undefined) {
		return 0;
	} else if (input > 100) {
		return 100;
	} else {
		return input;
	}
}

const ProgressCircle = React.forwardRef<HTMLDivElement, ProgressCircleProps>(
	(props, ref) => {
		const {
			value: inputValue,
			className,
			strokeColor = 'stroke-green-200',
			children,
			...other
		} = props;

		const value = getLimitedValue(inputValue);
		const radius = 100;
		const strokeWidth = 15;
		const normalizedRadius = radius - strokeWidth / 2;
		const circumference = normalizedRadius * 2 * Math.PI;
		const strokeDashoffset = (value / 100) * circumference;
		const offset = circumference - strokeDashoffset;

		return (
			<>
				<div
					ref={ref}
					className={cn(
						'flex flex-col items-center justify-center',
						className
					)}
					{...other}
				>
					<svg
						width={radius * 2}
						height={radius * 2}
						viewBox={`0 0 ${radius * 2} ${radius * 2}`}
						className='transform -rotate-90'
					>
						<circle
							r={normalizedRadius}
							cx={radius}
							cy={radius}
							strokeWidth={strokeWidth}
							fill='transparent'
							stroke='#EDEDED'
							strokeLinecap='round'
							className={`transition-colors ease-linear opacity-20 stroke-[#EDEDED]`}
						/>
						{value >= 0 ? (
							<circle
								r={normalizedRadius}
								cx={radius}
								cy={radius}
								strokeWidth={strokeWidth}
								strokeDasharray={
									circumference + ' ' + circumference
								}
								strokeDashoffset={offset}
								fill='white'
								stroke=''
								strokeLinecap='round'
								className={cn(
									'transition-all duration-300  ease-linear ',
									strokeColor
								)}
							/>
						) : null}
					</svg>
					<div className={cn('absolute flex')}>{children}</div>
				</div>
			</>
		);
	}
);

ProgressCircle.displayName = 'ProgressCircle';

export default ProgressCircle;
