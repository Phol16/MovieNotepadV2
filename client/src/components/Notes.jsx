import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useRef, useState } from 'react';
import api from '../api/localhost';

const Notes = ({ movieId, added }) => {
  const [notes, setNotes] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [delInfo, setDelInfo] = useState(false);

  const accessToken = localStorage.getItem('Token');
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await fetch(`${api()}/notes?id=${movieId}`, {
          method: 'GET',
          cors: 'cors',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `bearer ${accessToken}`,
          },
        }).then((res) => res.json());
        response.status === 'failed' ? setError(response.message) : setNotes(response.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchNotes();
  }, [added,success]);

  const handleDelete = async(note)=>{
    try {
      const response = await fetch(`${api()}/notes?id=${note}`, {
        method: 'DELETE',
        cors: 'cors',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `bearer ${accessToken}`,
        },
      }).then((res) => res.json());
      setSuccess(!success)
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <div>
      {notes.length ? (
        <>
          <h1>Notes:</h1>
          <div className='grid grid-cols-2 lg:grid-cols-4 gap-1 p-2'>
            {notes.map((note) => {
              return (
                <div key={note._id}>
                  <section className='flex justify-end'>
                    <div className='relative px-3 flex flex-col'>
                      <p className={`absolute text-xs -top-3 ${delInfo === note._id ? 'flex' : 'hidden'} self-center`}>Delete</p>
                      <button
                        onMouseOut={() => {
                          setDelInfo(false);
                        }}
                        onMouseOver={() => {
                          setDelInfo(note._id);
                        }}
                        onClick={()=>{handleDelete(note._id)}}
                        className='bg-transparent text-white'
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </div>
                  </section>
                  <section className=' bg-white text-black h-32 p-2 rounded-md text-sm'>
                    <h1 className='border-b'>{note.title}</h1>
                    <p className='overflow-auto h-24'>{note.content}</p>
                  </section>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <p>{error}</p>
      )}
    </div>
  );
};

export default Notes;
