import React from 'react'
import NavBar from '../components/NavBar'

const Home = () => {
  localStorage.setItem('Home', true)
  return (
    <div className='text-white'>
      <NavBar/>
    </div>
  )
}

export default Home