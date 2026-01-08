import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { ButtonProps } from '~/components/small/Button';
import { FiltersView } from '~/components/Filters/Filters.view';
import type { FiltersViewProps } from '~/types/components.types';
import type { State } from '~/types/state.types';

vi.mock('~/components/Button/Button', () => ({
  Button: ({ children, onClick, disabled }: ButtonProps) => (
    <button onClick={onClick} disabled={disabled}>
      {children}
    </button>
  ),
}));

const baseState: State = {
  channelName: '',
  minDate: '',
  maxDate: '',
  channelNames: [],
};

type SetupOverrides = Partial<{
  state: Partial<State>;
  channels: readonly string[];
  hasChanges: boolean;
}>;

const setup = (overrides: SetupOverrides = {}) => {
  const dispatch = vi.fn<FiltersViewProps['dispatch']>();
  const apply = vi.fn<FiltersViewProps['apply']>();

  const props: FiltersViewProps = {
    state: { ...baseState, ...overrides.state },
    channels: overrides.channels ?? ['Amazon', 'Ebay'],
    hasChanges: overrides.hasChanges ?? false,
    apply,
    dispatch,
  };

  render(<FiltersView {...props} />);

  return { dispatch, apply };
};

describe('FiltersView', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders basic inputs and apply button', () => {
    setup();
    expect(screen.getByRole('button', { name: /apply/i })).toBeInTheDocument();
  });

  it('dispatches SET_CHANNEL_NAME on name input change', () => {
    const { dispatch } = setup();

    const nameInput = screen.getAllByDisplayValue('')[0];

    fireEvent.change(nameInput, {
      target: { value: 'TestName123456789012345' },
    });

    expect(dispatch).toHaveBeenCalledWith({
      type: 'SET_CHANNEL_NAME',
      value: 'TestName123456789012',
    });
  });

  it('shows clear button when channelName is set and clears on click', () => {
    const { dispatch } = setup({
      state: { channelName: 'Test' },
    });

    fireEvent.click(screen.getByLabelText('Clear name filter'));

    expect(dispatch).toHaveBeenCalledWith({
      type: 'CLEAR_CHANNEL_NAME',
    });
  });

  it('dispatches date changes correctly', () => {
    const { dispatch } = setup();

    const dateInputs = screen.getAllByPlaceholderText('dd/mm/yyyy');

    fireEvent.change(dateInputs[0], {
      target: { value: '01/01/2024' },
    });

    fireEvent.change(dateInputs[1], {
      target: { value: '31/01/2024' },
    });

    expect(dispatch).toHaveBeenCalledWith({
      type: 'SET_MIN_DATE',
      value: '2024-01-01',
    });

    expect(dispatch).toHaveBeenCalledWith({
      type: 'SET_MAX_DATE',
      value: '2024-01-31',
    });
  });

  it('toggles channel selection', () => {
    const { dispatch } = setup({
      channels: ['Amazon'],
    });

    fireEvent.click(screen.getByText(/amazon/i));

    expect(dispatch).toHaveBeenCalledWith({
      type: 'TOGGLE_CHANNEL',
      value: 'Amazon',
    });
  });

  it('marks active channel with checkmark', () => {
    setup({
      state: { channelNames: ['Amazon'] },
      channels: ['Amazon'],
    });

    expect(screen.getByText('Amazon ✓')).toBeInTheDocument();
  });

  it('disables Apply button when hasChanges is false', () => {
    setup({ hasChanges: false });

    expect(screen.getByText('Apply')).toBeDisabled();
  });

  it('calls apply when Apply button is enabled and clicked', () => {
    const { apply } = setup({ hasChanges: true });

    fireEvent.click(screen.getByText('Apply'));

    expect(apply).toHaveBeenCalledTimes(1);
  });

  it('matches snapshot', () => {
    const { container } = render(
      <FiltersView
        state={{
          channelName: 'Test',
          minDate: '2024-01-01',
          maxDate: '2024-01-31',
          channelNames: ['Amazon'],
        }}
        channels={['Amazon', 'Ebay']}
        hasChanges
        apply={vi.fn()}
        dispatch={vi.fn()}
      />,
    );

    expect(container).toMatchSnapshot();
  });
});
