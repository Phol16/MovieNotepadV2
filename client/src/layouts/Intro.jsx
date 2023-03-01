import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer';
import NavBar from '../components/NavBar';

const Intro = () => {
  localStorage.removeItem('Home')
  return (
    <div>
      <NavBar />
      <section className='flex justify-center items-center min-h-screen w-full'>
        <Outlet />
      </section>
      <Footer/>
    </div>
  );
};

export default Intro;
