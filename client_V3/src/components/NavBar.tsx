import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from './Button';
import Profile from './Profile';
import logo from '../assets/logo.svg'

const NavBar = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState<boolean>(false);
  const Page = sessionStorage.getItem('Page');

  const handleHome = useCallback(() => {
    if(Page === 'signIn'){sessionStorage.removeItem('Page')}
    Page === 'Home' ? navigate('/home') : navigate('/');
  }, [Page]);

  const handleSignIn = useCallback(() => {
    sessionStorage.setItem('Page', 'signIn');
    navigate('/signIn');
  }, []);

  const handleProfile = useCallback(() => {
    setOpen(!open);
  }, [open]);

  return (
    <div className='px-10 py-5 flex items-center justify-between absolute top-0 w-full z-20 text-primaryText'>
      <button className='focus:outline-none' onClick={handleHome}>
        <h1 className='font-semibold text-xl p-2 textShadow flex justify-center items-center hover:-translate-y-1 transition-transform duration-200'>
          Movie <span className=' text-secondary'>Notepad</span>
          <img src={logo} alt='Icon' className='w-8'/>
        </h1>
      </button>
      {Page === 'Home' ? <Button Name={'Profile'} handleClick={handleProfile} /> : Page !== 'signIn' ? <Button Name={'Sign In'} handleClick={handleSignIn} /> : null}
      {open && (
        <div className='fixed top-0 left-0 w-[100vw] h-[100vh] bg-black/70 z-30'>
          <section
            className='absolute w-full h-full'
            onClick={() => {
              setOpen(false);
            }}
          ></section>
          <Profile />
        </div>
      )}
    </div>
  );
};

export default NavBar;
