import React from 'react';

const FeaturedCard = ({ image, title, year }) => {
  return (
    <div className='flex flex-col items-center hover:scale-105 transition-all ease-in duration-[150ms]'>
      <img src={image} alt='poster' className='w-36 h-48 md:w-36 xl:w-44 xl:h-60 rounded-md ' />
      <section className='text-xs md:text-base flex justify-center items-center'>
        <p className='mr-1'>{title}</p>
        {year.map((year) => {
           return  typeof year === 'string'? (
              <span className='text-red-600'>{year}</span>
            ):(
              year.map((years, index)=>{
                return <span className='text-red-600'>{index !== year.length-1 ? `${years}-`: years}</span>
              })
            )
          })
        }
      </section>
    </div>
  );
};

export default FeaturedCard;
