import { Dialog, Button, Typography } from '@material-tailwind/react';
import { AppNotification } from 'iconoir-react';

interface Props {
  EmitConfirm: (value: number) => void;
}

export default function DialogNotification({ EmitConfirm }: Props) {
  return (
    <Dialog size='sm'>
      <Dialog.Trigger as={Button}>Open Notification</Dialog.Trigger>
      <Dialog.Overlay>
        <Dialog.Content className='p-8'>
          <Typography type='h6' className='text-center'>
            Deseja Deletar ?
          </Typography>
          <div className='mt-12 flex flex-col items-center text-center'>
            <AppNotification className='mb-6 h-24 w-24' />
          </div>
          <div className='mb-1 mt-8 flex items-center justify-center gap-2'>
            <Dialog.DismissTrigger as={Button} variant='ghost' color='error'>
              Cancelar
            </Dialog.DismissTrigger>
            <Button onClick={EmitConfirm}>Deletar</Button>
          </div>
        </Dialog.Content>
      </Dialog.Overlay>
    </Dialog>
  );
}
