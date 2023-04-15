import React, { useCallback, useEffect, useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { useNavigate, useParams } from 'react-router-dom';
import { primButton, primText, subText } from '../style/theme';
import logo from '../assets/logo.svg';
import home from '../assets/home.svg';
import trash from '../assets/trash.svg';
import Button from '../components/Button';
import SecondaryButton from '../components/SecondaryButton';
import Notes from '../components/Notes';
import { dataFetching } from '../utils/dataFetching';

const MovieWLPage = () => {
  const [movie, setMovie] = useState<Record<string, any>>();
  const [openDelete, setOpenDelete] = useState<boolean>(false);
  const user = sessionStorage.getItem('user');
  const navigate = useNavigate();
  const { WL } = useParams();

  useEffect(() => {
    const fetchMovie = async () => {
      const response = new dataFetching(`/watchList/movie/${WL}`);
      const fetchedData = await response.getData();
      if (fetchedData.message === 'success') {
        setMovie(fetchedData.data);
      }
    };
    fetchMovie();
  }, []);

  const handleImdb = () => {
    if (movie) {
      window.open(`https://www.imdb.com/title/${movie.movieId.imdbId}`, '_blank');
    }
  };

  const handleDelete = () => {
    const fetchDelete = async () => {
      if (movie) {
        const response = new dataFetching(`/watchList/movie/${movie._id}`, {}, `bearer ${user}`);
        const fetchedData = await response.deleteData();
        if (fetchedData.message === 'delete success') {
          navigate('/home/watchList');
        }
      }
    };
    fetchDelete();
  };

  return (
    <div className='max-w-6xl m-auto pt-20 px-3'>
      {movie ? (
        <div className='flex flex-col gap-2'>
          <video src={movie.movieId.trailer} poster={movie.movieId.image} autoPlay loop muted className=' aspect-video m-auto max-h-[650px] overflow-hidden' />
          <main className='flex flex-col gap-2 max-w-lg m-auto'>
            <header className='flex items-center'>
              <h1 className={`${primText} font-semibold text-secondary`}>{movie.movieId.title}</h1>
              <LazyLoadImage src={logo} alt='Icon' className={`w-8 h-8`} />
            </header>
            <section className='flex items-center justify-between'>
              <h2>
                / {movie.movieId.year} / {movie.movieId.genre.join(' ')}
              </h2>
              <aside className='relative flex items-center'>
                {openDelete && (
                  <section className=' rounded-lg absolute -left-[200px] gap-3 w-48 p-2 text-sm bg-white max-w-sm flex flex-col '>
                    <h1 className='text-black'>Are you sure you want to delete {movie.movieId.title}?</h1>
                    <Button Name={'Confirm'} handleClick={handleDelete} />
                    <SecondaryButton
                      Name={'Cancel'}
                      handleClick={() => {
                        setOpenDelete(false);
                      }}
                    />
                  </section>
                )}
                <button
                  title='delete'
                  onClick={() => {
                    setOpenDelete(!openDelete);
                  }}
                >
                  <img src={trash} alt='Icon' className='w-8 h-8' />
                </button>
              </aside>
            </section>
            <button className={`${primButton} ${subText}`} onClick={handleImdb}>
              Learn More
            </button>
            <p className='max-w-md'>{movie.movieId.description}</p>
            <Notes />
          </main>
        </div>
      ) : (
        <p className='text-center w-full h-full text-xl font-semibold py-20'>Loading...</p>
      )}
      <button
        className='fixed bottom-5 left-3 hover:scale-110 transition-transform duration-200'
        title='Home'
        onClick={() => {
          navigate('/home/watchList');
        }}
      >
        <LazyLoadImage src={home} alt='Icon' />
      </button>
    </div>
  );
};

export default MovieWLPage;
