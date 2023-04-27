import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SecondaryButton from '../components/SecondaryButton';
import SubmitButton from '../components/SubmitButton';
import spinner from '../assets/spinner.svg';
import { dataFetching } from '../utils/dataFetching';

interface information {
  email: string;
  password: string;
}

const LogInPage = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  sessionStorage.setItem('Page', 'signIn');

  const handlesignUp = useCallback(() => {
    sessionStorage.removeItem('Page');
    navigate('/signUp');
  }, []);

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const data: information = { email, password };
      sendData(data);
    },
    [email, password]
  );

  const sendData = async (data: information) => {
    try {
      setLoading(true);
      const response = new dataFetching('/auth/logIn', data);
      const fetchedData = await response.postData();
      if (fetchedData.message === 'success') {
        if (fetchedData.data.role === 'Admin') {
          document.cookie = 'role=Admin';
        }
        sessionStorage.setItem('user', fetchedData.data);
        navigate('/home');
      } else {
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='flex flex-col gap-5 justify-center items-center w-full'>
      <h1 className='text-xl md:text-3xl text-secondary font-semibold'>Log In</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-5 bg-teriary px-5 py-10 rounded-lg max-w-xs text-sm md:text-lg '>
        <label htmlFor='email' className='flex flex-col'>
          Email:
          <input
            type='email'
            id='email'
            name='email'
            placeholder='Email'
            className='rounded-md p-1 text-black'
            onChange={useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
              setLoading(false);
              setEmail(e.target.value);
            }, [])}
          />
        </label>
        <label htmlFor='password' className='flex flex-col'>
          Password:
          <input
            type='password'
            id='password'
            name='password'
            placeholder='Password'
            className='rounded-md p-1 text-black'
            onChange={useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
              setLoading(false);
              setPassword(e.target.value);
            }, [])}
          />
        </label>
        <div className='flex justify-between items-center p-2'>
          <section className='text-xs md:text-sm'>
            <p className='max-w-[6rem]'>Don't have an Account?</p>
            <SecondaryButton Name={'Sign Up'} handleClick={handlesignUp} />
          </section>
          <section className='flex items-center gap-2'>
            {loading && <img src={spinner} alt='Icon' className='animate-spin' />}
            <SubmitButton Name={'Log In'} />
          </section>
        </div>
      </form>
    </div>
  );
};

export default LogInPage;
