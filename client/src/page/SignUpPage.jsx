import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';

const user_regex = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const password_regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%.]).{8,24}$/;

const SignUpPage = () => {
  const userRef = useRef();

  const [username, setUsername] = useState('');
  const [validUsername, setValidUsername] = useState(false);
  const [usernameFocus, setUsernameFocus] = useState(false);

  const [password, setPassword] = useState('');
  const [validPassword, setValidPassword] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  const [matchPassword, setMatchPassword] = useState('');
  const [validMatch, setValidMatch] = useState(false);
  const [MatchFocus, setMatchFocus] = useState(false);

  const [firstName, setFirstName] = useState('');
  const [validFirstName, setValidFirstsername] = useState(false);

  const [lastName, setLastName] = useState('');
  const [validLastName, setValidLastName] = useState(false);

  const [role, setRole] = useState('admin');

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    const result = user_regex.test(username);
    setValidUsername(result);
  }, [username]);

  useEffect(() => {
    const result = password_regex.test(password);
    setValidPassword(result);
    const match = password === matchPassword;
    setValidMatch(match);
  }, [password, matchPassword]);

  return (
    <div className='text-white p-10 rounded-lg flex flex-col gap-5 backdrop-blur-md bg-black/30 w-full'>
      <h1 className='text-xl lg:text-2xl'>Register</h1>
      <form action='' className='flex flex-col gap-1'>
        <label htmlFor='firstname'>First Name: </label>
        <input
          ref={userRef}
          type='text'
          name='firstname'
          id='firstname'
          className='text-black bg-white p-1 rounded-md'
          placeholder='First Name'
          onChange={({ target: { value } }) => {
            setFirstName(value);
          }}
        />
        <label htmlFor='lastname'>Last Name: </label>
        <input
          type='text'
          name='lastname'
          id='lastname'
          className='text-black bg-white p-1 rounded-md'
          placeholder='Last Name'
          onChange={({ target: { value } }) => {
            setLastName(value);
          }}
        />
        <fieldset>
          <legend>Select role:</legend>
          <section className='flex gap-1'>
            <input
              type='radio'
              id='admin'
              name='role'
              value='admin'
              checked={role === 'admin'}
              onChange={({ target: { value } }) => {
                setRole(value);
              }}
            />
            <label htmlFor='admin' className='mr-2'>
              Admin
            </label>
            <input
              type='radio'
              id='user'
              name='role'
              value='user'
              checked={role === 'user'}
              onChange={({ target: { value } }) => {
                setRole(value);
              }}
            />
            <label htmlFor='user'>User</label>
          </section>
        </fieldset>
        <label htmlFor='username'>
          <span className={validUsername ? 'inline-block mr-1' : 'hidden'}>
            <FontAwesomeIcon icon={faCheck} style={{ color: 'green' }} />
          </span>
          <span className={validUsername || !username ? 'hidden' : 'inline-block mr-1'}>
            <FontAwesomeIcon icon={faTimes} style={{ color: 'red' }} />
          </span>
          Username:
        </label>
        <input
          type='text'
          placeholder='Username'
          name='username'
          id='username'
          className='text-black bg-white p-1 rounded-md'
          required
          autoComplete='off'
          onChange={({ target: { value } }) => {
            setUsername(value);
          }}
        />
        <label htmlFor='password'>
          <span className={validPassword ? 'inline-block mr-1' : 'hidden'}>
            <FontAwesomeIcon icon={faCheck} style={{ color: 'green' }} />
          </span>
          <span className={validPassword || !password ? 'hidden' : 'inline-block mr-1'}>
            <FontAwesomeIcon icon={faTimes} style={{ color: 'red' }} />
          </span>
          Password:
        </label>
        <input
          type='password'
          placeholder='Password'
          name='password'
          id='password'
          className='text-black bg-white p-1 rounded-md'
          required
          autoComplete='off'
          onChange={({ target: { value } }) => {
            setPassword(value);
          }}
        />
        <label htmlFor='confirmpassword'>
          <span className={validMatch && matchPassword ? 'inline-block mr-1' : 'hidden'}>
            <FontAwesomeIcon icon={faCheck} style={{ color: 'green' }} />
          </span>
          <span className={validMatch || !matchPassword ? 'hidden' : 'inline-block mr-1'}>
            <FontAwesomeIcon icon={faTimes} style={{ color: 'red' }} />
          </span>
          Confirm Password:
        </label>
        <input
          type='password'
          placeholder='Confirm Password'
          name='confirmpassword'
          id='confirmpassword'
          className='text-black bg-white p-1 rounded-md'
          onChange={({ target: { value } }) => {
            setMatchPassword(value);
          }}
        />
        <button className='my-2 w-fit p-2 rounded-md self-end bg-gradient-to-tr from-red-800 to-red-600 text-white text-base lg:text-lg'>Submit</button>
      </form>
      <section className='text-sm lg:text-base'>
        <p> Already have an account?</p>
        <Link to='/login'>Sign In</Link>
      </section>
    </div>
  );
};

export default SignUpPage;
