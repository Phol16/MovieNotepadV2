import React, { useEffect, useState } from 'react';
import api from '../api/localhost';

const Notes = ({ movieId, added }) => {
  const [notes, setNotes] = useState([]);
  const [error, setError] = useState(null);
  const accessToken = localStorage.getItem('Token');
  console.log(added);
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
        console.log(response);
        response.status === 'failed' ? setError(response.message) : setNotes(response.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchNotes();
  }, [added]);

  return (
    <div>
      {notes.length ? (
        <>
          <h1>Notes:</h1>
          <div className='grid grid-cols-2 lg:grid-cols-4 gap-1 p-2'>
            {notes.map((note) => {
              return (
                <div key={note._id} className=''>
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
