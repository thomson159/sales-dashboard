import { type ReactNode } from 'react';
import type {
  Column,
  ColumnKey,
  Filters,
  RevenuePerChannelItem,
  SaleArray,
  SalesOverTimeItem,
  Sort,
  SortKey,
  SortOrder,
} from '~/types/types';
import type { UseFiltersStateResult } from './hooks.types';

export interface PageSizeFilterProps {
  readonly pageSize: number;
  readonly onChange: (size: number) => void;
  readonly dataLength: number;
  readonly min?: number;
}

export interface PaginationProps {
  readonly currentPage: number;
  readonly totalPages: number;
  readonly onChange: (page: number) => void;
  readonly windowSize?: number;
}

export interface SalesTableProps {
  readonly data: SaleArray;
  readonly visibleColumns: readonly ColumnKey[];
  readonly toggleColumn: (key: ColumnKey) => void;
}

export interface FiltersProps extends Filters {
  readonly onChange: (value: Filters) => void;
  readonly data: SaleArray;
}

export interface SortProps {
  readonly sort?: Sort;
  readonly onChange: (sort?: Sort) => void;
}

export interface SummaryItemProps {
  readonly label: string;
  readonly value: string | number;
}

//

export type ContainerProps = {
  readonly children: ReactNode;
};

export type NavbarProps = {
  readonly expanded: boolean;
  readonly onToggle: () => void;
  readonly children: ReactNode;
  readonly loading?: boolean;
  readonly title?: string;
};

export type FiltersViewProps = UseFiltersStateResult & {
  readonly availableChannels: readonly string[];
};

export type VisibleColumns = {
  readonly visibleColumns: readonly ColumnKey[];
};

export type Columns = VisibleColumns & {
  readonly columns: readonly Column[];
};

export type ColumnSelectorProps = Columns & {
  readonly toggleColumn: (key: ColumnKey) => void;
};

export type TableBodyProps = VisibleColumns & {
  readonly data: SaleArray;
};

export type TableHeaderProps = Columns & {
  readonly sortKey: SortKey | null;
  readonly sortOrder: SortOrder | null;
  readonly onSort: (key: SortKey | null, order?: SortOrder) => void;
};

export type RevenueProps = {
  readonly data: RevenuePerChannelItem[];
};

export type SalesProps = {
  readonly data: SalesOverTimeItem[];
};
