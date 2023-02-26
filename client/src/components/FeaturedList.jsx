import React, { useEffect, useState } from 'react'
import api from '../api/localhost'

const FeaturedList = () => {
  const [featuredList, setFeaturedList]= useState([])

  useEffect(()=>{
    const fetchFeaturedList = async()=>{
      const response = await fetch(`${api()}/movies/featured`,{
        method:'get',
        cors:'cors',
        headers:{
          'Content-Type': 'application/json',
        }
      }).then((res) => res.json());
      setFeaturedList(response.data)
    }
    fetchFeaturedList()
  },[])
console.log(featuredList);

  return (
    <div>FeaturedList</div>
  )
}

export default FeaturedList