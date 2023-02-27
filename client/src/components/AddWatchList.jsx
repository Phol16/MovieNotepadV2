import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

const AddWatchList = () => {
  return (
    <div className='flex justify-center'>
      <button className='bg-transparent text-white text-2xl md:text-3xl hover:scale-110 transition-all flex justify-center items-center gap-1'>
        <FontAwesomeIcon icon={faPlusCircle} />
        <p className='text-sm '>
          Add to <span className='text-red-600'>WatchList</span>
        </p>
      </button>
    </div>
  );
};

export default AddWatchList;
