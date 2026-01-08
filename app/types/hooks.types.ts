import type { Dispatch } from 'react';
import type { ToggleColumn, VisibleColumns } from './components.types';
import type { Action, State } from './state.types';
import type { SortKey, SortOrder, SaleArray, SaleData, Change } from './types';

export type UseTableColumnsResult = VisibleColumns & ToggleColumn;

export type Apply = Readonly<{
  apply: () => void;
}>;

export type UseSourceResult = Readonly<
  SaleData & {
    loading: boolean;
  }
>;

export type UsePaginationResult = Readonly<{
  pagedData: SaleArray;
  dataLength: number;
  totalPages: number;
}>;

export type UsePageSizeResult = Readonly<{
  localPageSize: number;
  handleChange: (e: Change) => void;
}> &
  Apply;

export type UseTableSortingResult = Readonly<{
  key: SortKey;
  order: SortOrder;
  sortedData: SaleArray;
  onChange: (key: SortKey) => void;
}>;

export type UseFiltersStateResult = Readonly<{
  state: State;
  hasChanges: boolean;
  dispatch: Dispatch<Action>;
}> &
  Apply;
