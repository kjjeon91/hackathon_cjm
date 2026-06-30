import type { ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

type Variant = 'primary' | 'secondary' | 'ghost' | 'outline';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

const variants: Record<Variant, string> = {
  primary:
    'bg-gradient-to-br from-navy to-blue text-white shadow-header hover:brightness-110 active:brightness-95',
  secondary: 'bg-blue/10 text-blue hover:bg-blue/15',
  ghost: 'text-muted hover:bg-line/60 hover:text-ink',
  outline: 'border border-line bg-white text-ink hover:border-blue/40 hover:text-blue',
};

const sizes: Record<Size, string> = {
  sm: 'h-9 px-3.5 text-sm',
  md: 'h-11 px-5 text-base',
  lg: 'h-12 px-7 text-md',
};

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-2xl font-semibold transition-all duration-150 focus-ring disabled:cursor-not-allowed disabled:opacity-50',
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    />
  );
}
