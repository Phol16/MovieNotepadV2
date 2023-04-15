import React from 'react';

type props = {
  Name: string | (() => JSX.Element);
  handleClick: () => void;
};

const SecondaryButton = ({ Name, handleClick }: props) => {
  return (
    <button
      type='button'
      className='text-secondary focus:outline-none p-2 rounded-lg text-xs md:text-sm hover:text-secondaryHover transition-colors duration-150'
      onClick={() => {
        handleClick();
      }}
    >
      {typeof Name === 'string' ? Name : <Name />}
    </button>
  );
};

export default SecondaryButton;
