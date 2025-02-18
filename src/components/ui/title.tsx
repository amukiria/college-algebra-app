// src/components/ui/title.tsx
import { ReactNode } from 'react';

interface TitleProps {
  children: ReactNode;  // Type for the 'children' prop
  className?: string;   // Optional 'className' prop for custom styling
  [key: string]: any;   // Allow other props like 'id', 'style', etc.
}

export function Title({ children, className, ...props }: TitleProps) {
  return (
    <h1 className={`text-xl font-bold ${className}`} {...props}>
      {children}
    </h1>
  );
}
