import type { SaleArray } from '~/types/types';
import { z } from 'zod';

const SALES_URL = import.meta.env.VITE_SALES_API_URL as string;

const saleJsonSchema = z.object({
  date: z.string(),
  channel_type: z.string(),
  channel_name: z.string(),
  order_status_id: z.number(),
  sum_sales: z.number(),
  count_orders: z.number(),
});

// Omit channel_type from the final Sale type
const saleSchema = saleJsonSchema.omit({
  channel_type: true,
});

export const fetchSales = async (): Promise<SaleArray> => {
  try {
    const response: Response = await fetch(SALES_URL);

    if (!response.ok) {
      console.error(`Fetch error: ${response.status}`);

      return [];
    }

    const rawData: unknown = await response.json();
    const parsed = z.array(saleJsonSchema).safeParse(rawData);

    if (!parsed.success) {
      console.error('Invalid data format from API', parsed.error);

      return [];
    }

    return parsed.data.map(({ ...sale }) => saleSchema.parse(sale));
  } catch (error) {
    console.error('Fetch failed', error);

    return [];
  }
};
