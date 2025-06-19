import { getProductsApi, deleteProductApi } from '@/services/product';
import type { Product } from '@/types';
import { AppProductList } from '@/components/template';
import useSWR, { type Fetcher } from 'swr';
import { toast } from 'react-toastify';

export default function ProductsRegister() {
  const fetcher: Fetcher<Product[]> = () => getProductsApi();
  const { data: product = [] } = useSWR<Product[]>('getProductsApiDetail', fetcher);

  const postDelete = async (id: number) => {
    try {
      await deleteProductApi(id);
      toast.success('Deletado com sucesso!');
    } catch (error) {
      toast.success(error);
    }
  };

  return (
    <div className='flex justify-center py-16'>
      <AppProductList
        products={product}
        EmitDelete={(event: number) => postDelete(event)}
      ></AppProductList>
    </div>
  );
}
