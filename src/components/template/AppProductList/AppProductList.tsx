import { EditPencil, UserPlus, Search, ArrowSeparateVertical, Trash } from 'iconoir-react';
import { Input, Typography, Button, Avatar, IconButton, Tooltip } from '@material-tailwind/react';
import { Link } from 'react-router';

import { currencyPrice } from '@/utils';
import type { Product } from '@/types';
import { format } from 'date-fns';

interface Props {
  EmitDelete: (value: number) => void;
  products: Product[];
}

const TABLE_HEAD = ['Titulo', 'Preço', 'Descrição', 'Data de criação', ''];

export default function AppProductList({ EmitDelete, products }: Props) {
  return (
    <div className='w-full'>
      <div className='mb-8 flex items-center justify-between gap-8'>
        <div>
          <Typography type='h6'>Todos Produtos</Typography>
        </div>
        <div className='flex shrink-0 flex-col gap-2 sm:flex-row'>
          <Button as={Link} to='/product/register' className='flex items-center gap-3' size='sm'>
            <UserPlus strokeWidth={2} className='h-4 w-4' /> Adicionar Produto
          </Button>
        </div>
      </div>
      <div className='flex flex-col items-center justify-between gap-4 md:flex-row'>
        <div className='w-full md:w-72'>
          <Input placeholder='Search'>
            <Input.Icon placement='end'>
              <Search className='h-5 w-5' />
            </Input.Icon>
          </Input>
        </div>
      </div>

      <div className='mt-4 w-full overflow-hidden rounded-lg border border-surface'>
        <table className='w-full'>
          <thead className='border-b border-surface bg-surface-light text-sm font-medium text-foreground dark:bg-surface-dark'>
            <tr>
              {TABLE_HEAD.map((head, index) => (
                <th key={head} className='cursor-pointer px-2.5 py-2 text-start font-medium'>
                  <Typography
                    type='small'
                    className='flex items-center justify-between gap-2 opacity-70'
                  >
                    {head}{' '}
                    {index !== TABLE_HEAD.length - 1 && (
                      <ArrowSeparateVertical strokeWidth={2} className='h-4 w-4' />
                    )}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className='group text-sm text-black dark:text-white'>
            {products.map(({ images, title, price, description, creationAt, id }, index) => {
              return (
                <tr key={title} className='border-b border-surface last:border-0'>
                  <td className='p-3'>
                    <div className='flex items-center gap-3'>
                      <Avatar src={images[0]} alt={title} size='sm' />
                      <div className='flex flex-col'>
                        <Typography type='small'>{title}</Typography>
                      </div>
                    </div>
                  </td>
                  <td className='p-3'>
                    <div className='flex flex-col'>
                      <Typography type='small'>{currencyPrice(price)}</Typography>
                    </div>
                  </td>
                  <td className='p-3'>
                    <div className='flex flex-col'>
                      <Typography type='small'>{description}</Typography>
                    </div>
                  </td>
                  <td className='p-3'>
                    <Typography type='small'>
                      {format(new Date(creationAt), 'dd/MM/yyyy')}
                    </Typography>
                  </td>
                  <td className='p-3'>
                    <Tooltip>
                      <Link to={`/product/edit/${id}`}>
                        <Tooltip.Trigger as={IconButton} variant='ghost' color='secondary'>
                          <EditPencil className='h-4 w-4 text-black dark:text-white' />
                        </Tooltip.Trigger>
                      </Link>
                      <Tooltip.Content>
                        Editar Produto
                        <Tooltip.Arrow />
                      </Tooltip.Content>
                    </Tooltip>
                    <Tooltip>
                      <Tooltip.Trigger
                        onClick={() => EmitDelete(id)}
                        as={IconButton}
                        variant='ghost'
                        color='danger'
                      >
                        <Trash className='h-4 w-4 text-red-500 dark:text-white' />
                      </Tooltip.Trigger>
                      <Tooltip.Content>
                        Deletar Produto
                        <Tooltip.Arrow />
                      </Tooltip.Content>
                    </Tooltip>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
