import { styled } from 'styled-components';
import type { ButtonHTMLAttributes } from 'react';
import type { Children } from '~/types/components.types';

export type ButtonProps = Children & ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({ children, className = '', ...rest }: ButtonProps) {
  return (
    <button type="button" className={`own-button ${className}`} {...rest}>
      {children}
    </button>
  );
}

// ⚠️ A sample usage of `styled-components` was added to the project for demonstration purposes only,
// however it is not the recommended approach.With`styled-components`, styles are injected at render time,
// which may cause a brief flash of unstyled content and visible layout shifts.In our case,
// loading scss files before rendering components provides more stable initial styling and
// prevents the page from visually “jumping” during load.

const StyledButton = styled.button`
  position: relative;
  font-weight: 700;
  font-size: 16px;
  border: none;
  border-radius: 0.5rem;
  padding: 0.5rem 1.5rem;
  cursor: pointer;
  white-space: nowrap;
  color: var(--white);
  background: linear-gradient(135deg, #7c3aed, #9333ea, #ec4899);

  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease,
    filter 0.2s ease;

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    transform: translateY(-1px);
    box-shadow: 0 8px 20px rgba(124, 58, 237, 0.35);
    filter: brightness(1.15);
  }
`;

export function OwnButton({ children, ...rest }: ButtonProps) {
  return (
    <StyledButton type="button" {...rest}>
      {children}
    </StyledButton>
  );
}
