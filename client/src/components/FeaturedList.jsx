import { faArrowAltCircleLeft, faArrowAltCircleRight, faArrowLeft, faArrowLeftLong, faArrowRight, faCircleArrowLeft, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import api from '../api/localhost';
import { Cloudinary } from '@cloudinary/url-gen';
import style from './style/textShadow.module.css'

const FeaturedList = () => {
  const [featuredList, setFeaturedList] = useState(null);
  const [current, setCurrent] = useState(0);
  const [controls,setControls] = useState(false)

  const TextTitle = 'text-base md:text-xl'
  const TextSubMain = 'text-xs md:text-sm '
  const TextDesc = 'text-xs md:text-sm '
  const container= 'flex flex-col items-center'
  const mainContainer= 'relative flex gap-2 backdrop-blur-md max-w-sm md:max-w-lg lg:max-w-sm xl:max-w-lg rounded-lg overflow-hidden shadow-md shadow-black lg:absolute lg:left-[5%] lg:top-[20%]'
  const button = 'bg-black/20 text-white p-2 hover:scale-125'

  useEffect(() => {
    const fetchFeaturedList = async () => {
      const response = await fetch(`${api()}/movies/featured`, {
        method: 'get',
        cors: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
      }).then((res) => res.json());
      response.status === 'success' ? setFeaturedList(response.data) : setFeaturedList(response.message);
    };
    fetchFeaturedList();
  }, []);

  const nextSlide = () => {
    setCurrent(current === featuredList.length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? featuredList.length - 1 : current - 1);
  };

  const cld = new Cloudinary({
    cloud: {
      cloudName: 'df8nkgje6',
    },
  });
  return (
    <>
      <div className='relative top-0 min-w-full'>
        { featuredList ? ( featuredList.map((e, index)=>{ if(current === index) return (
        <section key={index} className={`${container}`}>
        <video controls={controls}  onClick={()=>{setControls(!controls)}} preload='none' poster={e.image} className={`relative top-0 w-full md:max-h-[810px] max-h-[400px] object-contain`} src={cld.video(e.video).toURL()} autoPlay loop muted />
        <main className={`${mainContainer}`}>
          <button onClick={prevSlide} className={`${button}`} >
            <FontAwesomeIcon icon={faArrowLeft}/>
          </button>
          <article className='flex flex-col gap-2 p-5'>
          <h1 className={`${TextSubMain} text-red-600`}>Featured</h1>
          <h1 className={`${style.textShadow} ${TextTitle}`}>{e.title}</h1>
          <h2 className={`${style.textShadow} ${TextSubMain}`}>{e.year}</h2>
          <h3 className={`${style.textShadow} ${TextSubMain}`}>{e.genre}</h3>
          <p className={`${style.textShadow} ${TextDesc}`}>{e.description}</p>
          <button className='w-fit p-1 rounded-lg self-end' onClick={()=>{window.open(`https://www.imdb.com/title/${e.imdbId}`, '_blank');}}>Learn More</button>
          </article>
          <button onClick={nextSlide} className={`${button}`}>
            <FontAwesomeIcon icon={faArrowRight}/>
          </button>
        </main>
        </section>
        )
        })
        ):<p>Loading...</p>
}
      </div>
    </>
  );
};

export default FeaturedList;
