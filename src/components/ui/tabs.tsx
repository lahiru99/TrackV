'use client';

import * as React from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import { motion } from 'framer-motion';

import { cn } from '@/lib/utils';

const Tabs = TabsPrimitive.Root;

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, children, ...props }, ref) => {
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const [pill, setPill] = React.useState<{
    left: number;
    width: number;
    height: number;
    top: number;
  } | null>(null);

  React.useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const measure = () => {
      const active = el.querySelector(
        '[data-state="active"]'
      ) as HTMLElement | null;
      if (!active) return;
      const parentRect = el.getBoundingClientRect();
      const rect = active.getBoundingClientRect();
      setPill({
        left: rect.left - parentRect.left,
        width: rect.width,
        height: rect.height,
        top: rect.top - parentRect.top,
      });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    const int = setInterval(measure, 150);
    el.addEventListener('click', () => setTimeout(measure, 0), true);
    el.addEventListener('keydown', () => setTimeout(measure, 0), true);
    return () => {
      ro.disconnect();
      clearInterval(int);
    };
  }, []);

  return (
    <TabsPrimitive.List
      ref={(node) => {
        if (typeof ref === 'function') ref(node);
        // @ts-ignore
        else if (ref) ref.current = node;
        containerRef.current = node as HTMLDivElement | null;
      }}
      className={cn(
        'relative inline-flex h-12 items-center justify-center rounded-xl bg-muted/70 p-1 text-muted-foreground gap-1',
        className
      )}
      {...props}
    >
      {pill && (
        <motion.div
          layout
          className="absolute rounded-lg bg-background shadow-sm border"
          initial={false}
          animate={{
            left: pill.left,
            top: pill.top,
            width: pill.width,
            height: pill.height,
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        />
      )}
      {children}
    </TabsPrimitive.List>
  );
});
TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      'relative inline-flex items-center justify-center whitespace-nowrap rounded-md px-4 py-2 text-sm font-medium ring-offset-background transition hover:-translate-y-0.5 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=inactive]:text-muted-foreground',
      className
    )}
    {...props}
  />
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      'mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
      className
    )}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsList, TabsTrigger, TabsContent };
