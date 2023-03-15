import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'
import NavBar from '../components/NavBar'


const Home = () => {
  localStorage.setItem('Home', true)
  return (
    <div className='text-white'>
      <NavBar/>
      <section className='min-h-screen flex flex-col bg-black/60'>
      <Outlet/>
      </section>
      <Footer/>
    </div>
  )
}

export default Home