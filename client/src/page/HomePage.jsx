import React, { useEffect, useState, useMemo } from 'react';
import AddMovie from '../components/AddMovie';
import FeaturedList from '../components/FeaturedList';
import MoviesList from '../components/MoviesList';
import api from '../api/localhost';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';

const HomePage = () => {
  const [userRole, setUserRole] = useState(null);
  const [update, setUpdate] = useState('up');
  const accessToken = useMemo(()=>{return localStorage.getItem('Token');})

  useEffect(() => {
    try {
      const fetchUser = async () => {
        const response = await fetch(`${api()}/users/userInfo`, {
          method: 'GET',
          cors: 'cors',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `bearer ${accessToken}`,
          },
        }).then((res) => res.json());
        setUserRole(response.data.role);
      };
      fetchUser();
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  const handleUpdate = (e) => {
    setUpdate(e);
  };

  return (
    <div className='flex flex-col items-center bg-black'>
      <FeaturedList />
      <MoviesList update={update} />
      <section className='fixed bottom-2 left-2 z-20'>
        {userRole ? (
          userRole === 'admin' ? (
            <AddMovie listen={handleUpdate} />
          ) : (
            <Link to={'/watchList'}>
              <button className='bg-black/70 text-3xl transition-all hover:scale-110 duration-[300ms] w-fit focus:outline-none flex items-center rounded-lg p-1 border '>
                <FontAwesomeIcon icon={faEye} className='text-white drop-shadow-md text-sm' />
                <p className='text-white text-xs drop-shadow-md backdrop-blur-md bg-black/30 md:backdrop-blur-none md:bg-transparent p-1 rounded-md'>Watch List</p>
              </button>
            </Link>
          )
        ) : (
          <p>Loading...</p>
        )}
      </section>
    </div>
  );
};

export default HomePage;
