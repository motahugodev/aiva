import { Card, Typography, Button } from '@material-tailwind/react';
import { Mail, Eye } from 'iconoir-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'react-router';
import TextField from '@/components/molecules/AppTextField/AppTextField';

export default function AppLogin({ EmitRegister }) {
  const cardFormSchema = z.object({
    email: z.string().email({ message: 'Email Inválido.' }),
    password: z.string().min(6, { message: 'Minimo 6 digitos.' }),
  });

  type CardFormInputs = z.infer<typeof cardFormSchema>;

  const cardForm = useForm<CardFormInputs>({
    resolver: zodResolver(cardFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const emailError = cardForm.formState.errors.email?.message;
  const passwordError = cardForm.formState.errors.password?.message;

  function cardFormOnSubmit(data: CardFormInputs) {
    EmitRegister(data);
  }

  return (
    <Card className='max-w-xs'>
      <Card.Header as={Card} color='primary' className='grid h-24 place-items-center shadow-none'>
        <Typography as='span' type='h4' className='text-primary-foreground'>
          Login
        </Typography>
      </Card.Header>
      <Card.Body as='form' onSubmit={cardForm.handleSubmit(cardFormOnSubmit)}>
        <div className='mb-4 mt-2 space-y-1.5'>
          <TextField
            type='email'
            label='Email'
            error={emailError}
            icon={Mail}
            placeholder='someone@example.com'
            {...cardForm.register('email')}
          ></TextField>
        </div>
        <div className='mb-4 space-y-1.5'>
          <TextField
            type='passsword'
            label='Senha'
            error={passwordError}
            icon={Eye}
            placeholder='*************'
            {...cardForm.register('password')}
          ></TextField>
        </div>
        <Button isFullWidth type='submit'>
          Entrar
        </Button>
      </Card.Body>
      <Card.Footer className='text-center'>
        <Typography
          type='small'
          className='my-1 flex items-center justify-center gap-1 text-foreground'
        >
          Não tem uma conta?
          <Link to='auth/register' type='small' color='primary' className='font-bold'>
            Registrar
          </Link>
        </Typography>
      </Card.Footer>
    </Card>
  );
}
