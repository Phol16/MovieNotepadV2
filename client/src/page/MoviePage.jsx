import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api/localhost';
import AddWatchList from '../components/AddWatchList';
import AdminButton from '../components/AdminButton';

const MoviePage = () => {
  const [movie, setMovie] = useState([]);
  const [userInfo, setuserInfo] = useState([]);
  const { movieId } = useParams();
  const navigate = useNavigate();
  const accessToken = useMemo(()=>{return localStorage.getItem('Token');})

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await fetch(`${api()}/movies/movie?id=${movieId}`, {
          method: 'GET',
          cors: 'cors',
          headers: {
            'Content-Type': 'application/json',
          },
        }).then((res) => res.json());
        setMovie(response.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchMovie();
  }, []);

    useEffect(() => {
      const fetchuserInfo = async () => {
        try {
          const response = await fetch(`${api()}/users/userInfo`, {
            method: 'GET',
            cors: 'cors',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `bearer ${accessToken}`
            },
          }).then((res) => res.json());
          setuserInfo(response.data)
        } catch (error) {
          console.log(error.message);
        }
      };

    fetchuserInfo();
  }, []);

  const handleImdb = () => {
    window.open(`https://www.imdb.com/title/${movie.imdbId}`, '_blank');
  };

  return (
    <div className='max-w-xl lg:max-w-2xl p-1 m-auto'>
      <button
        onClick={() => {
          navigate(-1);
        }}
        className='p-1 rounded-lg text-white bg-red-600 hover:scale-110 mb-5 text-sm md:text-base '
      >
        Back
      </button>
      <div className='grid grid-rows-2 lg:grid-cols-2 lg:grid-rows-none'>
      <img src={movie.image} alt='Poster' className='m-auto w-56 lg:w-80'/>
      <main className='backdrop-blur-md bg-black/40 rounded-md p-4 self-center max-w-sm'>
        {userInfo._id === movie.authorId && userInfo.role === 'admin' ? (
          <AdminButton {...movie}/>
        ):userInfo.role === 'user'?(
          <AddWatchList movieId={movie._id}/>
        ):(null)
        }
        <article className='grid grid-cols-3 p-1 text-sm md:text-base'>
          <section className='flex flex-col col-span-2 gap-1'>
            <h1 className='max-w-[150px]'>{movie.title}</h1>
            <section>
            {movie.year ? (
              movie.year.map((event, index) => {
                return (
                  <span key={index} className='text-red-600 self-center'>
                    {movie.year.length > 1 ? (index !== movie.year.length - 1 ? `${event}-` : event) : event}
                  </span>
                );
              })
            ) : (
              <div>Loading...</div>
            )}
            </section>
          </section>
          <button onClick={handleImdb} className=' w-fit h-fit self-center p-2 rounded-lg text-white bg-red-600 hover:scale-110 text-xs md:text-sm'>
            Learn More
          </button>
        </article>
        <section className='flex justify-center gap-1 text-red-600 p-2'>
          {movie.genre ? (
            movie.genre.map((event) => {
              return <span key={event}>{event}</span>;
            })
          ) : (
            <div>Loading...</div>
          )}
        </section>
        <p className='text-sm'>{movie.description}</p>
      </main>
      </div>
    </div>
  );
};

export default MoviePage;
