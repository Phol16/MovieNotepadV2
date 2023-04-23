import React from 'react'
import NavBar from '../components/NavBar'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer';

const Intro = () => {
  return (
    <div className=' text-primaryText font-poppins flex flex-col '>
    <NavBar/>
    <main className='min-h-[calc(100svh-76px)] flex flex-col justify-center'>
    <Outlet/>
    </main>
    <Footer/>
  </div>
  );
};

export default Intro;
