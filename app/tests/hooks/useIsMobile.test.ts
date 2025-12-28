import { renderHook } from '@testing-library/react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { useIsMobileCharts } from '~/hooks/useIsMobile';

describe('useIsMobile', () => {
  const originalMatchMedia = window.matchMedia;

  afterEach(() => {
    window.matchMedia = originalMatchMedia;
    vi.restoreAllMocks();
  });

  const mockMatchMedia = (matches: boolean): Window['matchMedia'] =>
    vi.fn().mockImplementation((query: string) => ({
      matches,
      media: query,
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
    }));

  it('returns true if window width <= 768px', () => {
    window.matchMedia = mockMatchMedia(true);
    const { result } = renderHook(() => useIsMobileCharts());
    expect(result.current).toBe(true);
  });

  it('returns false if window width > 768px', () => {
    window.matchMedia = mockMatchMedia(false);
    const { result } = renderHook(() => useIsMobileCharts());
    expect(result.current).toBe(false);
  });
});
