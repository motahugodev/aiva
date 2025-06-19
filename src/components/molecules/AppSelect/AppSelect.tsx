import * as React from 'react';
import { Select, Typography, type SelectProps } from '@material-tailwind/react';
import { type UseFormRegister, Controller } from 'react-hook-form';

interface Option {
  label?: string;
  value?: number;
}

type SelectedProps = SelectProps & {
  label: string;
  error?: string;
  options: Option[];
  name?: string;
};

const SelectField = React.forwardRef<
  HTMLSelectElement,
  SelectedProps & ReturnType<UseFormRegister<Option>>
>(({ label, error, options, control, ...props }, ref) => {
  const id = React.useId();

  return (
    <Typography as='label' htmlFor={id} color='default' className='mb-6 block w-full space-y-1.5'>
      <span className='text-sm font-semibold'>{label}</span>

      <Controller
        render={({ field }) => (
          <Select
            isError={Boolean(error)}
            color={error ? 'error' : 'primary'}
            ref={ref}
            key={field.value}
            defaultValue={field.value}
            {...props}
            {...field}
            id={id}
          >
            <Select.Trigger
              ref={ref}
              key={field.value}
              defaultValue={field.value}
              {...props}
              {...field}
              id={id}
            />
            <Select.List>
              {options.map((option) => (
                <Select.Option key={option.value} value={option.value}>
                  {option.label}
                </Select.Option>
              ))}
            </Select.List>
          </Select>
        )}
        name='favoriteFood'
        control={control}
      />
      {error && (
        <Typography type='small' color='error'>
          {error}
        </Typography>
      )}
    </Typography>
  );
});

export default SelectField;
