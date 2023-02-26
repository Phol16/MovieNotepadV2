import React from 'react';

const FeaturedCard = ({ image, title, year }) => {
  return (
    <div className='flex flex-col items-center '>
      <img src={image} alt='poster' className='w-36 md:w-36 md:h-48 xl:w-44 xl:h-60' />
      <p className='text-xs md:text-base'>
        {title}
        <span className='ml-2 text-red-600'>{year}</span>
      </p>
    </div>
  );
};

export default FeaturedCard;
