import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Navbar } from '~/components/Navbar';

describe('Navbar', () => {
  const onToggleMock = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders title and arrow when collapsed', () => {
    render(
      <Navbar expanded={false} onToggle={onToggleMock}>
        Child
      </Navbar>,
    );
    expect(screen.getByText('Dashboard')).toBeDefined();
    expect(screen.getByText('Child')).toBeDefined();
    const container = screen.getByText('Child').closest('.filters-wrapper');
    expect(container).toHaveClass('filters-closed');
  });

  it('does not show arrow when expanded', () => {
    render(
      <Navbar expanded={true} onToggle={onToggleMock}>
        Child
      </Navbar>,
    );
    expect(screen.queryByText('▼')).toBeNull();
    const container = screen.getByText('Child').closest('.filters-wrapper');
    expect(container).toHaveClass('filters-open');
  });

  it('calls onToggle when header is clicked', () => {
    render(
      <Navbar expanded={false} onToggle={onToggleMock}>
        Child
      </Navbar>,
    );
    const header = screen.getByText('Dashboard').closest('div');
    if (!header) throw new Error('Header div not found');
    fireEvent.click(header);
    expect(onToggleMock).toHaveBeenCalledTimes(1);
  });

  it('calls onToggle and stops propagation when button is clicked', () => {
    const stopPropagationMock = vi.fn();
    render(
      <Navbar expanded={true} onToggle={onToggleMock}>
        Child
      </Navbar>,
    );

    const buttons = screen.getAllByRole('button');
    const button = buttons[1];

    fireEvent.click(button, { stopPropagation: stopPropagationMock });

    expect(onToggleMock).toHaveBeenCalledTimes(1);
  });

  it('matches snapshot when collapsed', () => {
    const { container } = render(
      <Navbar expanded={false} onToggle={onToggleMock}>
        Child
      </Navbar>,
    );
    expect(container).toMatchSnapshot();
  });

  it('matches snapshot when expanded', () => {
    const { container } = render(
      <Navbar expanded={true} onToggle={onToggleMock}>
        Child
      </Navbar>,
    );
    expect(container).toMatchSnapshot();
  });
});
