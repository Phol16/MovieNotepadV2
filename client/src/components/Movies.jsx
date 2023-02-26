import React, { useEffect, useState } from 'react'
import MovieCard from './MovieCard'

const Movies = () => {
  const [movieList, setMovieList]=useState(false)

  useEffect(()=>{
    const fetchMovieList = async()=>{
      const response = await fetch('http://localhost:3500/movies/',{
        method:'get',
        cors:'cors',
        headers:{
          'Content-Type': 'application/json',
        }
      }).then((res) => res.json());
      setMovieList(response.data)
    }
    fetchMovieList()
  },[])


  const itemList = (details)=>{
    return(
      <div key={details.title} className='flex flex-col items-center justify-center hover:scale-105 transition-all ease-in duration-[150ms]'>
        <MovieCard title={details.title} image={details.image} year={details.year}/>
      </div>
    )
  }

  return (
    <>{movieList ? (
    <div className='mt-5 min-w-screen'>
      <h1 className='my-2'>Movies & Series:</h1>
      <main className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4'>
      {movieList.map(itemList)}
      </main>
    </div>
    ):(
      <div>
        <h1>Loading...</h1>
      </div>
    )
    }
    </>
  )
}

export default Movies