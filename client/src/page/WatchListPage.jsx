import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/localhost';
import MovieCard from '../components/MovieCard';

const WatchListPage = () => {
  const [list, setList] = useState(null);
  const accessToken = localStorage.getItem('Token');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await fetch(`${api()}/watchList`, {
          method: 'GET',
          cors: 'cors',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `bearer ${accessToken}`,
          },
        }).then((res) => res.json());
        setList(response.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchMovie();
  }, []);

  console.log(list);
  return (
    <div className='flex flex-col items-center gap-2'>
      <button onClick={()=>{navigate(-1)} } className='p-1 rounded-lg text-white bg-red-600 hover:scale-110 mb-5 text-sm md:text-base w-fit self-start'>Back</button>
      <h1 className='text-2xl md:text-3xl'>Watch List</h1>
      <main>
        {list ? (
          <div className='p-2 grid gap-5 sm:grid-cols-2 md:grid-cols-3'>
            {list.map((details) => {
              return <MovieCard title={details.movieId.title} image={details.movieId.image} year={details.movieId.year} redirect={'#'} />;
            })}
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </main>
    </div>
  );
};

export default WatchListPage;
