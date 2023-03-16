import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/localhost';
import MovieCard from '../components/MovieCard';

const WatchListPage = () => {
  const [list, setList] = useState(null);
  const accessToken = useMemo(()=>{return localStorage.getItem('Token');})

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

  return (
      <main>
        {list ? (
          <div className='p-2 grid gap-5 grid-cols-2 md:grid-cols-3'>
            {list.map((details) => {
              return <MovieCard key={details._id} title={details.movieId.title} image={details.movieId.image} year={details.movieId.year} redirect={`/watchList/movie/${details._id}`} />;
            })}
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </main>
  );
};

export default WatchListPage;
