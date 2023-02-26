import React from 'react';
import { Link } from 'react-router-dom';

const PageNotFound = () => {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen '>
      <h1 className='text-white text-2xl lg:text-4xl'>Page Not Found</h1>
      <Link to='/'>
        <button className='my-2 w-fit p-2 rounded-md self-end bg-gradient-to-tr from-red-800 to-red-600 text-white text-base lg:text-lg'>Home</button>
      </Link>
    </div>
  );
};

export default PageNotFound;
