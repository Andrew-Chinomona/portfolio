'use client';

import { GlassCard } from '@developer-hub/liquid-glass';
import { cn } from '@/lib/utils';
import React from 'react';

interface LiquidGlassCardProps {
  children: React.ReactNode;
  className?: string;
  cornerRadius?: number;
}

export const LiquidGlassCard = ({
  children,
  className,
  cornerRadius = 16,
}: LiquidGlassCardProps) => {
  return (
    <GlassCard
      cornerRadius={cornerRadius}
      displacementScale={0}
      blurAmount={0.01}
      padding="0"
      shadowMode={false}
      className={cn(
        'relative overflow-hidden min-w-[100px] min-h-[100px]',
        'bg-white/20 backdrop-blur-xl border border-white/30',
        '[box-shadow:none]',
        className
      )}
    >
      {children}
    </GlassCard>
  );
};
