import type { Dispatch } from 'react';
import type { VisibleColumns } from './components.types';
import type { Action, State } from './state.types';
import type { SaleArray, SaleData, Change, ColumnKey } from './types';

export type UseTableColumnsResult = Readonly<{
  toggleColumn: (key: ColumnKey) => void;
}> &
  VisibleColumns;

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

export type UseFiltersStateResult = Readonly<{
  state: State;
  hasChanges: boolean;
  dispatch: Dispatch<Action>;
}> &
  Apply;
