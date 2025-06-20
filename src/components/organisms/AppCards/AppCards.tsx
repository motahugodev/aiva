import { AppCard } from '@/components/molecules/';
import { AppSkeletonCards } from '@/components/organisms';
import type { Product } from '@/types';
import { Typography } from '@material-tailwind/react';

interface Props {
  products: Product[];
  title?: string;
  isLoading?: boolean;
}

export default function EcommerceCards({ products = [], title = '', isLoading }: Props) {
  return (
    <section>
      <Typography as='div' type='h2' className='py-12'>
        {title}
      </Typography>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6'>
        {!isLoading ? (
          products.map((product) => <AppCard product={product} key={product.id}></AppCard>)
        ) : (
          <AppSkeletonCards qtd={12}></AppSkeletonCards>
        )}
      </div>
    </section>
  );
}
