import * as React from 'react';
import { Input, Typography, type InputProps } from '@material-tailwind/react';

type TextFieldProps = InputProps & {
  label: string;
  error?: string;
  icon?: React.ElementType;
};

const TextField = React.forwardRef<React.ElementRef<typeof Input>, TextFieldProps>(
  ({ label, error, icon: Icon, ...props }, ref) => {
    const inputId = React.useId();

    return (
      <Typography
        as='label'
        htmlFor={inputId}
        color='default'
        className='mb-6 block w-full space-y-1.5'
      >
        <span className='text-sm font-semibold'>{label}</span>
        <Input
          ref={ref}
          id={inputId}
          color={error ? 'error' : 'primary'}
          isError={Boolean(error)}
          {...props}
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
