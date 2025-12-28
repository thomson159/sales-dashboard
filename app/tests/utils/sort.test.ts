import { index } from '~/consts';
import type { Sale } from '~/types/types';
import { isSortKey } from '~/utils/sort.utils';

describe('isSortKey', () => {
  it('should return false if key is index', () => {
    expect(isSortKey(index)).toBe(false);
  });

  it('should return true for other keys', () => {
    const otherKeys: (keyof Sale)[] = ['sum_sales', 'count_orders'];
    otherKeys.forEach((key) => {
      expect(isSortKey(key)).toBe(true);
    });
  });

  it('should narrow type correctly', () => {
    const key: string = 'sum_sales';
    if (isSortKey(key as keyof Sale | typeof index)) {
      const _narrowed: string = key;
      expect(_narrowed).toBe('sum_sales');
    }
  });
});
