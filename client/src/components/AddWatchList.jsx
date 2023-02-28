import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import api from '../api/localhost';

const AddWatchList = ({ movieId }) => {
  const [added, setAdded] = useState(false);
  const accessToken = localStorage.getItem('Token');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${api()}/watchList/movie?id=${movieId}`, {
          method: 'GET',
          cors: 'cors',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `bearer ${accessToken}`,
          },
        }).then((res) => res.json());
        console.log(response);
        response.status === 'success' ? setAdded(true) : setAdded(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [movieId, added]);

  const handleAddWL = async () => {
    const data = { movieId };

    try {
      const response = await fetch(`${api()}/watchList/`, {
        method: 'POST',
        cors: 'cors',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `bearer ${accessToken}`,
        },
        body: JSON.stringify(data),
      }).then((res) => res.json());
      console.log(response);
      response.status === 'success' ? setAdded(true) : setAdded(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      {movieId ? (
        <div className='flex justify-center'>
          {added ? (
            <button className='bg-transparent text-white text-2xl md:text-3xl hover:scale-110 transition-all flex justify-center items-center gap-1' disabled>
              <p className='text-sm '>
                Movie in <span className='text-red-600'>WatchList</span>
              </p>
            </button>
          ) : (
            <button className='bg-transparent text-white text-2xl md:text-3xl hover:scale-110 transition-all flex justify-center items-center gap-1' onClick={handleAddWL}>
              <FontAwesomeIcon icon={faPlusCircle} />
              <p className='text-sm '>
                Add to <span className='text-red-600'>WatchList</span>
              </p>
            </button>
          )}
        </div>
      ) : null}
    </>
  );
};

export default AddWatchList;
