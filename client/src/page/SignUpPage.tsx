import React, { useCallback, useEffect, useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { useNavigate } from 'react-router-dom';
import SecondaryButton from '../components/SecondaryButton';
import SubmitButton from '../components/SubmitButton';
import SuccessRegister from '../components/SuccessRegister';
import spinner from '../assets/spinner.svg';
import { dataFetching } from '../utils/dataFetching';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface information {
  username: string;
  password: string;
  email: string;
  image?: string;
}

export const emailRE = /^[a-zA-Z0-9]+@[a-zA-Z]+\.[a-z]{2,8}/gi;

const SignUpPage = () => {
  const [email, setEmail] = useState<string>('');
  const [emailError, setEmailError] = useState<boolean>(false);
  const [emailErrorMsg, setEmailErrorMsg] = useState<string>('Must be A valid Email');
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [image, setImage] = useState<string | undefined>();
  const [success, setSuccess] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleSignIn = useCallback(() => {
    sessionStorage.setItem('Page', 'signIn');
    navigate('/signIn');
  }, []);

  const onChangeImage = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      const reader = new FileReader();

      if (file) {
        reader.readAsDataURL(file);
        reader.onload = () => {
          if (typeof reader.result === 'string') setImage(reader.result);
        };
      }
    }
  }, []);

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const data: information = { username, password, email, image };
      if(!emailError){
      return sendData(data);
      }
    },
    [username, password, email, image]
  );

  const sendData = async (data: information) => {
    try {
      setLoading(true);
      const response = new dataFetching('/auth/register', data);
      const fetchedData = await response.postData();
      if (fetchedData.message === 'success') {
        toast.success('Successfully Registered');
        setSuccess(true);
      } else {
        toast.error(fetchedData.message)
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }finally{
      setLoading(false)
    }
  };

  useEffect(()=>{
    if(emailRE.test(email)){
      setEmailError(false)
    }else if(!emailRE.test(email) && email !== ''){
      setEmailError(true)
    }
  },[email])

  return (
    <>
      {success ? (
        <SuccessRegister />
      ) : (
        <div className='flex flex-col gap-5 justify-center items-center py-10 h-full '>
          <h1 className='text-xl md:text-3xl text-secondary font-semibold'>Sign Up</h1>
          <form onSubmit={handleSubmit} className={`flex flex-col gap-5 bg-teriary px-5 py-10 rounded-lg max-w-xs text-sm md:text-lg`}>
            <label htmlFor='email' className='flex flex-col'>
              Email: *
              <input
                type='email'
                id='email'
                name='email'
                placeholder='Email'
                autoComplete='off'
                onBlur={()=>{setEmailError(false)}}
                className={`rounded-md p-1 text-black ${emailError ? ' outline outline-red-500' : 'outline-none'}`}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              {emailError && <p className='text-sm text-center p-1 text-red-500'>{emailErrorMsg}</p>}
            </label>
            <label htmlFor='password' className='flex flex-col'>
              Password: *
              <input
                type='password'
                id='password'
                name='password'
                placeholder='Password'
                className='rounded-md p-1 text-black'
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </label>
            <label htmlFor='name' className='flex flex-col'>
              Name: *
              <input
                type='text'
                id='name'
                name='name'
                placeholder='Name'
                autoComplete='off'
                className='rounded-md p-1 text-black'
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
            </label>
            <label htmlFor='image' className='flex flex-col gap-1'>
              Image: (Optional)
              {image && <LazyLoadImage src={image} className='max-w-[200px] h-auto self-center' />}
              <label htmlFor='image' className='m-auto cursor-pointer bg-gray-600 p-2 rounded-lg hover:bg-gray-500 hover:text-black transition-colors duration-150 text-sm md:text-base'>
                Upload a File
              </label>
              <input type='file' accept='image/*' id='image' name='image' className='hidden' onChange={onChangeImage} />
            </label>
            <div className='flex justify-between items-center p-2'>
              <section className='text-xs md:text-sm'>
                <p className='max-w-[6rem]'>Don't have an Account?</p>
                <SecondaryButton Name={'Sign In'} handleClick={handleSignIn} />
              </section>
              <section className='flex items-center gap-2'>
                {loading && <img src={spinner} alt='Icon' className='animate-spin' />}
                <SubmitButton Name={'Log In'} />
              </section>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default SignUpPage;
