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
    'bg-gradient-to-br from-navy to-blue text-white shadow-header hover:-translate-y-0.5 hover:shadow-lift hover:brightness-110 active:translate-y-0 active:brightness-95',
  secondary: 'bg-ice text-navy hover:bg-blue/15 hover:-translate-y-0.5 active:translate-y-0',
  ghost: 'text-muted hover:bg-ice hover:text-navy',
  outline:
    'border border-line bg-white text-ink hover:border-blue/50 hover:text-blue hover:shadow-soft',
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
        'inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-200 ease-ocean focus-ring disabled:cursor-not-allowed disabled:opacity-50',
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    />
  );
}
