'use client';

import React, { useEffect, useMemo, useRef, useState, memo } from 'react';
import { useInView } from 'framer-motion';

interface CounterProps {
  to: number;
  from?: number;
  durationMs?: number;
  className?: string;
  formatter?: (n: number) => string;
}

const defaultFormatter = (n: number) => Math.floor(n).toLocaleString();

const Counter: React.FC<CounterProps> = ({
  to,
  from = 0,
  durationMs = 1200,
  className = '',
  formatter = defaultFormatter,
}) => {
  const ref = useRef<HTMLSpanElement | null>(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -20% 0px' });
  const [value, setValue] = useState<number>(from);

  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    let start: number | null = null;
    const total = Math.max(200, durationMs);

    const step = (ts: number) => {
      if (start === null) start = ts;
      const elapsed = ts - start;
      const progress = Math.min(1, elapsed / total);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(from + (to - from) * eased);
      if (progress < 1) raf = requestAnimationFrame(step);
    };

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, from, to, durationMs]);

  const text = useMemo(() => formatter(value), [value, formatter]);

  return (
    <span ref={ref} className={className} style={{ willChange: inView ? 'auto' : 'contents' }}>
      {text}
    </span>
  );
};

// Memoize component to prevent unnecessary re-renders
export default memo(Counter);


