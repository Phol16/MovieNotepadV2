import React from 'react'
import Footer from '../components/Footer'
import NavBar from '../components/NavBar'

const Home = () => {
  localStorage.setItem('Home', true)
  return (
    <div className='text-white'>
      <NavBar/>
      <Footer/>
    </div>
  )
}

export default Home