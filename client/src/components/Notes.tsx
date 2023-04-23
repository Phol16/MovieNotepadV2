import React, { useCallback, useEffect, useState } from 'react';
import { primText } from '../style/theme';
import InfoNote from './InfoNote';
import { dataFetching } from '../utils/dataFetching';
import Button from './Button';
import trash from '../assets/trash.svg';

type props = {
  WLID: string;
};
const Notes = ({ WLID }: props) => {
  const [notes, setNotes] = useState<Record<string, any>[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [update, setUpdate] = useState<number>();
  const user = sessionStorage.getItem('user');

  useEffect(() => {
    const fetchNotes = async () => {
      const response = new dataFetching(`/notes?id=${WLID}`, {}, `Bearer ${user}`);
      const fetchedData = await response.getData();
      if (fetchedData.message === 'success') {
        setNotes(fetchedData.data);
      }else{setNotes([])}
    };
    fetchNotes();
  }, [update]);

  const handleSubmit = useCallback(() => {
    const sendData = async () => {
      try {
        const data = { title, content };

        const response = new dataFetching(`/notes?id=${WLID}`, data, `Bearer ${user}`);
        const fetchedData = await response.postData();
        if (fetchedData.message === 'success') {
          setUpdate(Date.now());
          setOpen(false)
        }
      } catch (error) {
        console.log(error);
      }
    };
    sendData();
  }, [title, content]);

  const handleDeleteNote = (id:string)=>{
    const sendData = async () => {
      try {
        const response = new dataFetching(`/notes?id=${id}`, {}, `Bearer ${user}`);
        const fetchedData = await response.deleteData();
        if (fetchedData.message === 'success') {
          setUpdate(Date.now());
        }
      } catch (error) {
        console.log(error);
      }
    };
    sendData();
  }

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
      <main className='overflow-auto m-auto max-w-md rounded-md h-[400px] bg-white p-3 gap-2 grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] auto-rows-max'>
        {notes.length ? (
          notes.map((element, index) => {
            return (
              <div key={index}>
                <InfoNote title={element.title} content={element.content} key={index} />
                <button title='Delete this Note' onClick={()=>{handleDeleteNote(element._id)}}>
                  <img src={trash} alt='Icon' className='w-8 h-8' />
                </button>
              </div>
            );
          })
        ) : (
          <p className='text-black font-semibold'>No Notes yet</p>
        )}
      </main>
      {open && (
        <section className='fixed flex items-center justify-center top-0 left-0 w-full h-full z-40'>
          <main
            className='fixed w-full h-full bg-black/50'
            onClick={() => {
              setOpen(false);
            }}
          ></main>
          <article className='relative self-center flex flex-col gap-3 h-fit w-fit bg-white text-black p-10 rounded-lg'>
            <h1 className='text-black'>Add Note:</h1>
            <form className='flex flex-col'>
              <input
                type='text'
                id='title'
                name='title'
                placeholder='Title'
                className='border border-b-0 p-1 outline-none'
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
              <textarea
                id='title'
                name='title'
                rows={5}
                placeholder='Add content here..'
                className='border border-t-0 p-1 outline-none'
                onChange={(e) => {
                  setContent(e.target.value);
                }}
              />
            </form>
            <Button Name={'Submit'} handleClick={handleSubmit} />
          </article>
        </section>
      )}
    </div>
  );
};

export default Notes;
