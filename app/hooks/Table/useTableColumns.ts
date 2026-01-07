import { useCallback, useEffect, useState } from 'react';
import type { ColumnKey } from '~/types/types';
import { COLUMNS, STORAGE_KEY } from '~/consts';
import type { UseTableColumnsResult } from '~/types/hooks.types';

export const useTableColumns = (): UseTableColumnsResult => {
  const [visibleColumns, setVisibleColumns] = useState<ColumnKey[]>(() => {
    try {
      const stored: string | null = localStorage.getItem(STORAGE_KEY);

      return stored ? (JSON.parse(stored) as ColumnKey[]) : COLUMNS.map((c) => c.key);
    } catch {
      return COLUMNS.map((c) => c.key);
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(visibleColumns));
  }, [visibleColumns]);

  const toggleColumn = useCallback((key: ColumnKey) => {
    setVisibleColumns((prev: ColumnKey[]) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key],
    );
  }, []);

  return {
    visibleColumns,
    toggleColumn,
  };
};
