import React, { useEffect, useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { primText } from '../style/theme';
import MovieCard from '../components/MovieCard';
import { useNavigate } from 'react-router-dom';
import home from '../assets/home.svg';
import { dataFetching } from '../utils/dataFetching';

const WatchListPage = () => {
  const [WLData, setWLData] = useState<Record<string, any>[]>();
  const navigate = useNavigate();
  const user = sessionStorage.getItem('user');

  useEffect(() => {
    const fetchData = async () => {
      const response = new dataFetching(`/watchList/user`, {}, `Bearer ${user}`);
      const fetchedData = await response.getData();
      if (fetchedData.message === 'success') {
        setWLData(fetchedData.data);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <div className='py-20 flex flex-col items-center gap-2'>
        <h1 className={`${primText}`}>Watch List</h1>
        {WLData ? (
          <main className='max-w-5xl grid grid-cols-2 p-5 gap-5 lg:grid-cols-3 3xl:grid-cols-6'>
            {WLData.map((element, index) => {
              return <MovieCard key={element._id} index={index} title={element.movieId.title} image={element.movieId.image} redirect={`/home/watchList/movie/${element.movieId._id}`} />;
            })}
          </main>
        ) : (
          <p className='font-medium text-lg text-center'>No Movies Added to Watch List</p>
        )}
      </div>
      <button
        className='fixed bottom-5 left-3 hover:scale-110 transition-transform duration-200'
        title='Home'
        onClick={() => {
          navigate('/home');
        }}
      >
        <LazyLoadImage src={home} alt='Icon' />
      </button>
    </>
  );
};

export default WatchListPage;
