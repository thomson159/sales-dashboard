import type { ButtonHTMLAttributes, ReactNode } from 'react';

export type ButtonProps = {
  children: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({ children, className = '', ...rest }: ButtonProps) {
  return (
    <button type="button" className={`${'own-button'} ${className}`} {...rest}>
      {children}
    </button>
  );
}
