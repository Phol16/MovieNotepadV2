import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api/localhost';

const WLMoviePage = () => {
  const [movie, setMovie] = useState(null);
  const { WLMovieID } = useParams();
  const accessToken = localStorage.getItem('Token');

  useEffect(() => {
    const fetchMovie = async () => {
      console.log(WLMovieID);
      try {
        const response = await fetch(`${api()}/watchList/movie/${WLMovieID}`, {
          method: 'GET',
          cors: 'cors',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `bearer ${accessToken}`,
          },
        }).then((res) => res.json());
        setMovie(response.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchMovie();
  }, []);

  const handleImdb = () => {
    window.open(`https://www.imdb.com/title/${movie.imdbId}`, '_blank');
  };

  console.log(movie);
  return (
    <>
      {movie ? (
        <div className='max-w-xl lg:max-w-2xl p-1 text-white'>
          <div className='grid grid-rows-2 lg:grid-cols-2 lg:grid-rows-none'>
            <img src={movie.movieId.image} alt='Poster' className='m-auto w-56 lg:w-80' />
            <main className='backdrop-blur-md bg-black/40 rounded-md p-4 self-center max-w-sm flex flex-col items-center gap-1'>
                <section>
                  <button className='bg-red-600 rounded-md text-white p-2 text-xs lg:text-sm'>Remove from WatchList</button>
                </section>
              <article className='flex items-center justify-between p-1 text-sm md:text-base w-full lg:text-lg'>
                <section className='flex gap-1'>
                  <h1 className='max-w-[150px]'>{movie.movieId.title}</h1>
                  {movie.movieId.year ? (
                    movie.movieId.year.map((event, index) => {
                      return (
                        <span key={event} className='text-red-600 self-center'>
                          {movie.movieId.year.length > 1 ? (index !== movie.movieId.year.length - 1 ? `${event}-` : event) : event}
                        </span>
                      );
                    })
                  ) : (
                    <div>Loading...</div>
                  )}
                </section>
                <button onClick={handleImdb} className='p-2 rounded-lg text-white bg-red-600 hover:scale-110 text-xs md:text-sm'>
                  Learn More
                </button>
              </article>
              <section className='flex justify-center gap-1 text-red-600 p-2'>
                {movie.movieId.genre ? (
                  movie.movieId.genre.map((event) => {
                    return <span key={event}>{event}</span>;
                  })
                ) : (
                  <div>Loading...</div>
                )}
              </section>
              <p className='text-sm'>{movie.movieId.description}</p>
            </main>
          </div>
        </div>
      ) : (
        <p className='text-white'>Loading...</p>
      )}
    </>
  );
};

export default WLMoviePage;
