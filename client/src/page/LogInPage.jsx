import React from 'react'
import { Link } from 'react-router-dom'

const LogInPage = () => {
  return (
    <div className='text-white'>
      <h1>MovieNotepad</h1>
      <form action="" className='flex flex-col gap-1'>
        <label htmlFor="username">Username: </label>
        <input type="text" name='username' id='username' className='text-black bg-white px-2'/>
        <label htmlFor="password">Password: </label>
        <input type="password" name='password' id='passowrd' className='text-black bg-white px-2'/>
        <button>submit</button>
      </form>
      <p>Create Account:</p>
      <Link to='/signup'>Sign Up</Link>
    </div>
  )
}

export default LogInPage