import { renderHook, act } from '@testing-library/react';
import { usePageSize } from '~/hooks/usePageSize';
import type { Change } from '~/types/types';
import * as filtersUtils from '~/utils/filters.utils';

describe('usePageSize', () => {
  const onChange = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should initialize with pageSize', () => {
    const { result } = renderHook(() =>
      usePageSize({ pageSize: 10, min: 1, dataLength: 100, onChange }),
    );
    expect(result.current.localPageSize).toBe(10);
  });

  it('should update localPageSize when pageSize prop changes', () => {
    const { result, rerender } = renderHook(
      ({ pageSize }) => usePageSize({ pageSize, min: 1, dataLength: 100, onChange }),
      {
        initialProps: { pageSize: 5 },
      },
    );
    expect(result.current.localPageSize).toBe(5);
    rerender({ pageSize: 20 });
    expect(result.current.localPageSize).toBe(20);
  });

  it('should update localPageSize on handleChange with valid input', () => {
    vi.spyOn(filtersUtils, 'sanitizePageSizeInput').mockReturnValue(15);
    const { result } = renderHook(() =>
      usePageSize({ pageSize: 10, min: 1, dataLength: 100, onChange }),
    );

    act(() => {
      result.current.handleChange({ target: { value: '15' } } as Change);
    });

    expect(result.current.localPageSize).toBe(15);
  });

  it('should not update localPageSize on handleChange if input is invalid', () => {
    vi.spyOn(filtersUtils, 'sanitizePageSizeInput').mockReturnValue(null);
    const { result } = renderHook(() =>
      usePageSize({ pageSize: 10, min: 1, dataLength: 100, onChange }),
    );

    act(() => {
      result.current.handleChange({ target: { value: 'abc' } } as Change);
    });

    expect(result.current.localPageSize).toBe(10);
  });

  it('should call onChange with validated value when applyPageSize changes the size', () => {
    vi.spyOn(filtersUtils, 'validatePageSize').mockReturnValue(20);
    const { result } = renderHook(() =>
      usePageSize({ pageSize: 10, min: 1, dataLength: 100, onChange }),
    );

    act(() => {
      result.current.apply();
    });

    expect(filtersUtils.validatePageSize).toHaveBeenCalledWith(10, 1, 100);
    expect(result.current.localPageSize).toBe(20);
    expect(onChange).toHaveBeenCalledWith(20);
  });

  it('should not call onChange if validated value equals current pageSize', () => {
    vi.spyOn(filtersUtils, 'validatePageSize').mockReturnValue(10);
    const { result } = renderHook(() =>
      usePageSize({ pageSize: 10, min: 1, dataLength: 100, onChange }),
    );

    act(() => {
      result.current.apply();
    });

    expect(onChange).not.toHaveBeenCalled();
    expect(result.current.localPageSize).toBe(10);
  });
});
