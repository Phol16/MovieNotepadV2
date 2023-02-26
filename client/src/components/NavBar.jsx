import { faTicket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <div className='fixed w-full flex p-5 gap-1 flex justify-between z-10'>
      <Link to='/'>
        <section className='flex items-center gap-1 text-white'>
          <FontAwesomeIcon icon={faTicket} />
          Movie<span className='text-red-600'>Notepad</span>
        </section>
      </Link>
      <section className='flex gap-2'>
      <Link to='/login' className='text-white'>Sign In</Link>
      <Link to='/signup' className='text-white'>Signup</Link>
      </section>
    </div>
  );
};

export default NavBar;
