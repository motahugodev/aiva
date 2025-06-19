import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
interface Props {
  images: string[];
}

export default function AppGallery({ images = [] }: Props) {
  const [active, setActive] = React.useState(images[0]);
  return (
    <div className='grid gap-4'>
      <div>
        <LazyLoadImage
          alt={active}
          effect='blur'
          className='h-auto w-full max-w-full rounded-lg object-cover object-center md:h-[480px]'
          wrapperProps={{
            style: { transitionDelay: '1s' },
          }}
          src={active}
        />
      </div>
      <div className='grid lg:grid-cols-8 grid-cols-4 gap-4'>
        {images.map((imgelink, index) => (
          <div key={index}>
            <LazyLoadImage
              onClick={() => setActive(imgelink)}
              alt='gallery-image'
              effect='blur'
              className='object-cover object-center h-20 max-w-full rounded-lg cursor-pointer'
              wrapperProps={{
                style: { transitionDelay: '1s' },
              }}
              src={imgelink}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
