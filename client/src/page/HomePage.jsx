import React, { useEffect, useState } from 'react'
import FeaturedList from '../components/FeaturedList'

const HomePage = () => {
  const [movieList, setMovieList]=useState([])
  const [featuredList, setFeaturedList]=useState([])
  useEffect(()=>{
    const fetchMovieList = async()=>{
      const response = await fetch('http://localhost:3500/movies/',{
        method:'get',
        cors:'cors',
        headers:{
          'Content-Type': 'application/json',
        }
      }).then((res) => res.json());
      setMovieList(response)
    }
    fetchMovieList()
  },[])

  return (
    <div>
      <FeaturedList/>
    </div>
  )
}

export default HomePage