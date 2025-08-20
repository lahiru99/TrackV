'use client';

import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface GlitchTextProps {
  text: string;
  className?: string;
  durationMs?: number; // how long each glitch lasts
}

const glyphs =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{};:,.<>/?';

export default function GlitchText({
  text,
  className,
  durationMs = 600,
}: GlitchTextProps) {
  const [display, setDisplay] = useState(text);
  const tickRef = useRef<number | null>(null);
  const revertRef = useRef<number | null>(null);

  function startHoverGlitch() {
    stopHoverGlitch();
    tickRef.current = window.setInterval(() => {
      const scrambled = text
        .split('')
        .map(() => glyphs[Math.floor(Math.random() * glyphs.length)])
        .join('');
      setDisplay(scrambled);
    }, 50) as unknown as number; // fast flicker per letter
    revertRef.current = window.setTimeout(() => {
      stopHoverGlitch();
      setDisplay(text);
    }, durationMs) as unknown as number;
  }

  function stopHoverGlitch() {
    if (tickRef.current) window.clearInterval(tickRef.current);
    if (revertRef.current) window.clearTimeout(revertRef.current);
    tickRef.current = null;
    revertRef.current = null;
  }

  return (
    <motion.span
      className={className}
      key={display}
      initial={{ filter: 'none' }}
      animate={{
        filter: display !== text ? 'contrast(140%) saturate(120%)' : 'none',
      }}
      transition={{ duration: 0.2 }}
      onMouseEnter={startHoverGlitch}
      onMouseLeave={() => {
        stopHoverGlitch();
        setDisplay(text);
      }}
      onFocus={startHoverGlitch}
      onBlur={() => {
        stopHoverGlitch();
        setDisplay(text);
      }}
    >
      {display}
    </motion.span>
  );
}
