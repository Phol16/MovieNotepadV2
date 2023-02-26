import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const LogInPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  return (
    <div className='text-white p-10 rounded-lg flex flex-col gap-5 backdrop-blur-md bg-black/30 w-full'>
      <h1 className='text-xl lg:text-2xl'>MovieNotepad</h1>
      <form action="" className='flex flex-col gap-1'>
        <label htmlFor="username">Username: </label>
        <input type="text" name='username' id='username' className='text-black bg-white p-1 rounded-md' placeholder='Username' onChange={({event:{value}})=>{setUsername(value)}}/>
        <label htmlFor="password">Password: </label>
        <input type="password" name='password' id='passowrd' className='text-black bg-white p-1 rounded-md' placeholder='Password' onChange={({event:{value}})=>{setPassword(value)}}/>
        <button className='my-2 w-fit p-2 rounded-md self-end bg-gradient-to-tr from-red-800 to-red-600 text-white text-base lg:text-lg'>Submit</button>
      </form>
      <section className='text-sm lg:text-base'>
      <p>Create Account:</p>
      <Link to='/signup'>Sign Up</Link>
      </section>
    </div>
  )
}

export default LogInPage