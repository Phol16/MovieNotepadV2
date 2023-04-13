import React from 'react';

type props = {
  Name: string | (() => JSX.Element);
  handleClick?: (e:Event) => void;
};

const SubmitButton = ({ Name, handleClick }: props) => {
  return (
    <button
    type='submit'
      className='bg-secondary text-white p-2 rounded-lg text-sm md:text-base hover:bg-secondaryHover transition-colors duration-150'
      onClick={() => {
        handleClick;
      }}
    >
      {typeof Name === 'string' ? Name : <Name/>}
    </button>
  );
};

export default SubmitButton;
