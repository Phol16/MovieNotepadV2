import React, { useEffect, useState } from 'react';
import { API } from '../api/Api';
import { useNavigate, useParams } from 'react-router-dom';
import { primText, subText } from '../style/theme';
import logo from '../assets/logo.svg';
import home from '../assets/home.svg';

const primButton = 'bg-red-600 text-white p-2 rounded-lg';
const MoviePage = () => {
  const [movie, setMovie] = useState<Record<string, any>>();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovie = async () => {
      const response = await fetch(`${API}/movie/${id}`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      }).then((res) => res.json());
      setMovie(response.data);
    };
    fetchMovie();
  }, []);

  const handleImdb = () => {
    if (movie) {
      window.open(`https://www.imdb.com/title/${movie.imdbId}`, '_blank');
    }
  };

  return (
    <div className='max-w-6xl m-auto pt-20'>
      {movie ? (
        <div className='flex flex-col gap-2'>
          <video src={movie.trailer} poster={movie.image} autoPlay loop muted className=' aspect-video m-auto max-h-[650px] overflow-hidden' />
          <main className='flex flex-col gap-2 max-w-lg m-auto'>
            <header className='flex items-center'>
              <h1 className={`${primText} font-semibold text-secondary`}>{movie.title}</h1>
              <img src={logo} alt='Icon' className={`w-8 h-8`} />
            </header>
            <h2>
              / {movie.year} / {movie.genre.join(' ')}
            </h2>
            <button className={`${primButton} ${subText}`}>Add to WatchList</button>
            <button className={`${primButton} ${subText}`} onClick={handleImdb}>
              Learn More
            </button>
            <p className='max-w-md'>{movie.description}</p>
          </main>
        </div>
      ) : (
        <p className='text-center w-full h-full text-xl font-semibold py-20'>Loading...</p>
      )}
      <button className='fixed bottom-5 left-3 hover:scale-110 transition-transform duration-200' title='Home' onClick={()=>{navigate('/home')}}>
        <img src={home} alt='Icon' />
      </button>
    </div>
  );
};

export default MoviePage;