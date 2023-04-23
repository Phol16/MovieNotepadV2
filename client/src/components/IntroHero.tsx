import React, { useCallback } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import arrowright from '../assets/arrowRight.svg';
import { useNavigate } from 'react-router-dom';
import RedirectButton from './Button';

const IntroHero = () => {
  const navigate = useNavigate();

  const handleSignUp = useCallback(() => {
    navigate('/signUp');
  }, []);

  const getStartedButtonIcon = () => {
    return (
      <div className='flex items-center gap-2'>
        <p>Get Started</p>
        <LazyLoadImage src={arrowright} alt='Icon' className='w-4 h-4 lg:w-5 lg:h-5' />
      </div>
    );
  };

  return (
    <div className={` h-[80svh] w-full bg-cover bg-center bg-no-repeat overflow-hidden relative`}>
      <LazyLoadImage  src="https://assets.nflxext.com/ffe/siteui/vlv3/efb4855d-e702-43e5-9997-bba0154152e0/d583cb90-3cfe-4469-a6ef-6d9e13c31f77/PH-en-20230417-popsignuptwoweeks-perspective_alpha_website_small.jpg" alt="Photo" className='absolute top-0 left-0 z-[0] h-full w-full object-cover'/>
      <section className='w-full h-full flex flex-col gap-20 justify-center items-center backdrop-brightness-50 '>
        <h1 className='text-xl md:text-3xl lg:text-4xl font-semibold max-w-xs lg:max-w-none text-center textShadow'>Unlimited movies, TV shows, and more.</h1>
        <section className='flex items-center gap-5 text-xs md:text-sm lg:text-lg'>
          <p className=' max-w-[6rem] lg:max-w-[8rem] text-center textShadow'>Don't have an account?</p>
          <RedirectButton Name={getStartedButtonIcon} handleClick={handleSignUp} />
        </section>
      </section>
    </div>
  );
};

export default IntroHero;
