'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface DynamicShadowProps extends React.HTMLAttributes<HTMLDivElement> {
	radius?: number; // blur radius in px
	elevation?: number; // y-translation on hover
}

export default function DynamicShadow({
	children,
	className,
	style,
	radius = 24,
	elevation = 6,
	...rest
}: DynamicShadowProps) {
	return (
		<motion.div
			whileHover={{ y: -elevation }}
			transition={{ type: 'spring', stiffness: 350, damping: 26 }}
			style={{
				filter: `drop-shadow(0 ${Math.max(2, elevation)}px ${radius}px rgba(0,0,0,0.3))`,
				...style,
			}}
			className={className}
			{...rest}
		>
			{children}
		</motion.div>
	);
}


