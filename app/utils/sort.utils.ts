import { index } from '~/consts';
import type { ColumnKey, Sale } from '~/types/types';

export const isSortKey = (key: ColumnKey): key is keyof Sale => key !== index;
