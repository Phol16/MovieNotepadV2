import React, { useCallback, useEffect, useRef, useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { API } from '../api/Api';
import { primText, subText, buttonText } from '../style/theme';
import arrowleft from '../assets/arrowLeft.svg'
import arrowright from '../assets/arrowRight.svg'
import { useNavigate } from 'react-router-dom';
import Loading from './Loading';

interface featuredData {
  _id:string,
  title: string;
  description: string;
  year: string[];
  genre: string[];
  trailer: string;
  image: string;
  imdbId: string;
}

const FeaturedMovie = () => {
  const [featured, setFeatured] = useState<featuredData[]>([]);
  const [current, setCurrent] = useState<number>(0);
  const [controls, setControls] = useState<boolean>(false);
  const navigate = useNavigate()

  useEffect(() => {
    let catcher = true
    const fetchFeatured = async () => {
      const response = await fetch(`${API}/movie/featured`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      }).then((res) => res.json());
      if(catcher){
      setFeatured(response.data);
      }
    };
    fetchFeatured();

    return ()=>{
      catcher = false
    }
  }, []);

  return (
    <main className='bg-black w-full h-full overflow-hidden text-primaryText relative flex '>
      {featured.length ? (
        featured.map((element, index) => {
          return current === index ? (
            <section key={index} className='w-full h-full relative'>
              <video onClick={()=>{setControls(!controls)}} controls={controls} playsInline autoPlay muted loop className=' w-full h-full object-contain object-top aspect-video' src={element.trailer} poster={element.image} />
              <header className='flex justify-between m-auto bg-black/70 rounded-lg overflow-hidden backdrop-blur-sm w-full sm:max-w-md lg:max-w-lg lg:absolute lg:bottom-[20%] lg:left-20'>
                <button className={`${buttonText}`} onClick={
                  ()=>{ setCurrent(current === 0 ? featured.length-1 : current-1)}
                }><LazyLoadImage src={arrowleft} alt='Icon' className='w-8'/></button>
                <section onClick={()=>{navigate(`/home/movie/${element._id}`)}} className=' cursor-pointer flex flex-col gap-1 p-5 text-center'>
                  <h1 className={`font-semibold text-secondary text-justify my-5 ${primText}`}>Featured</h1>
                  <h2 className={`w-full ${primText}`}>{element.title}</h2>
                  <h2 className={`${subText}`}>{element.year.join(' ')}</h2>
                  <h2 className={`${subText}`}>{element.genre.join(' ')}</h2>
                  <p className={`w-fit text-justify max-w-xs ${subText}`}>{element.description}</p>
                </section>
                <button className={buttonText} onClick={()=>{
                  setCurrent(current === featured.length-1 ? 0 : current+1)
                }}><LazyLoadImage src={arrowright} alt='Icon' className='w-8'/></button>
              </header>
            </section>
          ) : null;
        })
      ) : (
        <Loading/>
      )}
    </main>
  );
};

export default FeaturedMovie;
