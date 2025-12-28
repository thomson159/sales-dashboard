import { renderHook, act } from '@testing-library/react';
import type { ChangeEvent } from 'react';
import { usePageSize } from '~/hooks/usePageSize';
import * as filtersUtils from '~/utils/filters.utils';

describe('usePageSize', () => {
  const onPageSizeChange = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should initialize with pageSize', () => {
    const { result } = renderHook(() =>
      usePageSize({ pageSize: 10, min: 1, totalItems: 100, onPageSizeChange }),
    );
    expect(result.current.localPageSize).toBe(10);
  });

  it('should update localPageSize when pageSize prop changes', () => {
    const { result, rerender } = renderHook(
      ({ pageSize }) => usePageSize({ pageSize, min: 1, totalItems: 100, onPageSizeChange }),
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
      usePageSize({ pageSize: 10, min: 1, totalItems: 100, onPageSizeChange }),
    );

    act(() => {
      result.current.handleChange({ target: { value: '15' } } as ChangeEvent<HTMLInputElement>);
    });

    expect(result.current.localPageSize).toBe(15);
  });

  it('should not update localPageSize on handleChange if input is invalid', () => {
    vi.spyOn(filtersUtils, 'sanitizePageSizeInput').mockReturnValue(null);
    const { result } = renderHook(() =>
      usePageSize({ pageSize: 10, min: 1, totalItems: 100, onPageSizeChange }),
    );

    act(() => {
      result.current.handleChange({ target: { value: 'abc' } } as ChangeEvent<HTMLInputElement>);
    });

    expect(result.current.localPageSize).toBe(10);
  });

  it('should call onPageSizeChange with validated value when applyPageSize changes the size', () => {
    vi.spyOn(filtersUtils, 'validatePageSize').mockReturnValue(20);
    const { result } = renderHook(() =>
      usePageSize({ pageSize: 10, min: 1, totalItems: 100, onPageSizeChange }),
    );

    act(() => {
      result.current.applyPageSize();
    });

    expect(filtersUtils.validatePageSize).toHaveBeenCalledWith(10, 1, 100);
    expect(result.current.localPageSize).toBe(20);
    expect(onPageSizeChange).toHaveBeenCalledWith(20);
  });

  it('should not call onPageSizeChange if validated value equals current pageSize', () => {
    vi.spyOn(filtersUtils, 'validatePageSize').mockReturnValue(10);
    const { result } = renderHook(() =>
      usePageSize({ pageSize: 10, min: 1, totalItems: 100, onPageSizeChange }),
    );

    act(() => {
      result.current.applyPageSize();
    });

    expect(onPageSizeChange).not.toHaveBeenCalled();
    expect(result.current.localPageSize).toBe(10);
  });
});
