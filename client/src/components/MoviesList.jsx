import React, { useEffect, useState } from 'react';
import MovieCard from './MovieCard';
import api from '../api/localhost';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

const Movies = ({ update }) => {
  const [movieList, setMovieList] = useState(false);
  const [movieListTotal, setMovieListTotal] = useState(0);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchMovieList = async () => {
      const response = await fetch(`${api()}/movies?page=${page}`, {
        method: 'GET',
        cors: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
      }).then((res) => res.json());
      response.status === 'success' ? (setMovieList(response.data),setMovieListTotal(response.totalPage) ): setMovieList(response.message);
    };
    fetchMovieList();
  }, [update,page]);

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
      <section className='flex justify-center items-center p-2 gap-2'>
        <button onClick={()=>{page <= 1 ? setPage(1) : setPage(page - 1)}} className='bg-black/30 rounded-md border border-white text-white p-1 hover:-translate-y-0.5'>prev</button>
        <p>{page}/{movieListTotal}</p>
        <button onClick={()=>{page >= movieListTotal ? setPage(movieListTotal) : setPage(page+1)}} className='bg-black/30 rounded-md border border-white text-white p-1 hover:-translate-y-0.5'>next</button>
      </section>
    </div>
  );
};

export default Movies;
