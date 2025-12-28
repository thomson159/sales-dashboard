import { renderHook } from '@testing-library/react';
import { act } from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { COLUMNS, STORAGE_KEY } from '~/consts';
import { useTableColumns } from '~/hooks/Table/useTableColumns';
import type { ColumnKey } from '~/types/types';

describe('useTableColumns', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  it('initializes with all columns if localStorage is empty', () => {
    const { result } = renderHook(() => useTableColumns());
    const allKeys = COLUMNS.map((c) => c.key);
    expect(result.current.visibleColumns).toEqual(allKeys);
  });

  it('initializes with columns from localStorage', () => {
    const storedKeys = [COLUMNS[0].key, COLUMNS[1].key];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(storedKeys));
    const { result } = renderHook(() => useTableColumns());
    expect(result.current.visibleColumns).toEqual(storedKeys);
  });

  it('handles invalid JSON in localStorage', () => {
    localStorage.setItem(STORAGE_KEY, 'invalid-json');
    const { result } = renderHook(() => useTableColumns());
    const allKeys = COLUMNS.map((c) => c.key);
    expect(result.current.visibleColumns).toEqual(allKeys);
  });

  it('toggles a column off and on', () => {
    const { result } = renderHook(() => useTableColumns());
    const key = COLUMNS[0].key;

    act(() => result.current.toggleColumn(key));
    expect(result.current.visibleColumns).not.toContain(key);

    act(() => result.current.toggleColumn(key));
    expect(result.current.visibleColumns).toContain(key);
  });

  it('adds a column if not present', () => {
    const { result } = renderHook(() => useTableColumns());
    const key = 'newColumn' as ColumnKey;
    act(() => result.current.toggleColumn(key));
    expect(result.current.visibleColumns).toContain(key);
  });

  it('removes a column if present', () => {
    const initialKeys = [COLUMNS[0].key];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialKeys));
    const { result } = renderHook(() => useTableColumns());
    const key = COLUMNS[0].key;
    act(() => result.current.toggleColumn(key));
    expect(result.current.visibleColumns).not.toContain(key);
  });

  it('persists changes to localStorage', () => {
    const { result } = renderHook(() => useTableColumns());
    const key = COLUMNS[0].key;
    act(() => result.current.toggleColumn(key));
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    expect(stored).toEqual(result.current.visibleColumns);
  });

  it('updates localStorage on multiple toggles', () => {
    const { result } = renderHook(() => useTableColumns());
    const keys = [COLUMNS[0].key, COLUMNS[1].key];
    keys.forEach((key) => act(() => result.current.toggleColumn(key)));
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    expect(stored).toEqual(result.current.visibleColumns);
  });

  it('handles empty COLUMNS gracefully', () => {
    vi.mocked(COLUMNS, true).splice(0, COLUMNS.length);
    const { result } = renderHook(() => useTableColumns());
    expect(result.current.visibleColumns).toEqual([]);
  });
});
