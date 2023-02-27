import { faUser, faUserAlt, faUserAltSlash, faUserAstronaut, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/localhost';

const ProfileTab = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const accessToken = localStorage.getItem('Token');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`${api()}/users/userInfo`, {
          method: 'GET',
          cors: 'cors',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `bearer ${accessToken}`,
          },
        }).then((res) => res.json());

        setUserInfo(response.data);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchUser();
  }, []);
  console.log(userInfo);

  const handleLogOut = () => {
    localStorage.removeItem('Token');
    navigate('/');
  };
  return (
    <div>
      {userInfo ? (
        <main>
          <section>
            <button className='flex justify-center items-center gap-1 bg-transparent text-white focus:outline-none hover:scale-110 transition-all' onClick={()=>{setOpen(!open)}}>
              <FontAwesomeIcon icon={faUserAlt} />
              <p>{userInfo.role[0].toUpperCase() + userInfo.role.substring(1)}</p>
            </button>
          </section>
          {open && (
            <section className='absolute mt-8 p-2 bg-white w-[150px] right-4 rounded-md text-black flex flex-col gap-1'>
              <h1 className='text-red-600 text-lg'>Profile</h1>
              <p>Name: {userInfo.firstName[0].toUpperCase()+userInfo.firstName.substring(1)} <span>{userInfo.lastName}</span></p>
              <p>Role: {userInfo.role[0].toUpperCase() + userInfo.role.substring(1)}</p>
              <button onClick={handleLogOut} className='p-1 rounded-md bg-red-600 text-white'>
                Log Out
              </button>
            </section>
          )}
        </main>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default ProfileTab;
