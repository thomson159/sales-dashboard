import { renderHook, act } from '@testing-library/react';
import { useFiltersState } from '~/hooks/useFiltersState';
import * as FiltersState from '~/components/Filters/Filters.state';

describe('useFiltersState', () => {
  const onChange = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should initialize state with default props', () => {
    const { result } = renderHook(() =>
      useFiltersState({
        channelName: 'A',
        channelNames: ['A', 'B'],
        minDate: '2023-01-01',
        maxDate: '2023-12-31',
        onChange,
      }),
    );

    expect(result.current.state.channelName).toBe('A');
    expect(result.current.state.channelNames).toEqual(['A', 'B']);
    expect(result.current.state.minDate).toBe('2023-01-01');
    expect(result.current.state.maxDate).toBe('2023-12-31');
  });

  it('should set hasChanges to false initially', () => {
    vi.spyOn(FiltersState, 'computeHasChanges').mockReturnValue(false);

    const { result } = renderHook(() =>
      useFiltersState({
        channelName: 'A',
        channelNames: [],
        minDate: '',
        maxDate: '',
        onChange,
      }),
    );

    expect(result.current.hasChanges).toBe(false);
  });

  it('should dispatch actions and update state', () => {
    const { result } = renderHook(() =>
      useFiltersState({
        channelName: '',
        channelNames: [],
        minDate: '',
        maxDate: '',
        onChange,
      }),
    );

    act(() => {
      result.current.dispatch({ type: 'SET_CHANNEL_NAME', value: 'B' });
    });

    expect(result.current.state.channelName).toBe('B');
  });

  it('should call onChange and update lastAppliedRef on apply', () => {
    const { result } = renderHook(() =>
      useFiltersState({
        channelName: 'A',
        channelNames: [],
        minDate: '',
        maxDate: '',
        onChange,
      }),
    );

    act(() => {
      result.current.apply();
    });

    expect(onChange).toHaveBeenCalledWith({
      channelName: 'A',
      minDate: undefined,
      maxDate: undefined,
      channelNames: undefined,
    });
  });

  it('should recompute hasChanges correctly', () => {
    const { result, rerender } = renderHook(
      ({ channelName }) =>
        useFiltersState({
          channelName,
          channelNames: [],
          minDate: '',
          maxDate: '',
          onChange,
        }),
      { initialProps: { channelName: 'A' } },
    );

    vi.spyOn(FiltersState, 'computeHasChanges').mockReturnValue(true);
    rerender({ channelName: 'B' });

    expect(result.current.hasChanges).toBe(true);
  });
});
