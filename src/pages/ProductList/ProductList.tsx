import { getProductsApi, deleteProductApi } from '@/services/product';
import type { Product } from '@/types';
import AppProductList from '@/components/template/AppProductList/AppProductList';
import useSWR, { type Fetcher } from 'swr';

export default function ProductsRegister() {
  const fetcher: Fetcher<Product[]> = () => getProductsApi();
  const { data: product = [] } = useSWR<Product[]>('getProductsApiDetail', fetcher);

  const postDelete = async (id: number) => {
    console.log("🚀 ~ postDelete ~ id:", id)
    
    try {
      await deleteProductApi(id);
    } catch (error) {
      console.log('🚀 ~ postDelete ~ error:', error);
    }
  };

  return (
    <div className='flex justify-center py-16'>
      <AppProductList products={product} EmitDelete={(event: number) => postDelete(event)}></AppProductList>
    </div>
  );
}
