import React, { useEffect, useState } from 'react';
import MovieCard from './MovieCard';
import api from '../api/localhost';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

const Movies = ({ update }) => {
  const [movieList, setMovieList] = useState(false);

  useEffect(() => {
    const fetchMovieList = async () => {
      const response = await fetch(`${api()}/movies/`, {
        method: 'GET',
        cors: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
      }).then((res) => res.json());
      response.status === 'success' ? setMovieList(response.data) : setMovieList(response.message);
    };
    fetchMovieList();
  }, [update]);

  const itemList = (details) => {
    return (
      <div key={details.title} className='flex flex-col items-center justify-center hover:scale-105 transition-all ease-in duration-[150ms]'>
        <MovieCard title={details.title} image={details.image} year={details.year} redirect={`/home/movie/${details._id}`} />
      </div>
    );
  };

  return (
    <div className='mt-5 min-w-screen'>
      <h1 className='my-2'>Movies & Series:</h1>
      {movieList ? (
                  typeof movieList === 'string' ?
                  <p className='text-red-600 bg-black p-5 rounded-md'>
                    <FontAwesomeIcon icon={faExclamationCircle}/>
                    {movieList}</p>:
        <main className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4'>{
          movieList.map(itemList)
          }</main>
      ) : (
        <div>
          <h1>Loading...</h1>
        </div>
      )}
    </div>
  );
};

export default Movies;
