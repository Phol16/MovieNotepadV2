import React, { useEffect, useState } from 'react'
import FeaturedList from '../components/FeaturedList'
import Movies from '../components/Movies'

const HomePage = () => {

  return (
    <div className='flex flex-col items-center'>
      <FeaturedList/>
      <Movies/>
    </div>
  )
}

export default HomePage