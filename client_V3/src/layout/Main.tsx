import React from 'react'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import MainPage from '../page/MainPage'
import { Outlet } from 'react-router-dom'

const Main = () => {
  return (
    <div>
    <NavBar/>
    <div className='text-primaryText pb-10'>
      <Outlet/>
    </div>
    <Footer/>
    </div>
  )
}

export default Main