import * as React from 'react';
import { Select, Typography, type SelectProps } from '@material-tailwind/react';

type Options = {
  label: string;
  value: string;
}

type SelectedProps = SelectProps & {
  label: string;
  error?: string;
  options: Options[];
};

const SelectField = React.forwardRef<typeof Select.Field, SelectedProps>(
  ({ label, error, options = [], ...props }, ref) => {
    const id = React.useId();

    return (
      <Typography as='label' htmlFor={id} color='default' className='mb-6 block w-full space-y-1.5'>
        <span className='text-sm font-semibold'>{label}</span>
        <Select
          ref={ref}
          {...props}
          id={id}
          isError={Boolean(error)}
          color={error ? 'error' : 'primary'}
          className='w-full'
        >
          <Select.Trigger />
          <Select.List ref={ref}>
            {options.map((option, index) => (
              <Select.Option key={index} value={option.value}>
                {option.label}
              </Select.Option>
            ))}
          </Select.List>
        </Select>
        {error && (
          <Typography type='small' color='error'>
            {error}
          </Typography>
        )}
      </Typography>
    );
  },
);

export default SelectField;
