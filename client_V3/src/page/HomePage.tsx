import React, { JSXElementConstructor, useState } from 'react'
import MainPage from './MainPage'
import AdminButton from '../components/AdminButton'

const HomePage = () => {

  return (
    <div className='relative'>
      <MainPage/>
      <AdminButton />
    </div>
  )
}

export default HomePage