import type { VisibleColumns } from './components.types';
import type { Action, State } from './state.types';
import type { SortKey, SortOrder, ColumnKey, SaleArray, SaleData, Change } from './types';

export type UseSourceResult = Readonly<
  SaleData & {
    loading: boolean;
  }
>;

export type UsePaginationResult = Readonly<{
  pagedData: SaleArray;
  total: number;
  totalPages: number;
}>;

export type UseFiltersStateResult = Readonly<{
  state: State;
  hasChanges: boolean;
  apply: () => void;
  dispatch: React.Dispatch<Action>;
}>;

export type UseTableSortingResult = Readonly<{
  sortKey: SortKey;
  sortOrder: SortOrder;
  sortedData: SaleArray;
  onSort: (key: SortKey) => void;
}>;

export type UseTableColumnsResult = VisibleColumns &
  Readonly<{
    toggleColumn: (key: ColumnKey) => void;
  }>;

export type UsePageSizeResult = Readonly<{
  localPageSize: number;
  handleChange: (e: Change) => void;
  applyPageSize: () => void;
}>;

export type UsePageSizeParams = Readonly<{
  pageSize: number;
  min: number;
  totalItems: number;
  onPageSizeChange: (value: number) => void;
}>;
