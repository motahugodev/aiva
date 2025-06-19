import { httpGet } from '@/plugins/http';
import type { Category, Product } from '@/types';

type GetCategoriesResponse = Category[];

export const getCategoriesApi = async (): Promise<GetCategoriesResponse> => {
  try {
    const data = await httpGet({ url: 'categories?limit=30' });
    return data as GetCategoriesResponse;
  } catch {
    throw new Error('Err');
  }
};

export const getCategoriesSlugApi = async (slug?: string): Promise<Product[]> => {
  try {
    const data = await httpGet({ url: `categories/${slug}/products` });
    return data as Promise<Product[]>;
  } catch {
    throw new Error('Err');
  }
};
