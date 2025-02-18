// src/components/ui/text.tsx
import { ReactNode } from 'react';

interface TextProps {
  children: ReactNode;  // Explicitly define 'children' as a ReactNode type
  className?: string;   // Optional className for additional styles
  [key: string]: any;   // Allow other props like 'style' or 'id' to pass through
}

export function Text({ children, className, ...props }: TextProps) {
  return (
    <p className={`text-sm text-muted-foreground ${className}`} {...props}>
      {children}
    </p>
  );
}
