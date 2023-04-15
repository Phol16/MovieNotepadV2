import React, { useCallback, useEffect, useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { useNavigate } from 'react-router-dom';
import { API } from '../api/Api';
import Button from './Button';
import profile from '../assets/profile.svg';
import editIcon from '../assets/editIcon.svg';

interface redirects {
  name: string;
  redirect: string;
}

interface userInfo {
  username: string;
  image: string;
  role: string;
}

const Redirects: redirects[] = [
  {
    name: 'Watch List',
    redirect: '/home/watchList',
  },
  {
    name: 'About',
    redirect: '/home/about',
  },
  {
    name: 'Delete Account',
    redirect: '#',
  },
];

const Profile = () => {
  const [user, setUser] = useState<userInfo>();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch(`${API}/users/userDetail`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      }).then((res) => res.json());
      setUser(response.data);
    };

    fetchUser();
  }, []);

  const handleRedirect = (element: string) => {
    navigate(element);
  };

  const handleLogout = () => {
    const fetchLogout = async () => {
      await fetch(`${API}/auth/logOut`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      }).then((res) => {
        res.json();
      });
    };
    fetchLogout();
    sessionStorage.removeItem('Page')
    document.cookie = `role=; expires=${Date.now()}`
    navigate('/');
  };

  return (
    <div className='bg-white relative flex flex-col justify-between w-[70%] h-full left-[30%] md:w-[40%] md:left-[60%] xl:w-[20%] xl:left-[80%]'>
      <header className='bg-black p-5'>
        {user ? (
          <main className='flex flex-col items-center gap-2'>
            <div className='rounded-[50%] w-40 h-40 border-2 border-secondary overflow-hidden'>
            <LazyLoadImage src={user.image !== 'No Image' ? user.image : profile} alt='Photo' className=' object-cover object-center h-full w-full' />
            </div>
            <section className='flex gap-2'>
              <h1>{user.username}</h1>
              <button className='focus:outline-none hover:-translate-y-[2px] w-fit' title='Update Profile'><LazyLoadImage src={editIcon} alt="Icon" className='w-4 h-fit'/></button>
            </section>
          </main>
        ) : (
          <p className='text-center w-full h-full text-xl font-semibold py-20'>Loading...</p>
        )}
      </header>
      <main className='flex flex-col text-black gap-2'>
        {Redirects.map((element, index) => {
          return (
            <button
              key={index}
              onClick={useCallback(() => {
                handleRedirect(element.redirect);
              }, [])}
              className={`bg-gray-200 py-4 font-semibold hover:bg-gray-600 hover:text-white ${index === Redirects.length - 1 ? 'opacity-60' : 'placeholder-opacity-100 transition-colors duration-500'}`}
            >
              {element.name}
            </button>
          );
        })}
      </main>
      <footer className='p-10 self-center'>
        <Button
          Name={'Log out'}
          handleClick={useCallback(() => {
            handleLogout();
          }, [])}
        />
      </footer>
    </div>
  );
};

export default Profile;
