import React from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from '../components/NavBar'
import style from './intro.module.css'

const Intro = () => {
  return (
    <div className={style.container}>
      <NavBar/>
      <section className=' flex justify-center pt-10'>
      <Outlet/>
      </section>
    </div>
  )
}

export default Intro