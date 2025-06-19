import useSWR, { type Fetcher } from 'swr';
import AppCards from '@/components/organisms/AppCards/AppCards';
import { getProductsApi } from '@/services/product';
import type { Product } from '@/types';

export default function Products() {
  const fetcher: Fetcher<Product[]> = () => getProductsApi();
  const { data: product = [], isLoading } = useSWR<Product[]>('getProductsApiIndex', fetcher);
  return (
    <>
      <AppCards title='Produtos' products={product} isLoading={isLoading}></AppCards>
    </>
  );
}
