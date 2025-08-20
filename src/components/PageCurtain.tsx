'use client';

import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { usePathname } from 'next/navigation';

/**
 * Simple brand-colored curtain transition that runs on route changes.
 * - No pointer interference
 * - Fast and unobtrusive
 */
export default function PageCurtain() {
	const controls = useAnimation();
	const pathname = usePathname();

	useEffect(() => {
		let isCancelled = false;
		async function run() {
			await controls.start({
				transformOrigin: '0% 50%',
				scaleX: [0, 1],
				opacity: [0, 1],
				transition: { duration: 0.18, ease: 'easeIn' },
			});
			if (isCancelled) return;
			await controls.start({
				transformOrigin: '100% 50%',
				scaleX: [1, 0],
				opacity: [1, 0],
				transition: { duration: 0.25, ease: 'easeOut', delay: 0.04 },
			});
		}
		run();
		return () => {
			isCancelled = true;
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [pathname]);

	return (
		<motion.div
			aria-hidden
			className="fixed inset-0 z-50 pointer-events-none"
			initial={{ scaleX: 0, opacity: 0 }}
			animate={controls}
			style={{ background: 'hsl(var(--primary))' }}
		/>
	);
}


