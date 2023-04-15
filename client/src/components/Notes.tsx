import React from 'react'
import { primText } from '../style/theme'
import InfoNote from './InfoNote'

const Notes = () => {
  return (
    <div>
      <section className='flex items-center justify-between p-2'>
        <h1 className={`${primText}`}>Notes</h1>
        <button>Add Notes</button>
      </section>
      <main className='overflow-auto m-auto max-w-md h-[400px] bg-white p-3 gap-2 grid grid-cols-3 auto-rows-max'>
        <InfoNote/>
        <InfoNote/>
        <InfoNote/>
        <InfoNote/>
      </main>
    </div>
  )
}

export default Notes