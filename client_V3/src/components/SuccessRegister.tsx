import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const SuccessRegister = () => {
  const navigate = useNavigate()
  return (
    <div className='flex flex-col gap-5 justify-center items-center py-10 h-full'>
      <main className='w-fit bg-teriary p-5 rounded-lg flex flex-col gap-2'>
        <h1 className='font-bold text-xl'> Registered Success</h1>
        <button className='w-fit self-center' onClick={useCallback(()=>{navigate('/signIn')},[])}>Login?</button>
      </main>
    </div>
  );
};

export default SuccessRegister;
