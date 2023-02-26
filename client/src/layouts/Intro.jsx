import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer';
import NavBar from '../components/NavBar';

const Intro = () => {
  return (
    <div>
      <NavBar />
      <section className='flex justify-center items-center min-h-screen p-10'>
        <Outlet />
      </section>
      <Footer/>
    </div>
  );
};

export default Intro;
