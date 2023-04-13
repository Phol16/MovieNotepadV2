import React, { useCallback, useState } from 'react';
import cross from '../assets/cross.svg';

type props ={
  title:string,
  content:string,
}

const Questions = ({title, content}:props) => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <div className='p-1 w-[20rem]  m-auto flex flex-col gap-2'>
      <button className='flex items-center justify-between bg-neutral-700 p-3 w-full text-xs md:text-sm lg:text-lg' onClick={useCallback(()=>{setOpen(!open)},[open])}>
        <h1>{title}</h1>
        <img src={cross} alt='Icon' className={`w-3 h-3 ${open ? 'rotate-45' : 'rotate-0'}`}/>
      </button>
      {open && (
        <main className='bg-neutral-700 p-3'>
          <p className='text-xs md:text-xs lg:text-base font-extralight'>{content}</p>
        </main>
      )}
    </div>
  );
};

export default Questions;
