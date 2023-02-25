import React from 'react';
import { Link } from 'react-router-dom';

const PageNotFound = () => {
  return (
    <div>
      <h1 className='text-white'>Page Not Found</h1>
      <Link to='/login'>Home</Link>
    </div>
  );
};

export default PageNotFound;
