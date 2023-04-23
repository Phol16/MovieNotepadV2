import React, { useCallback, useEffect, useRef, useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { API } from '../api/Api';
import { primText, subText, buttonText } from '../style/theme';
import arrowleft from '../assets/arrowLeft.svg';
import arrowright from '../assets/arrowRight.svg';
import { useNavigate } from 'react-router-dom';
import Loading from './Loading';
import { dataFetching } from '../utils/dataFetching';

interface featuredData {
  _id: string;
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
  const navigate = useNavigate();

  useEffect(() => {
    let catcher = true;
    const fetchFeatured = async () => {
      const response = new dataFetching('/movie/featured');
      const fetchedData = await response.getData();
      if (catcher) {
        setFeatured(fetchedData.data);
      }
    };
    fetchFeatured();

    return () => {
      catcher = false;
    };
  }, []);

  return (
    <main className='bg-black w-full h-full overflow-hidden text-primaryText relative flex '>
      {featured.length ? (
        featured.map((element, index) => {
          return current === index ? (
            <section key={index} className='w-full h-full relative'>
              <video
                onClick={() => {
                  setControls(!controls);
                }}
                controls={controls}
                playsInline
                autoPlay
                muted
                loop
                className=' w-full h-full object-contain object-top aspect-video'
                src={element.trailer}
                poster={element.image}
              />
              <header className='flex justify-between m-auto rounded-lg overflow-hidden  w-full sm:max-w-md lg:max-w-lg lg:absolute lg:bottom-[30%] lg:left-20'>
                <button
                  className={`${buttonText}`}
                  onClick={() => {
                    setCurrent(current === 0 ? featured.length - 1 : current - 1);
                  }}
                >
                  <LazyLoadImage src={arrowleft} alt='Icon' className='w-8' />
                </button>
                <section
                  onClick={() => {
                    navigate(`/home/movie/${element._id}`);
                  }}
                  className=' cursor-pointer flex flex-col gap-1 p-5 '
                >
                  <h1 className={`font-semibold text-secondary text-justify my-5 textShadow ${primText}`}>Featured</h1>
                  <h2 className={`w-full textShadow ${primText}`}>{element.title}</h2>
                  <h2 className={`textShadow ${subText}`}>{element.year.join(' ')}</h2>
                  <h2 className={` textShadow ${subText}`}>{element.genre.join(' ')}</h2>
                  <p className={`w-fit text-justify max-w-md textShadow ${subText}`}>{element.description}</p>
                </section>
                <button
                  className={buttonText}
                  onClick={() => {
                    setCurrent(current === featured.length - 1 ? 0 : current + 1);
                  }}
                >
                  <LazyLoadImage src={arrowright} alt='Icon' className='w-8' />
                </button>
              </header>
            </section>
          ) : null;
        })
      ) : (
        <Loading />
      )}
    </main>
  );
};

export default FeaturedMovie;
