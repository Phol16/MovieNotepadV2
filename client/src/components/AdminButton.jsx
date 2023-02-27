import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/localhost';

const AdminButton = (props) => {
  const [title, setTitle] = useState(props.title);
  const [year, setYear] = useState(props.year);
  const [genre, setGenre] = useState(props.genre);
  const [description, setDescription] = useState(props.description);
  const [imdbId, setImdbId] = useState(props.imdbId);
  const [image, setImage] = useState(props.image);
  const [edit, setEdit] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const navigate = useNavigate();
  const accessToken = localStorage.getItem('Token');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = { title, image, imdbId, description, genre: typeof genre === 'string' ? [...genre.split(' ')] : genre, year: typeof year === 'string' ? [...year.split(' ')] : year };
    try {
      const response = await fetch(`${api()}/movies?id=${props._id}`, {
        method: 'PATCH',
        cors: 'cors',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `bearer ${accessToken}`,
        },
        body: JSON.stringify(data),
      }).then((res) => res.json());

      console.log(response);
    } catch (error) {
      console.log(error.message);
    }
    setEdit(!edit);
    navigate(-1)
  };

  const handleDelete = async ()=>{
    try {
      const response = await fetch(`${api()}/movies?id=${props._id}`, {
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
    setDeleted(!deleted);
    navigate(-1)
  };

  return (
    <section className='flex flex-col gap-1'>
      {edit && (
        <main className=' bg-black p-2 rounded-md'>
          <h1 className='text-red-600 p-2 text-lg'>Update:</h1>
          <form onSubmit={handleSubmit} className='flex flex-col'>
            <label htmlFor='title' className='w-fit'>
              Title:
            </label>
            <input
              type='text'
              id='title'
              name='title'
              value={title}
              autoComplete='off'
              className='bg-slate-400 p-1 rounded-md placeholder:text-gray-500 '
              onChange={({ target: { value } }) => {
                setTitle(value);
              }}
            />
            <label htmlFor='year' className='w-fit'>
              Year:
            </label>
            <input
              type='text'
              id='year'
              name='year'
              value={year.join(' ')}
              autoComplete='off'
              className='bg-slate-400 p-1 rounded-md placeholder:text-gray-500'
              onChange={({ target: { value } }) => {
                setYear(value);
              }}
            />
            <label htmlFor='genre' className='w-fit'>
              Genre:
            </label>
            <input
              type='text'
              id='genre'
              name='genre'
              value={genre.join(' ')}
              autoComplete='off'
              className='bg-slate-400 p-1 rounded-md placeholder:text-gray-500'
              onChange={({ target: { value } }) => {
                setGenre(value);
              }}
            />
            <label htmlFor='description' className='w-fit'>
              Description:
            </label>
            <input
              type='text'
              id='description'
              value={description}
              name='description'
              autoComplete='off'
              className='bg-slate-400 p-1 rounded-md placeholder:text-gray-500'
              onChange={({ target: { value } }) => {
                setDescription(value);
              }}
            />
            <label htmlFor='imdbId' className='w-fit'>
              Imdb Id:
            </label>
            <input
              type='text'
              id='imdbId'
              value={imdbId}
              name='imdbId'
              autoComplete='off'
              className='bg-slate-400 p-1 rounded-md placeholder:text-gray-500'
              onChange={({ target: { value } }) => {
                setImdbId(value);
              }}
            />
            <label htmlFor='image' className='w-fit'>
              Poster:
            </label>
            <input
              type='text'
              id='image'
              value={image}
              name='image'
              autoComplete='off'
              className='bg-slate-400 p-1 rounded-md placeholder:text-gray-500'
              onChange={({ target: { value } }) => {
                setImage(value);
              }}
            />
            <button type='submit' className='bg-red-600 p-1 w-fit rounded-md text-white self-end my-2 hover:scale-110 transition-all duration-[150ms]'>
              Submit
            </button>
          </form>
        </main>
      )}
      {deleted && (
        <main className=' bg-black p-2 rounded-md'>
          <p>Are you sure you want to delete {props.title}?</p>
          <button className='p-2 rounded-lg text-white bg-red-600 hover:scale-110 text-xs md:text-sm mr-2' onClick={handleDelete}>
            Confirm
          </button>
          <button className='p-2 rounded-lg text-white bg-red-600 hover:scale-110 text-xs md:text-sm' onClick={()=>{
            setDeleted(!deleted)
          }}>Cancel</button>
        </main>
      )}
      <button
        onClick={() => {
          setEdit(!edit);
        }}
      >
        Edit
      </button>
      <button
      onClick={()=>{
        setDeleted(!deleted)
      }}>Delete</button>
    </section>
  );
};

export default AdminButton;
