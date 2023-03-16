import React, { useEffect, useState } from 'react';
import MovieCard from './MovieCard';
import api from '../api/localhost';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

const Movies = ({ update }) => {
  const [movieList, setMovieList] = useState(false);
  const [movieListTotal, setMovieListTotal] = useState(0);
  const [page, setPage] = useState(1);

  const paginateButton= 'flex items-center gap-1 bg-black/40 rounded-md border border-black focus:outline-none text-white p-1 hover:-translate-y-0.5';

  useEffect(() => {
    const fetchMovieList = async () => {
      const response = await fetch(`${api()}/movies?page=${page}`, {
        method: 'GET',
        cors: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
      }).then((res) => res.json());
      response.status === 'success' ? (setMovieList(response.data), setMovieListTotal(response.totalPage)) : setMovieList(response.message);
    };
    fetchMovieList();
  }, [update, page]);

  const itemList = (details) => {
    return (
      <div key={details.title} className='flex items-center justify-center hover:scale-105 transition-all ease-in duration-[150ms]'>
        <MovieCard title={details.title} image={details.image} year={details.year} redirect={`/home/movie/${details._id}`} />
      </div>
    );
  };

  return (
    <div className='z-20 relative pb-6'>
      <h1 className='my-2'>Movies & Series:</h1>
      {movieList ? (
        typeof movieList === 'string' ? (
          <p className='text-red-600 bg-black p-5 rounded-md'>
            <FontAwesomeIcon icon={faExclamationCircle} />
            {movieList}
          </p>
        ) : (
          <main className={`grid ${movieList.length <= 2 ? `grid-cols-${movieList.length - 1}` : 'grid-cols-2'} md:${movieList.length <= 2 ? `grid-cols-${movieList.length - 1}` : 'grid-cols-3'} lg:grid-flow-col gap-4`}>{movieList.map(itemList)}</main>
        )
      ) : (
        <div>
          <h1>Loading...</h1>
        </div>
      )}
      <section className='flex justify-center items-center p-2 gap-2'>
        <button
          onClick={() => {
            page <= 1 ? setPage(1) : setPage(page - 1);
          }}
          className={`${paginateButton}`}
        >
          <FontAwesomeIcon icon={faArrowLeft}/>
          <p>Prev</p>
        </button>
        <p>
          {page}/{movieListTotal}
        </p>
        <button
          onClick={() => {
            page >= movieListTotal ? setPage(movieListTotal) : setPage(page + 1);
          }}
          className={`${paginateButton}`}
        >
          <p>Next</p>
          <FontAwesomeIcon icon={faArrowRight}/>
        </button>
      </section>
    </div>
  );
};

export default Movies;
