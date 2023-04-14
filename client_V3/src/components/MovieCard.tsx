import React from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { useNavigate } from 'react-router-dom'

type props = {
  index:number,
  redirect:string,
  image:string,
  title:string,
}

const MovieCard = ({index, redirect, image, title}:props) => {
  const navigate = useNavigate()
  return (
    <span
    key={index}
    onClick={() => {
      navigate(`${redirect}`);
    }}
    className='border overflow-hidden rounded-lg flex cursor-pointer hover:-translate-y-1 transition-transform duration-200'
  >
    <LazyLoadImage key={index} effect='blur' src={image} alt='Poster' className=' w-full h-full object-cover' title={title} />
  </span>
  )
}

export default MovieCard