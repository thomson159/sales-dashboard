import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import type { ButtonProps } from '~/components/small/Button';
import { PageSizeFilter } from '~/components/PageSizeFilter';
import type { UsePageSizeResult } from '~/types/hooks.types';

const handleChangeMock = vi.fn();
const applyPageSizeMock = vi.fn();

const mockUsePageSizeResult: UsePageSizeResult = {
  localPageSize: 10,
  handleChange: handleChangeMock,
  applyPageSize: applyPageSizeMock,
};

vi.mock('~/hooks/usePageSize', () => ({
  usePageSize: () => mockUsePageSizeResult,
}));

vi.mock('~/components/Button/Button', () => ({
  Button: ({ children, onClick }: ButtonProps) => <button onClick={onClick}>{children}</button>,
}));

describe('PageSizeFilter', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders input and apply button', () => {
    render(<PageSizeFilter pageSize={10} dataLength={100} onChange={vi.fn()} />);
    expect(screen.getByLabelText('Per Page')).toBeDefined();
    expect(screen.getByText('Apply')).toBeDefined();
  });

  it('sets correct input attributes', () => {
    render(<PageSizeFilter pageSize={10} dataLength={50} min={5} onChange={vi.fn()} />);
    const input = screen.getByLabelText('Per Page') as HTMLInputElement;
    expect(input.min).toBe('5');
    expect(input.max).toBe('50');
    expect(input.value).toBe('10');
  });

  it('calls handleChange on input change', () => {
    render(<PageSizeFilter pageSize={10} dataLength={100} onChange={vi.fn()} />);
    const input = screen.getByLabelText('Per Page');
    fireEvent.change(input, { target: { value: '20' } });
    expect(handleChangeMock).toHaveBeenCalled();
  });

  it('calls applyPageSize when Apply button is clicked', () => {
    render(<PageSizeFilter pageSize={10} dataLength={100} onChange={vi.fn()} />);
    fireEvent.click(screen.getByText('Apply'));
    expect(applyPageSizeMock).toHaveBeenCalled();
  });

  it('matches snapshot', () => {
    const { container } = render(
      <PageSizeFilter pageSize={10} dataLength={100} onChange={vi.fn()} />,
    );
    expect(container).toMatchSnapshot();
  });
});
