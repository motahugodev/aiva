import * as React from 'react';
import { Input, Typography, type InputProps } from '@material-tailwind/react';

type TextFieldProps = InputProps & {
  label: string;
  error?: string;
  icon?: React.ElementType;
};

const TextField = React.forwardRef<typeof Input.Field, TextFieldProps>(
  ({ label, error, icon: Icon, ...props }, ref) => {
    const id = React.useId();

    return (
      <Typography as='label' htmlFor={id} color='default' className='mb-6 block w-full space-y-1.5'>
        <span className='text-sm font-semibold'>{label}</span>
        <Input
          ref={ref}
          {...props}
          id={id}
          isError={Boolean(error)}
          color={error ? 'error' : 'primary'}
        >
          {Icon && (
            <Input.Icon>
              <Icon className='h-full w-full' />
            </Input.Icon>
          )}
        </Input>
        {error && (
          <Typography type='small' color='error'>
            {error}
          </Typography>
        )}
      </Typography>
    );
  },
);

export default TextField;
