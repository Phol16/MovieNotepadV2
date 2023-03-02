import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Footer from '../components/Footer'
import NavBar from '../components/NavBar'

const WatchList = () => {
  const navigate = useNavigate();
  return (
    <>
    <NavBar/>
    <main className='min-h-screen flex flex-col items-center justify-center py-20'>
    <div className='flex flex-col items-center gap-2 text-white'>
    <button onClick={()=>{navigate(-1)} } className='p-1 rounded-lg text-white bg-red-600 hover:scale-110 mb-5 text-sm md:text-base w-fit self-start'>Back</button>
    <h1 className='text-2xl md:text-3xl text-white'>Watch List</h1>
    <Outlet/>
    </div>
    </main>
    <Footer/>
    </>
  )
}

export default WatchList