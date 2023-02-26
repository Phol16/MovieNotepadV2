import React from 'react';

const FeaturedCard = ({ image, title, year }) => {
  return (
    <div className='flex flex-col items-center hover:scale-105 transition-all ease-in duration-[150ms]'>
      <img src={image} alt='poster' className='w-36 h-48 md:w-36 xl:w-44 xl:h-60 rounded-md ' />
      <p className='text-xs md:text-base'>
        {title}
        <span className='ml-2 text-red-600'>{year}</span>
      </p>
    </div>
  );
};

export default FeaturedCard;
