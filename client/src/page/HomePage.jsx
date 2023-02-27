import React, { useEffect, useState } from 'react';
import AddMovie from '../components/AddMovie';
import FeaturedList from '../components/FeaturedList';
import MoviesList from '../components/MoviesList';
import api from '../api/localhost';

const HomePage = () => {
  const [userRole, setUserRole] = useState(null);
  const [update, setUpdate] = useState('up');
  const accessToken = localStorage.getItem('Token');

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

  const handleUpdate = (e)=>{
    setUpdate(e)
  }

  return (
    <div className='flex flex-col items-center'>
      <FeaturedList />
      <MoviesList update={update}/>
      <section className='fixed bottom-5 left-5'>{userRole ? userRole === 'admin' ? <AddMovie listen={handleUpdate}/> : <p>watchlist</p> : <p>Loading...</p>}</section>
    </div>
  );
};

export default HomePage;
