import ImageUploading, { type ImageListType } from 'react-images-uploading';
import { Button, ButtonGroup } from '@material-tailwind/react';
import { useMemo } from 'react';

interface Props {
  EmitImage: (value: string[]) => void;
  images?: string[] | undefined;
}

export default function uploadImage({ EmitImage, images = [] }: Props) {
  const maxNumber = 69;

  const onChange = (imageList: ImageListType) => {
    const urls: string[] = imageList.map((image) => URL.createObjectURL(image.file));
    console.log('🚀 ~ onChange ~ urls:', urls);

    EmitImage(urls);
  };

  const imagesList = useMemo(() => {
    return images.map((image) => {
      return { dataURL: image };
    });
  }, [images]);

  return (
    <ImageUploading multiple value={imagesList} onChange={onChange} maxNumber={maxNumber}>
      {({
        imageList,
        onImageUpload,
        onImageRemoveAll,
        onImageUpdate,
        onImageRemove,
        isDragging,
        dragProps,
      }) => (
        // write your building UI
        <div className='upload__image-wrapper'>
          <Button color={isDragging ? 'success' : 'primary'} onClick={onImageUpload} {...dragProps}>
            Adicionar
          </Button>
          &nbsp;
          {imageList.length > 0 && (
            <Button onClick={onImageRemoveAll} color='error'>
              Remover todos
            </Button>
          )}{' '}
          {imageList.map((image, index) => (
            <div key={index} className='image-item'>
              <img src={image.dataURL} alt='' width='100' className='my-3' />
              <ButtonGroup size='xs'>
                <Button onClick={() => onImageUpdate(index)}>Alterar</Button>
                <Button onClick={() => onImageRemove(index)}>Remover</Button>
              </ButtonGroup>
            </div>
          ))}
        </div>
      )}
    </ImageUploading>
  );
}
