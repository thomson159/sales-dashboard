import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Footer } from '~/components/small/Footer';

describe('Footer', () => {
  it('renders correctly', () => {
    render(<Footer />);
    const footer = screen.getByText((content) => content.includes('All rights reserved'));
    expect(footer).toBeDefined();
  });

  it('displays the current year', () => {
    const currentYear = new Date().getFullYear().toString();
    render(<Footer />);
    expect(screen.getByText((content) => content.includes(currentYear))).toBeDefined();
  });

  it('matches snapshot', () => {
    const { container } = render(<Footer />);
    expect(container).toMatchSnapshot();
  });
});
