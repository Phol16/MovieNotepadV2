import { faTicket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <div className='fixed w-full flex py-5 px-2 gap-1 flex justify-between'>
      <Link to='/'>
        <section className='flex items-center gap-1 text-white'>
          <FontAwesomeIcon icon={faTicket} />
          MovieNotepad
        </section>
      </Link>
      <section className='flex gap-2'>
      <Link to='/login' className='text-white'>Login</Link>
      <Link to='/signup' className='text-white'>Signup</Link>
      </section>
    </div>
  );
};

export default NavBar;
