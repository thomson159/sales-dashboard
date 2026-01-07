import { type ReactNode } from 'react';
import type {
  Column,
  ColumnKeyArray,
  ColumnKey,
  Filters,
  RevenuePerChannelItem,
  SaleArray,
  SalesOverTimeItem,
  Sort,
  SortKey,
  SortOrder,
  StringArray,
  OnChange,
} from '~/types/types';
import type { UseFiltersStateResult } from './hooks.types';

export type SalesTableProps = Readonly<{
  data: SaleArray;
}> &
  ToggleColumn &
  VisibleColumns;

export type FiltersProps = Readonly<{
  onChange: (value: Filters) => void;
  data: SaleArray;
}> &
  Filters;

export type Columns = Readonly<{
  columns: readonly Column[];
}> &
  VisibleColumns;

export type TableBodyProps = Readonly<{
  data: SaleArray;
}> &
  VisibleColumns;

export type TableHeaderProps = Readonly<{
  sortKey: SortKey;
  sortOrder: SortOrder | null;
  onSort: (key: SortKey, order?: SortOrder) => void;
}> &
  VisibleColumns;

//

export type ToggleColumn = Readonly<{
  toggleColumn: (key: ColumnKey) => void;
}>;

export type ColumnSelectorProps = VisibleColumns & ToggleColumn;

//

type OnChangeObject = Readonly<{
  onChange: OnChange;
}>;

export type PaginationProps = Readonly<{
  currentPage: number;
  totalPages: number;
  windowSize?: number;
}> & OnChangeObject;

export type NavbarProps = Readonly<{
  expanded: boolean;
  onToggle: () => void;
  loading?: boolean;
  title?: string;
}> &
  Children;

export type SortProps = Readonly<{
  sort?: Sort;
  onChange: (sort?: Sort) => void;
}>;

export type PageSizeFilterProps = Readonly<{
  pageSize: number;
  dataLength: number;
  min?: number;
}> & OnChangeObject;

export type SummaryItemProps = Readonly<{
  label: string;
  value: string | number;
}>;

export type FiltersViewProps = Readonly<{
  channels: StringArray;
}> &
  UseFiltersStateResult;

export type Children = Readonly<{
  children: ReactNode;
}>;

export type VisibleColumns = Readonly<{
  visibleColumns: ColumnKeyArray;
}>;

export type RevenueProps = Readonly<{
  data: RevenuePerChannelItem[];
}>;

export type SalesProps = Readonly<{
  data: SalesOverTimeItem[];
}>;
