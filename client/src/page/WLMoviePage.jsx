import React, { useEffect, useState, useMemo } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api/localhost';
import Notes from '../components/Notes';

const WLMoviePage = () => {
  const [movie, setMovie] = useState(null);
  const [remove, setRemove] = useState(false);
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [added, setAdded] = useState('');
  const { WLMovieID } = useParams();
  const accessToken = useMemo(()=>{return localStorage.getItem('Token');})
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovie = async () => {
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
    window.open(`https://www.imdb.com/title/${movie.movieId.imdbId}`, '_blank');
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`${api()}/watchList/movie/${WLMovieID}`, {
        method: 'DELETE',
        cors: 'cors',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `bearer ${accessToken}`,
        },
      }).then((res) => res.json());

      console.log(response);
    } catch (error) {
      console.log(error.message);
    }
    setRemove(!remove);
    navigate(-1);
  };


  const submitNote = async(event)=>{
    event.preventDefault()
    const data = {title, content, movieId: movie.movieId._id}
    
    try {
      const response = await fetch(`${api()}/notes/`,{
        method:'POST',
        cors:'cors',
        headers:{
          'Content-Type':'application/json',
          Authorization: `bearer ${accessToken}`
        },
        body: JSON.stringify(data)
      }).then((res)=>res.json())
      setAdded(Date.now())
      setOpen(!open)
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <>
      {movie ? (
        <div className='max-w-xl lg:max-w-2xl p-1 text-white'>
          <div className='grid lg:grid-cols-2'>
            <LazyLoadImage effect='blur' src={movie.movieId.image} alt='Poster' className='m-auto w-56 lg:w-80' />
            <main className='backdrop-blur-md bg-black/40 rounded-md p-4 self-center max-w-sm flex flex-col items-center gap-1'>
              {remove && (
                <section className=' bg-black p-2 rounded-md flex flex-col gap-2'>
                  <p>Are you sure you want to remove {movie.movieId.title}?</p>
                  <button className='p-2 rounded-lg text-white bg-red-600 hover:scale-110 text-xs md:text-sm mr-2' onClick={handleDelete}>
                    Confrim
                  </button>
                  <button
                    className='p-2 rounded-lg text-white bg-transparent hover:scale-110 text-xs md:text-sm'
                    onClick={() => {
                      setRemove(!remove);
                    }}
                  >
                    Cancel
                  </button>
                </section>
              )}
              <section className='flex flex-col gap-2'>
                <button className='bg-red-600 rounded-md text-white p-2 text-xs lg:text-sm' onClick={()=>{setOpen(!open)}}>
                  Add Notes
                </button>
                <button
                  className='bg-red-600 rounded-md text-white p-2 text-xs lg:text-sm'
                  onClick={() => {
                    setRemove(!remove);
                  }}
                >
                  Remove from WatchList
                </button>
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
              {open && 
              <main>
                <form action="" className='text-black flex flex-col'>
                  <input type="text" placeholder='Title' className='focus:outline-none p-1 w-full rounded-t-md' onChange={({target:{value}})=>{setTitle(value)}}/>
                  <textarea name="content" id="content" cols="30" rows="5" placeholder='Content' className='w-full focus:outline-none p-1 rounded-b-md'onChange={({target:{value}})=>{setContent(value)}}/>
                  <button type='submit' className='p-2 rounded-lg text-white bg-red-600 hover:scale-110 text-xs md:text-sm w-fit self-end m-2' onClick={submitNote}>Add</button>
                </form>
              </main>
              }
            </main>
            <section className='lg:col-span-2 p-1'>
            <Notes movieId={movie.movieId._id} added={added}/>
            </section>
          </div>
        </div>
      ) : (
        <p className='text-white'>Loading...</p>
      )}
    </>
  );
};

export default WLMoviePage;
