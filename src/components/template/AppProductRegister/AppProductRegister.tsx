import { useState, useMemo } from 'react';
import { Card, Typography, Button } from '@material-tailwind/react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'react-router';
import { TextField, SelectField, AppUpload } from '@/components/molecules';

import type { Category, Form, Product } from '@/types';

interface Props {
  EmitRegister: (value: Form) => void;
  categories: Category[];
  product?: Product;
  isEdit: boolean;
}

export default function AppProductRegister({ EmitRegister, categories, product, isEdit }: Props) {
  const [images, setImages] = useState<string[]>();
  const [categoryId, setCategoryId] = useState(product?.category.id);

  const cardFormSchema = z.object({
    title: z.string().min(3),
    description: z.string().min(6),
    price: z
      .number()
      .positive()
      .transform((val: number) => {
        const normalized = val.toString().replace(/\./g, '').replace(',', '.');
        return parseFloat(normalized);
      }),
    categoryId: z.number(),
  });

  const cardForm = useForm<CardFormInputs>({
    resolver: zodResolver(cardFormSchema),
    defaultValues: {
      title: product?.title,
      description: product?.description,
      price: product?.price,
      categoryId: product?.category.id,
    },
    mode: 'onChange',
  });

  type CardFormInputs = z.infer<typeof cardFormSchema>;

  const titleError = cardForm.formState.errors.title?.message;
  const descriptionError = cardForm.formState.errors.description?.message;
  const priceError = cardForm.formState.errors.price?.message;
  const categoryError = cardForm.formState.errors.categoryId?.message;

  const options = useMemo(() => {
    return categories.map((category) => {
      return { label: category.name, value: category.id.toString() };
    });
  }, [categories]);

  function cardFormOnSubmit(data: CardFormInputs) {
    const body: Form = {
      ...data,
      images: [
        'https://torratorra.vtexassets.com/arquivos/ids/2112327/28212001066136.jpg?v=638745770039470000',
      ],
    };
    console.log('🚀 ~ cardFormOnSubmit ~ body:', body);

    EmitRegister(body);
  }

  const uploadImage = (list?: string[]) => {
    console.log('🚀 ~ uploadImage ~ list:', list);

    // setImages(list);
    // registerImage(list);
  };

  return (
    <Card className='max-w-xl'>
      <Card.Header as={Card} className='grid h-24 place-items-center shadow-none'>
        <Typography as='span' type='h4' className='text-primary'>
          {!isEdit ? 'Cadastro de' : 'Editar'} Produto
        </Typography>
      </Card.Header>
      <Card.Body as='form' onSubmit={cardForm.handleSubmit(cardFormOnSubmit)}>
        <div className='mb-4 mt-2 space-y-1.5'>
          <TextField
            type='text'
            label='Titulo'
            error={titleError}
            defaultValue={product?.title}
            {...cardForm.register('title')}
          ></TextField>
        </div>
        <div className='mb-4 mt-2 space-y-1.5'>
          <TextField
            label='Preço'
            error={priceError}
            placeholder='R$ 00,00'
            inputMode='numeric'
            defaultValue={product?.price}
            {...cardForm.register('price', { valueAsNumber: true })}
          ></TextField>
        </div>
        <div className='mb-4 mt-2 space-y-1.5'>
          <TextField
            type='text'
            label='Descrição'
            defaultValue={product?.description}
            error={descriptionError}
            {...cardForm.register('description')}
          ></TextField>
        </div>
        <div className='mb-4 mt-2 space-y-1.5'>
          <SelectField
            type='text'
            label='Categoria'
            defaultValue={product?.category.id}
            error={categoryError}
            options={options}
            control={cardForm.control}
            {...cardForm.register('categoryId')}
          ></SelectField>
        </div>
        <div className='mb-4 mt-2 space-y-1.5'>
          <AppUpload EmitImage={(event) => uploadImage(event)} images={images}></AppUpload>
        </div>
        <div className='space-x-4'>
          <Button color='secondary' as={Link} to='/product/list'>
            Voltar
          </Button>
          <Button color='success' type='submit'>
            {isEdit ? 'Editar' : 'Salvar'}
          </Button>
        </div>
      </Card.Body>
      <Card.Footer className='text-center'></Card.Footer>
    </Card>
  );
}
