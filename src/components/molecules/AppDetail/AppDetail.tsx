import { type ReactNode } from 'react';
import { Typography, Button } from '@material-tailwind/react';
import { currencyPrice } from '@/utils';
import type { Product } from '@/types';

interface Props {
  product: Product;
  children?: ReactNode;
}

export default function AppDetail({ product, children }: Props) {
  return (
    <div className='mx-auto max-w-3xl px-4 pt-10 pb-16 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto_auto_1fr] lg:gap-x-8 lg:px-0 lg:pt-16 lg:pb-24'>
      <div className='lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8'>
        <Typography type='h3' className='font-bold tracking-tight'>
          {product.title}
        </Typography>
      </div>

      {/* Options */}
      <div className='mt-4 lg:row-span-3 lg:mt-0'>
        <Typography type='h2' className='sr-only'>
          Informação do produto
        </Typography>
        <Typography type='h5' className='tracking-tight'>
          {currencyPrice(product.price)}
        </Typography>

        <form className='mt-10'>
          <Button isFullWidth size='lg' className='mt-6'>
            Adicionar ao Carinho
          </Button>
        </form>
      </div>
      <div className='py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pt-6 lg:pr-8 lg:pb-16'>
        <div>{children}</div>
        <div className='mt-4'>
          <Typography className='sr-only'>Descrição</Typography>
          <div className='space-y-6'>
            <Typography className='text-base'>{product.description}</Typography>
          </div>
        </div>
      </div>
    </div>
  );
}
