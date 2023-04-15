import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import guard from '../assets/guard.svg';
import { useNavigate } from 'react-router-dom';

const PageNotFound = () => {
  const navigate = useNavigate()
  return (
    <main className='absolute w-full h-full flex justify-center items-center text-2xl font-semibold text-white'>
      <button onClick={()=>{navigate('/')}} className='flex gap-2 items-center hover:-translate-y-1 transition-transform duration-200'>
        <LazyLoadImage src={guard} />
        <div className=''>PageNotFound</div>
      </button>
    </main>
  );
};

export default PageNotFound;
