import React, { useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import cross from '../assets/cross.svg';

type props = {
  title:string,
  content:string,
}

const InfoNote = ({title, content}:props) => {
  const [open, setOpen] = useState<boolean>(true);
  return (
    <>
      {open ? (
        <div className='text-sm  bg-cyan-800 text-white font-medium p-2 max-w-[150px] '>
          <div className='flex justify-between py-2'>
            <h1>{title}</h1>
            <button
              className='p-1 self-start relative -top-3 left-1'
              onClick={() => {
                setOpen(false);
              }}
            >
              <LazyLoadImage src={cross} alt='Icon' className='fill-black rotate-[45deg]' />
            </button>
          </div>
          <p className='max-w-xs font-normal'>
              {content}
          </p>
        </div>
      ) : (
        <div
          className='bg-cyan-800 w-10 h-10 overflow-hidden cursor-pointer relative '
          onClick={() => {
            setOpen(true);
          }}
        >
          <p className='text-xs p-1'>-------</p>
        </div>
      )}
    </>
  );
};

export default InfoNote;
