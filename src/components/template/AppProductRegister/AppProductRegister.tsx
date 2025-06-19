import { useState } from 'react';
import { Card, Typography, Button } from '@material-tailwind/react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'react-router';
import TextField from '@/components/molecules/AppTextField/AppTextField';
import SelectField from '@/components/molecules/AppSelect/AppSelect';
import AppUpload from '@/components/molecules/AppUpload/AppUpload';
import { postUpload } from '@/services/product';

import { useMemo } from 'react';
import type { Category, Form } from '@/types';

interface Props {
  EmitRegister: (value: Form) => void;
  categories: Category[];
}

export default function AppLogin({ EmitRegister, categories }: Props) {
  const [images, setImages] = useState<string[]>();

  const cardFormSchema = z.object({
    title: z.string().min(3, { message: 'Titulo Obrigatorio.' }),
    description: z.string().min(6, { message: 'Minimo 6 digitos.' }),
    price: z
      .number()
      .positive({ message: 'Campo obrigatoria.' })
      .transform((val: number) => {
        const normalized = val.toString().replace(/\./g, '').replace(',', '.');
        return parseFloat(normalized);
      }),
    categoryId: z.number({ message: 'Campo obrigatoria.' }),
  });

  const cardForm = useForm<CardFormInputs>({
    resolver: zodResolver(cardFormSchema),
    defaultValues: {
      title: undefined,
      description: undefined,
      price: undefined,
      categoryId: 1,
    },
  });

  type CardFormInputs = z.infer<typeof cardFormSchema>;

  const titleError = cardForm.formState.errors.title?.message;
  const descriptionError = cardForm.formState.errors.description?.message;
  const priceError = cardForm.formState.errors.price?.message;
  const categoryError = cardForm.formState.errors.categoryId?.message;

  const options = useMemo(() => {
    return categories.map((category) => {
      return { label: category.name, value: category.id };
    });
  }, [categories]);

  function cardFormOnSubmit(data: CardFormInputs) {
    const body: Form = {
      ...data,
      images: images,
    };
    EmitRegister(body);
  }

  const setImage = (images?: string[]) => {
    setImages(images);
    registerImage(images)
  };

  const registerImage = async () => {
    await postUpload(images);
  };

  return (
    <Card className='max-w-xl'>
      <Card.Header as={Card} className='grid h-24 place-items-center shadow-none'>
        <Typography as='span' type='h4' className='text-primary'>
          Cadastro de Produto
        </Typography>
      </Card.Header>
      <Card.Body as='form' onSubmit={cardForm.handleSubmit(cardFormOnSubmit)}>
        <div className='mb-4 mt-2 space-y-1.5'>
          <TextField
            type='text'
            label='Titulo'
            error={titleError}
            {...cardForm.register('title')}
          ></TextField>
        </div>
        <div className='mb-4 mt-2 space-y-1.5'>
          <TextField
            label='Preço'
            error={priceError}
            placeholder='R$ 00,00'
            inputMode='numeric'
            {...cardForm.register('price', { valueAsNumber: true })}
          ></TextField>
        </div>
        <div className='mb-4 mt-2 space-y-1.5'>
          <TextField
            type='text'
            label='Descrição'
            error={descriptionError}
            {...cardForm.register('description')}
          ></TextField>
        </div>
        <div className='mb-4 mt-2 space-y-1.5'>
          <SelectField
            label='Categoria'
            error={categoryError}
            options={options}
            {...cardForm.register('categoryId')}
          ></SelectField>
        </div>
        <div className='mb-4 mt-2 space-y-1.5'>
          <AppUpload EmitImage={(event) => setImage(event)} images={images}></AppUpload>
        </div>
        <div className='space-x-4'>
          <Button color='secondary' as={Link} to='/product/list'>
            Voltar
          </Button>
          <Button color='success' type='submit'>
            Salvar
          </Button>
        </div>
      </Card.Body>
      <Card.Footer className='text-center'></Card.Footer>
    </Card>
  );
}
