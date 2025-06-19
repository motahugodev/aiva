import useSWR, { type Fetcher } from 'swr';
import { useParams } from 'react-router';
import { getProductsSlugApi } from '@/services/product';
import { type Product } from '@/types';
import { AppProductDetail } from '@/components/template';
import { Spinner } from '@material-tailwind/react';

type RouterParams = {
  slug: string;
};

export default function ProductDetail() {
  const { slug } = useParams<RouterParams>();
  const fetcher: Fetcher<Product, string> = () => getProductsSlugApi(slug);
  const { data: product, error, isLoading } = useSWR<Product>('getProductsSlugApi', fetcher);

  if (isLoading) return <Spinner className='h-16 w-16' />;
  if (error) return <div>failed to load</div>;
  return <AppProductDetail product={product}></AppProductDetail>;
}
