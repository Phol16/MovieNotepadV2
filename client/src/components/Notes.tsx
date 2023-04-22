import React, { useEffect, useState } from 'react';
import { primText } from '../style/theme';
import InfoNote from './InfoNote';
import { dataFetching } from '../utils/dataFetching';
import Button from './Button';

const Notes = () => {
  const [notes, setNotes] = useState<Record<string, any>[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const user = sessionStorage.getItem('user');

  useEffect(() => {
    const fetchNotes = async () => {
      const response = new dataFetching('/notes', {}, `Bearer ${user}`);
      const fetchedData = await response.getData();
      if (fetchedData.message === 'success') {
        setNotes(fetchedData.data);
      }
    };
    fetchNotes();
  }, []);

  return (
    <div>
      <section className='flex items-center justify-between p-2'>
        <h1 className={`${primText}`}>Notes</h1>
        <button
          onClick={() => {
            setOpen(true);
          }}
        >
          Add Notes
        </button>
      </section>
      <main className='overflow-auto m-auto max-w-md h-[400px] bg-white p-3 gap-2 grid grid-cols-3 auto-rows-max'>
        {notes.length ? (
          notes.map((element, index) => {
            return <InfoNote title={element.title} content={element.content} key={index} />;
          })
        ) : (
          <p className='text-black font-semibold'>No Notes yet</p>
        )}
      </main>
      {open && 
      <section className='fixed flex items-center justify-center top-0 left-0 w-full h-full z-40'>
        <main className='fixed w-full h-full bg-black/50' onClick={()=>{setOpen(false)}}></main>
        <article className='relative self-center flex flex-col gap-3 h-fit w-fit bg-white text-black p-10 rounded-lg'>
          <h1 className='text-black'>Add Note:</h1>
          <form className='flex flex-col'>
            <input type="text" id='title' name='title' placeholder='Title' className='border border-b-0 p-1 outline-none'/>
            <textarea id='title' name='title' rows={5} placeholder='Add content here..' className='border border-t-0 p-1 outline-none'/>
          </form>
          <Button Name={'Submit'} handleClick={()=>{}}/>
        </article>
      </section>}
    </div>
  );
};

export default Notes;
