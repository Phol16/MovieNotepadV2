import {  faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { useState } from 'react'

const ConnectingPage = () => {
  const [waited, setWaited] = useState(false)
  const [author, setAuthor] = useState(false)

  setTimeout(()=>{
    setWaited(true)
  },[5000])

  setTimeout(()=>{
    setAuthor(true)
  },[1000])


  return (
    <div className='text-white flex flex-col justify-center items-center min-h-screen'>
      <h1 className='text-white text-4xl md:text-5xl xl:text-6xl animate-bounce'>Movie<span className='text-red-600'>Notepad</span></h1>
      <section className='text-xl flex gap-1 justify-center items-center'>
      <FontAwesomeIcon icon={faSpinner} className='animate-spin'/>
      <p>Connecting...</p>
      </section>
      <section className={`bg-black/60 p-2 rounded-lg flex-col items-center ${waited ? 'flex' : 'hidden'}`}>
      {waited ? <p className=' text-xl p-2'>Please Wait</p>:null}
      {author ? <p>Created By: <span className='text-red-600'>Phol</span> </p>:null}
      </section>
      </div>
  )
}

export default ConnectingPage