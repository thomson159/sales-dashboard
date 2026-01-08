import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Filters from '~/components/Filters/Filters';
import type { FiltersProps } from '~/types/components.types';

const applyMock = vi.fn();
const dispatchMock = vi.fn();

vi.mock('~/hooks/useAvailableChannelNames', () => ({
  useAvailableChannelNames: () => ['Amazon', 'Ebay'],
}));

vi.mock('~/hooks/useFiltersState', () => ({
  useFiltersState: () => ({
    state: {
      channelName: 'Test',
      minDate: '2024-01-01',
      maxDate: '2024-01-31',
      channelNames: ['Amazon'],
    },
    hasChanges: true,
    apply: applyMock,
    dispatch: dispatchMock,
  }),
}));

const props: FiltersProps = {
  data: [],
  channelName: '',
  channelNames: [],
  minDate: '',
  maxDate: '',
  onChange: vi.fn(),
};

describe('Filters', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders FiltersView with available channels', () => {
    render(<Filters {...props} />);

    expect(screen.getByText(/amazon/i)).toBeInTheDocument();
    expect(screen.getByText(/ebay/i)).toBeInTheDocument();
  });

  it('calls apply when Apply button is clicked', () => {
    render(<Filters {...props} />);

    const button = screen.getByRole('button', { name: /apply/i });
    fireEvent.click(button);

    expect(applyMock).toHaveBeenCalledTimes(1);
  });

  it('dispatches action when channel button is clicked', () => {
    render(<Filters {...props} />);

    fireEvent.click(screen.getByText(/amazon/i));

    expect(dispatchMock).toHaveBeenCalledWith({
      type: 'TOGGLE_CHANNEL',
      value: 'Amazon',
    });
  });

  it('dispatches action when channel name input changes', () => {
    render(<Filters {...props} />);

    const input = screen.getByDisplayValue('Test');
    fireEvent.change(input, { target: { value: 'New name' } });

    expect(dispatchMock).toHaveBeenCalled();
  });

  it('matches snapshot', () => {
    const { container } = render(<Filters {...props} />);
    expect(container).toMatchSnapshot();
  });
});
