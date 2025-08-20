'use client';

import React, { useRef } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';

interface HoverTiltProps extends React.HTMLAttributes<HTMLDivElement> {
  intensity?: number; // degrees
  children: React.ReactNode;
}

export default function HoverTilt({
  intensity = 6,
  className,
  style,
  children,
  ...rest
}: HoverTiltProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-0.5, 0.5], [intensity, -intensity]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-intensity, intensity]);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width; // 0..1
    const py = (e.clientY - rect.top) / rect.height; // 0..1
    x.set(px - 0.5);
    y.set(py - 0.5);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      style={{
        perspective: 800,
        ...style,
      }}
      className={className}
      {...rest}
    >
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY }}
        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
