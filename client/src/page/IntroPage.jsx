import React from 'react'
import { Link } from 'react-router-dom'

const IntroPage = () => {
  return (
    <div className='flex flex-col gap-2 items-center my-10'>
      <h1 className='text-white text-4xl md:text-5xl xl:text-6xl'>MovieNotepad</h1>
      <section className='flex gap-2'>
      <Link to='/logIn'><button className='bg-gradient-to-tr from-red-800 to-red-600 w-20 h-10 rounded-lg text-white hover:scale-110 transition-all'>Sign In</button></Link>
      <Link to='/signUp'><button className='bg-gradient-to-tr from-red-800 to-red-600 w-20 h-10 rounded-lg text-white hover:scale-110 transition-all'>Sign Up</button></Link>
      </section>
    </div>
  )
}

export default IntroPage