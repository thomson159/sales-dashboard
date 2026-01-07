import { type MouseEventHandler, type ReactNode } from 'react';
import type {
  Column,
  ColumnKeyArray,
  ColumnKey,
  Filters,
  RevenuePerChannelItem,
  SalesOverTimeItem,
  Sort,
  SortKey,
  SortOrder,
  StringArray,
  OnChange,
  SaleData,
} from '~/types/types';
import type { UseFiltersStateResult } from './hooks.types';

export type MouseEvent = MouseEventHandler<HTMLButtonElement>;
export type TableBodyProps = SaleData & VisibleColumns;
export type FiltersProps = SaleData & FiltersParams;

export type TableHeaderProps = Readonly<{
  sortKey: SortKey;
  sortOrder: SortOrder | null;
  onChange: (key: SortKey, order?: SortOrder) => void;
}> &
  VisibleColumns;

export type Columns = Readonly<{
  columns: readonly Column[];
}> &
  VisibleColumns;

export type VisibleColumns = Readonly<{
  visibleColumns: ColumnKeyArray;
}>;

export type ToggleColumn = Readonly<{
  onToggle: (key: ColumnKey) => void;
}>;

export type FiltersParams = Readonly<{
  onChange: (value: Filters) => void;
}> &
  Filters;

type OnChangeObject = Readonly<{
  onChange: OnChange;
}>;

export type PaginationProps = Readonly<{
  currentPage: number;
  totalPages: number;
  windowSize?: number;
}> &
  OnChangeObject;

export type NavbarProps = Readonly<{
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
}> &
  OnChangeObject;

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

export type RevenueProps = Readonly<{
  data: RevenuePerChannelItem[];
}>;

export type SalesProps = Readonly<{
  data: SalesOverTimeItem[];
}>;
