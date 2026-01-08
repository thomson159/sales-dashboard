import type { ButtonHTMLAttributes } from 'react';
import type { Children } from '~/types/components.types';

export type ButtonProps = Children & ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({ children, className = '', ...rest }: ButtonProps) {
  return (
    <button type="button" className={`${'own-button'} ${className}`} {...rest}>
      {children}
    </button>
  );
}
