import React from 'react';

interface Props {
  images: string[];
}

export default function AppGallery({ images = [] }: Props) {
  const [active, setActive] = React.useState(
    images[0]
   );
  return (
    <div className='grid gap-4'>
      <div>
        <img
          className='h-auto w-full max-w-full rounded-lg object-cover object-center md:h-[480px]'
          src={active}
          alt=''
        />
      </div>
      <div className='grid lg:grid-cols-8 grid-cols-4 gap-4'>
        {images.map((imgelink, index) => (
          <div key={index}>
            <img
              onClick={() => setActive(imgelink)}
              src={imgelink}
              className='object-cover object-center h-20 max-w-full rounded-lg cursor-pointer'
              alt='gallery-image'
            />
          </div>
        ))}
      </div>
    </div>
  );
}
