import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/localhost';

const LogInPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [theAccessToken, setAccessToken] = useState();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userInfo = { username, password };

    try {
      const response = await fetch(`${api()}/users/logIn`, {
        method: 'POST',
        cors: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userInfo),
      }).then((res) => res.json());
      if (response.status === 'success') {
        return setAccessToken(response.accessToken);
      }
      setError(response.message);
    } catch (error) {
      console.log({ message: error.message });
    }
  };

  useEffect(() => {
    theAccessToken ? (localStorage.setItem('Token', `${theAccessToken}`), navigate('/home')) : null;
  }, [theAccessToken]);

  return (
    <div className='text-white p-10 rounded-lg flex flex-col gap-5 backdrop-blur-md bg-black/30 w-full sm:max-w-xs'>
      <h1 className='text-xl lg:text-2xl'>MovieNotepad</h1>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit} className='flex flex-col gap-1'>
        <label htmlFor='username'>Username: </label>
        <input
          type='text'
          name='username'
          id='username'
          className='text-black bg-white p-1 rounded-md'
          placeholder='Username'
          onChange={({ target: { value } }) => {
            setUsername(value);
          }}
        />
        <label htmlFor='password'>Password: </label>
        <input
          type='password'
          name='password'
          id='passowrd'
          className='text-black bg-white p-1 rounded-md'
          placeholder='Password'
          onChange={({ target: { value } }) => {
            setPassword(value);
          }}
        />
        <button type='submit' className='my-2 w-fit p-2 rounded-md self-end bg-gradient-to-tr from-red-800 to-red-600 text-white text-base lg:text-lg'>
          Log In
        </button>
      </form>
      <section className='text-sm lg:text-base'>
        <p>Create Account:</p>
        <Link to='/signup'>Sign Up</Link>
      </section>
    </div>
  );
};

export default LogInPage;
