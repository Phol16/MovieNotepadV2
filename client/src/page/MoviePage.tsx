import React, { useCallback, useEffect, useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { useNavigate, useParams } from 'react-router-dom';
import { primText, subText, primButton, primButtonDisable } from '../style/theme';
import logo from '../assets/logo.svg';
import home from '../assets/home.svg';
import { dataFetching } from '../utils/dataFetching';
import trash from '../assets/trash.svg';
import Button from '../components/Button';
import SecondaryButton from '../components/SecondaryButton';
import { toast } from 'react-toastify';

const MoviePage = () => {
  const [movie, setMovie] = useState<Record<string, any>>();
  const [disable, setDisable] = useState<boolean>(false);
  const [controls, setControls] = useState<boolean>(false);
  const [openDelete, setOpenDelete] = useState<boolean>(false);
  const [update, setUpdate] = useState<Date>();
  const { id } = useParams();
  const navigate = useNavigate();
  const user = sessionStorage.getItem('user');

  useEffect(() => {
    const fetchMovie = async () => {
      const response = new dataFetching(`/movie/${id}`);
      const fetchedData = await response.getData();
      if (fetchedData.message === 'success') {
        setMovie(fetchedData.data);
      }
    };
    fetchMovie();
  }, []);

  useEffect(() => {
    const getData = async () => {
      const response = new dataFetching(`/watchList/movie/${id}`);
      const fetchedData = await response.getData();
      if (fetchedData.message === 'success') {
        setDisable(true);
      }
    };
    getData();
  }, [update]);

  const handleImdb = () => {
    if (movie) {
      window.open(`https://www.imdb.com/title/${movie.imdbId}`, '_blank');
    }
  };

  const handleAdd = useCallback(() => {
    const AddData = async () => {
      const response = new dataFetching(`/watchList/${id}`, {}, `Bearer ${user}`);
      const fetchedData = await response.postData();
      if (fetchedData.message === 'success') {
        toast(`${movie?.title} is added to the watch list`)
        setUpdate(new Date(Date.now()));
      }
    };
    AddData();
  }, []);

  const handleDelete = () => {
    const fetchDelete = async () => {
      if (movie) {
        const response = new dataFetching(`/movie/${movie._id}`, {}, `bearer ${user}`);
        const fetchedData = await response.deleteData();
        if (fetchedData.message === 'delete success') {
          navigate('/home');
        }
      }
    };
    fetchDelete();
  };

  return (
    <div className='max-w-6xl m-auto pt-20 px-3'>
      {movie ? (
        <div className='flex flex-col gap-2'>
          <video
            onClick={() => {
              setControls(!controls);
            }}
            controls={controls}
            src={movie.trailer}
            poster={movie.image}
            autoPlay
            loop
            muted
            className=' aspect-video m-auto max-h-[650px] overflow-hidden'
          />
          <main className='flex flex-col gap-2 max-w-lg m-auto'>
            <header className='flex items-center'>
              <h1 className={`${primText} font-semibold text-secondary`}>{movie.title}</h1>
              <LazyLoadImage src={logo} alt='Icon' className={`w-8 h-8`} />
            </header>
            <article className='flex items-center justify-between'>
              <h1>
                / {movie.year} / {movie.genre.join(' ')}
              </h1>
              {movie.authorId?._id === user ? (
                <aside className='relative flex items-center z-20'>
                  {openDelete && (
                    <section className=' rounded-lg absolute -left-[200px] gap-3 w-48 p-2 text-sm bg-white max-w-sm flex flex-col '>
                      <h1 className='text-black'>Are you sure you want to delete {movie.title}?</h1>
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
                    title='Delete Movie'
                    onClick={() => {
                      setOpenDelete(!openDelete);
                    }}
                  >
                    <img src={trash} alt='Icon' className='w-8 h-8' />
                  </button>
                </aside>
              ) : null}
            </article>
            {disable ? (
 
              <button onClick={()=>{toast('Already in the watchlist')}} className={`${primButtonDisable} ${subText} w-full focus:outline-none `}>
                Movie in the WatchList
              </button>

            ) : (
              <button className={`${primButton} ${subText}`} onClick={handleAdd}>
                Add to WatchList
              </button>
            )}
            <button className={`${primButton} ${subText}`} onClick={handleImdb}>
              Learn More
            </button>
            <p className='max-w-md'>{movie.description}</p>
          </main>
        </div>
      ) : (
        <p className='text-center w-full h-full text-xl font-semibold py-20'>Loading...</p>
      )}
      <button
        className='fixed bottom-5 left-3 hover:scale-110 transition-transform duration-200'
        title='Home'
        onClick={() => {
          navigate('/home');
        }}
      >
        <LazyLoadImage src={home} alt='Icon' />
      </button>
    </div>
  );
};

export default MoviePage;
