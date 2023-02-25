import React from 'react'
import { Link } from 'react-router-dom'

const SignUpPage = () => {
  return (
    <div className='text-white'>
      <h1>Register</h1>
      <form action="" className='flex flex-col gap-1'>
        <label htmlFor="firstname">First Name: </label>
        <input type="text" name='firstname' id='firstname' className='text-black bg-white p-1'/>
        <label htmlFor="lastname">Last Name: </label>
        <input type="text" name='lastname' id='lastname' className='text-black bg-white p-1'/>
        <fieldset>
          <legend>Select role:</legend>
          <input type="radio" id='admin' name='role' checked/>
          <label htmlFor="admin">Admin</label>
          <input type="radio" id='user' name='role'/>
          <label htmlFor="user">User</label>
        </fieldset>
        <label htmlFor="username">Username: </label>
        <input type="text" name='username' id='username' className='text-black bg-white p-1'/>
        <label htmlFor="password">Password: </label>
        <input type="password" name='password' id='password' className='text-black bg-white p-1'/>
        <button>submit</button>
      </form>
      <p> Already have an account?</p>
      <Link to='/login'>Sign In</Link>
    </div>
  )
}

export default SignUpPage