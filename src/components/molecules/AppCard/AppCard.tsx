import { Card, Typography, Button } from '@material-tailwind/react';
import type { Product } from '@/types';
import { Link } from 'react-router';
import { currencyPrice } from '@/utils';
interface Props {
  product: Product;
}

export default function EcommerceCard({ product }: Props) {
  return (
    <Card className='max-w-96'>
      <Card.Header as='img' src={product.images[0]} className='h-96 object-cover' />
      <Card.Body>
        <div className='mb-2 flex items-center justify-between'>
          <Typography type='h6'>{product.title}</Typography>
          <Typography type='p'>{currencyPrice(product.price)}</Typography>
        </div>
        <Typography className='text-foreground line-clamp-3'>{product.description}</Typography>
      </Card.Body>
      <Card.Footer>
        <Button as={Link} to={`product/detail/${product.slug}`} isFullWidth color='secondary'>
          Ver detalhes
        </Button>
      </Card.Footer>
    </Card>
  );
}
