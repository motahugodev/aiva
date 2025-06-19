import { useMemo, useEffect } from 'react';
import useSWR, { type Fetcher, useSWRConfig } from 'swr';
import { AppCards } from '@/components/organisms';
import { getCategoriesSlugApi } from '@/services/categories';
import type { Product } from '@/types';
import { useParams } from 'react-router';

type RouterParams = {
  slug: string;
};

export default function Category() {
  const { slug } = useParams<RouterParams>();
  const fetcher: Fetcher<Product[], string> = () => getCategoriesSlugApi(slug);
  const { mutate } = useSWRConfig();

  const { data: product = [], isLoading } = useSWR<Product[]>('getCategoriesSlugApi', fetcher, {
    suspense: false,
  });

  useEffect(() => {
    mutate('getCategoriesSlugApi'); // Trigger revalidation with the new key
  }, [slug, mutate]);

  const title = useMemo(() => {
    if (product.length > 0) {
      return product[0].category.name;
    } else {
      return '';
    }
  }, [product]);

  return (
    <>
      <AppCards title={`Categoria ${title}`} products={product} isLoading={isLoading}></AppCards>
    </>
  );
}
