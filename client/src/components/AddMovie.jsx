import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useMemo } from 'react';
import api from '../api/localhost';

const AddMovie = ({ listen }) => {
  const [title, setTitle] = useState('');
  const [year, setYear] = useState('');
  const [genre, setGenre] = useState('');
  const [description, setDescription] = useState('');
  const [imdbId, setImdbId] = useState('');
  const [image, setImage] = useState('');
  const [open, setOpen] = useState(false);
  const accessToken = useMemo(() => {
    return localStorage.getItem('Token');
  });

  const handleImage = (e) => {
    const file = e.target.files[0];

    convertFile(file);
  };

  const convertFile = (file) => {
    const reader = new FileReader();

    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setImage(reader.result);
      };
    } else {
      setImage('');
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = { title, image, imdbId, description, genre: [...genre.split(' ')], year: [...year.split(' ')] };

    try {
      const response = await fetch(`${api()}/movies`, {
        method: 'POST',
        cors: 'cors',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `bearer ${accessToken}`,
        },
        body: JSON.stringify(data),
      }).then((res) => res.json());
      response.status === 'success' ? setImage('') : setImage(image)
    } catch (error) {
      console.log(error.message, 'here');
    }
    listen(new Date(Date.now()).toLocaleString());
    setOpen(!open);
  };

  return (
    <div className='flex flex-col gap-1 '>
      {open && (
        <section className={`bg-white text-black p-4 rounded-md text-sm 2xl:text-lg flex flex-col gap-2 max-w-[280px] max-h-[500px] 2xl:max-h-[600px] overflow-auto`}>
          <h1 className='text-lg text-red-600'>Details:</h1>
          <form onSubmit={handleSubmit} className='flex flex-col'>
            <label htmlFor='title'>Title:</label>
            <input
              type='text'
              id='title'
              name='title'
              placeholder='Title'
              autoComplete='off'
              className='bg-slate-400 p-1 rounded-md placeholder:text-gray-500 '
              onChange={({ target: { value } }) => {
                setTitle(value);
              }}
            />
            <label htmlFor='year'>Year:</label>
            <input
              type='text'
              id='year'
              name='year'
              placeholder='Year'
              autoComplete='off'
              className='bg-slate-400 p-1 rounded-md placeholder:text-gray-500'
              onChange={({ target: { value } }) => {
                setYear(value);
              }}
            />
            <label htmlFor='genre'>Genre:</label>
            <input
              type='text'
              id='genre'
              name='genre'
              placeholder='Genre'
              autoComplete='off'
              className='bg-slate-400 p-1 rounded-md placeholder:text-gray-500'
              onChange={({ target: { value } }) => {
                setGenre(value);
              }}
            />
            <label htmlFor='description'>Description:</label>
            <input
              type='text'
              id='description'
              placeholder='Description'
              name='description'
              autoComplete='off'
              className='bg-slate-400 p-1 rounded-md placeholder:text-gray-500'
              onChange={({ target: { value } }) => {
                setDescription(value);
              }}
            />
            <label htmlFor='imdbId'>Imdb Id:</label>
            <input
              type='text'
              id='imdbId'
              placeholder='Imdb Id'
              name='imdbId'
              autoComplete='off'
              className='bg-slate-400 p-1 rounded-md placeholder:text-gray-500'
              onChange={({ target: { value } }) => {
                setImdbId(value);
              }}
            />
            <label htmlFor='image'>Poster:</label>
            {image ? <img src={image} alt='Photo' /> : <p>No Image Uploaded</p>}
            <label htmlFor='image'>
              <p className='mt-2 bg-black/80 hover:-translate-y-0.5 w-fit text-white p-1 rounded-md cursor-pointer'>Upload Image</p>
            </label>
            <input className='hidden' type='file' id='image' accept='image/*' name='image' onChange={handleImage} />
            <section className='self-end flex gap-2 my-2'>
              <button
                className='p-1'
                type='button'
                onClick={() => {
                  setOpen(!open);
                }}
              >
                Cancel
              </button>
              <button type='submit' className='bg-red-600 p-1 w-fit rounded-md text-white hover:scale-110 transition-all duration-[150ms]'>
                Submit
              </button>
            </section>
          </form>
        </section>
      )}
      <main>
        <button
          className='bg-red-900 text-3xl transition-all hover:scale-110 duration-[300ms] w-fit focus:outline-none flex items-center rounded-lg p-1 border '
          onClick={() => {
            setOpen(!open);
          }}
        >
          <FontAwesomeIcon icon={faPlusCircle} className='text-white drop-shadow-md text-sm' />
          <p className='text-white text-xs drop-shadow-md backdrop-blur-md bg-black/30 md:backdrop-blur-none md:bg-transparent p-1 rounded-md'>Add A Movie</p>
        </button>
      </main>
    </div>
  );
};

export default AddMovie;
