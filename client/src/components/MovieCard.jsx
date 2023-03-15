import React from 'react';
import { Link } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import style from './style/textShadow.module.css'

const MovieCard = ({ image, title, year, redirect }) => {
  return (
    <>
    <Link to={`${redirect}`}>
    <div className='flex flex-col items-center hover:scale-105 transition-all ease-in duration-[150ms]'>
      <LazyLoadImage effect='blur' src={image} alt='poster' className='w-36 h-48 md:w-36 xl:w-44 xl:h-60 rounded-md shadow-sm shadow-black' />
      <section className={`${style.textShadow} text-xs md:text-[15px] flex justify-center items-center max-w-[180px]`}>
        <p className='mr-1 text-white'>{title}</p>
        {year.map((event, index) => {
                return <span key={index} className='text-red-600'>{
                  year.length > 1 ? (
                  index !== year.length-1 ? `${event}-`: event
                  ):( event )
                  }</span>
          })
        }
      </section>
    </div>
    </Link>
    </>
  );
};

export default MovieCard;
