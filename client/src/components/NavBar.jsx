import { faTicket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link } from 'react-router-dom';
import ProfileTab from './ProfileTab';

const NavBar = () => {
  const Home = localStorage.getItem('Home');

  return (
    <div className='fixed w-full flex items-center p-5 gap-1 flex justify-between z-10'>
      <Link to='/'>
        <section className='flex justify-center items-center gap-1 text-white text-base md:text-lg lg:text-xl'>
          <FontAwesomeIcon icon={faTicket} />
          Movie<span className='text-red-600'>Notepad</span>
        </section>
      </Link>
      {Home ? (
        <ProfileTab/>
      ) : (
        <section className='flex gap-2'>
          <Link to='/login' className='text-white'>
            Sign In
          </Link>
          <Link to='/signup' className='text-white'>
            Sign Up
          </Link>
        </section>
      )}
    </div>
  );
};

export default NavBar;
