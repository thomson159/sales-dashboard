import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Navbar } from '~/components/Navbar';

describe('Navbar', () => {
  const setup = (props = {}) =>
    render(
      <Navbar {...props}>
        <div data-testid="child">Child</div>
      </Navbar>,
    );

  const getExpandedHeader = () => screen.getByRole('button', { name: 'Collapse dashboard' });

  it('renders default title and children', () => {
    setup();
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByTestId('child')).toBeInTheDocument();
  });

  it('is expanded by default', () => {
    setup();
    const container = screen.getByTestId('child').closest('.filters-wrapper');
    expect(container).toHaveClass('filters-open');
  });

  it('collapses on header click', () => {
    setup();
    fireEvent.click(getExpandedHeader());
    const container = screen.getByTestId('child').closest('.filters-wrapper');
    expect(container).toHaveClass('filters-closed');
  });

  it('toggles on Enter key', () => {
    setup();
    fireEvent.keyDown(getExpandedHeader(), { key: 'Enter' });
    const container = screen.getByTestId('child').closest('.filters-wrapper');
    expect(container).toHaveClass('filters-closed');
  });

  it('toggles on Space key', () => {
    setup();
    fireEvent.keyDown(getExpandedHeader(), { key: ' ' });
    const container = screen.getByTestId('child').closest('.filters-wrapper');
    expect(container).toHaveClass('filters-closed');
  });

  it('toggles when inner button is clicked', () => {
    setup();
    fireEvent.click(screen.getByRole('button', { name: 'Expand dashboard' }));
    const container = screen.getByTestId('child').closest('.filters-wrapper');
    expect(container).toHaveClass('filters-closed');
  });

  it('shows spinner when loading is true', () => {
    const { container } = setup({ loading: true });
    expect(container.querySelector('.spinner')).toBeTruthy();
  });

  it('updates aria-label when toggled', () => {
    setup();
    const header = document.querySelector('[role="button"][tabindex="0"]') as HTMLElement;
    expect(header).toHaveAttribute('aria-label', 'Collapse dashboard');
    fireEvent.click(header);
    expect(header).toHaveAttribute('aria-label', 'Expand dashboard');
  });

  it('matches snapshot when expanded', () => {
    const { container } = setup();
    expect(container).toMatchSnapshot();
  });

  it('matches snapshot when collapsed', () => {
    const { container } = setup();
    fireEvent.click(getExpandedHeader());
    expect(container).toMatchSnapshot();
  });
});
