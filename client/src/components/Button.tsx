import React from 'react';

type props = {
  Name: string | (() => JSX.Element);
  handleClick: () => void;
};

const Button = ({ Name, handleClick }: props) => {
  return (
    <button
      className='bg-secondary font-medium p-2 rounded-lg text-sm md:text-base hover:bg-secondaryHover transition-colors duration-150 text-white'
      onClick={() => {
        handleClick();
      }}
    >
      {typeof Name === 'string' ? Name : <Name/>}
    </button>
  );
};

export default Button;
