import React, { useEffect, useState } from 'react';
import { primText, subText } from '../style/theme';
import { API } from '../api/Api';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { useNavigate } from 'react-router-dom';
import arrowleft from '../assets/arrowLeft.svg';
import arrowright from '../assets/arrowRight.svg';
import MovieCard from './MovieCard';
import { dataFetching } from '../utils/dataFetching';

interface movieTypes {
  _id: string;
  image: string;
  title: string;
}

const MovieList = () => {
  const [movies, setMovies] = useState<movieTypes[]>([]);
  const [page, setPage] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    let catcher = true;
    const fetchMovie = async () => {
      const response = new dataFetching(`/movie?page=${page}`);
      const fetchedData = await response.getData();
      if (catcher) {
        setMovies(fetchedData.data);
        setTotal(fetchedData.totalPage);
      }
    };
    fetchMovie();

    return () => {
      catcher = false;
    };
  }, [page]);

  return (
    <div className={` border-t-4 border-white/30 py-10 px-8 text-primaryText font-semibold w-fit gap-5 flex flex-col m-auto`}>
      <h1 className={`${primText}`}>Movies/Series</h1>
      <header className='m-auto flex gap-5'>
        <button
          onClick={() => {
            setMovies([]);
            setPage(page <= 1 ? total : page - 1);
          }}
        >
          <LazyLoadImage src={arrowleft} alt='Icon' className='w-6' />
        </button>
        <h1>
          {page} / {total}
        </h1>
        <button
          onClick={() => {
            setMovies([]);
            setPage(page >= total ? 1 : page + 1);
          }}
        >
          <LazyLoadImage src={arrowright} alt='Icon' className='w-6' />
        </button>
      </header>
      <main className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 px-5'>
        {movies.length ? (
          movies.map((element, index) => {
            return <MovieCard key={index} redirect={`/home/movie/${element._id}`} index={index} image={element.image} title={element.title} />;
          })
        ) : (
          <div className=' flex items-center relative text-center w-full h-[300px] text-xl font-semibold'>Loading...</div>
        )}
      </main>
    </div>
  );
};

export default MovieList;
