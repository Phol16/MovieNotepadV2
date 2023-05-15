import React, { useCallback, useEffect, useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import Button from './Button';
import SubmitButton from './SubmitButton';
import { dataFetching } from '../utils/dataFetching';

const AdminButton = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [image, setImage] = useState<string>('');
  const [imdbId, setImdbId] = useState<string>('');
  const [year, setYear] = useState<string[]>([]);
  const [genre, setGenre] = useState<string[]>([]);
  const [role, setRole] = useState<string>('');

  const labelDesign = 'flex flex-col gap-1';

  useEffect(() => {
    // const cookie = document.cookie.split('=')
    // let index = 0;
    // cookie.map((e,i)=>{
    //   if(e === 'role'){
    //     setRole(cookie[i+1])
    //   }
    // })
    setRole(document.cookie)
  }, [document.cookie]);

  const handleAdd = () => {
    setOpen(true);
  };

  const handleChangeImage = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      const reader = new FileReader();

      if (file) {
        reader.readAsDataURL(file);
        reader.onload = () => {
          if (typeof reader.result === 'string') setImage(reader.result);
        };
      }
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const movieInfo = { title, image, description, imdbId, year, genre };
    try {
      const response = new dataFetching(`/movie/registerMovie`, movieInfo);
      const fetchedData = await response.postData();
      if (fetchedData.message === 'success') {
        setImage('');
        setOpen(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {role.includes('role=Admin') && (
        <div className='fixed bottom-5 left-5 z-10'>
          {
            <Button
              Name={'Add Movie'}
              handleClick={() => {
                handleAdd();
              }}
            />
          }
        </div>
      )}
      {open && (
        <main className='bg-black/50 w-full h-full fixed top-0 z-20'>
          <section
            className='absolute w-full h-full'
            onClick={() => {
              setOpen(false);
            }}
          ></section>
          <section className='overflow-auto relative bg-white w-[80%] sm:w-[60%] lg:w-[30%]  h-full text-black flex flex-col items-center py-5'>
            <h1 className='font-semibold text-xl p-2 textShadow h-fit flex-1'>
              Movie <span className=' text-secondary'>Notepad</span>
            </h1>
            <form onSubmit={handleSubmit} className='flex flex-col gap-3 justify-center flex-[25] text-base sm:text-lg '>
              <label htmlFor='title' className={`${labelDesign}`}>
                Title:
                <input
                  type='text'
                  name='title'
                  id='title'
                  placeholder='Title'
                  className='border p-1'
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setTitle(e.target.value);
                  }}
                />
              </label>
              <label htmlFor='description' className={`${labelDesign}`}>
                Description:
                <textarea
                  id='description'
                  rows={4}
                  name='description'
                  placeholder='Text here'
                  className='border p-1'
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                />
              </label>
              <label htmlFor='imdbId' className={`${labelDesign}`}>
                ImdbId:
                <input
                  type='imdbId'
                  name='imdbId'
                  id='imdbId'
                  placeholder='ImdbId'
                  className='border p-1'
                  onChange={(e) => {
                    setImdbId(e.target.value);
                  }}
                />
              </label>
              <label htmlFor='year' className={`${labelDesign}`}>
                Year:
                <input
                  type='year'
                  name='year'
                  id='genre'
                  placeholder='Year'
                  className='border p-1'
                  onChange={(e) => {
                    const year = e.target.value.split(' ');
                    setYear(year);
                  }}
                />
              </label>
              <label htmlFor='genre' className={`${labelDesign}`}>
                Genre:
                <input
                  type='genre'
                  name='genre'
                  id='genre'
                  placeholder='Genre'
                  className='border p-1'
                  onChange={(e) => {
                    const genre = e.target.value.split(' ');
                    setGenre(genre);
                  }}
                />
              </label>
              <label htmlFor='poster' className={`${labelDesign}`}>
                Poster:
                {image && <LazyLoadImage src={image} alt='Image' className='max-w-[150px] self-center' />}
                <label htmlFor='poster' className=' cursor-pointer border text-center p-1 rounded-lg bg-gray-100 hover:bg-gray-500 hover:text-white'>
                  Upload A Poster
                </label>
                <input type='file' accept='image/*' name='poster' id='poster' className='hidden' onChange={handleChangeImage} />
              </label>
              <SubmitButton Name={'Submit'} />
            </form>
          </section>
        </main>
      )}
    </>
  );
};

export default AdminButton;
