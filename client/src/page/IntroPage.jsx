import React from 'react'
import { Link } from 'react-router-dom'

const IntroPage = () => {
  return (
    <div className='flex justify-center items-center flex-col w-full h-full gap-2'>
      <h1 className='text-4xl md:text-5xl xl:text-6xl animate-bounce'>MovieNotepad</h1>
      <section className='flex gap-2'>
      <Link to='/logIn'><button className='bg-gradient-to-tr from-cyan-800 to-cyan-600 w-20 h-10 rounded-lg text-white hover:scale-110 transition-all'>Login</button></Link>
      <Link to='/signUp'><button className='bg-gradient-to-tr from-cyan-800 to-cyan-600 w-20 h-10 rounded-lg text-white hover:scale-110 transition-all'>SignUp</button></Link>
      </section>
    </div>
  )
}

export default IntroPage