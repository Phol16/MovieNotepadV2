import { faArrowAltCircleLeft, faArrowAltCircleRight, faArrowLeft, faArrowLeftLong, faCircleArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import api from '../api/localhost';
import MovieCard from './MovieCard';

const FeaturedList = () => {
  const [featuredList, setFeaturedList] = useState([]);
  const [current, setCurrent] = useState(0);
  const [counter, setCounter] = useState(1);
  const [counter1, setCounter1] = useState(2);

  useEffect(() => {
    const fetchFeaturedList = async () => {
      const response = await fetch(`${api()}/movies/featured`, {
        method: 'get',
        cors: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
      }).then((res) => res.json());
      setFeaturedList(response.data);
    };
    fetchFeaturedList();
  }, []);

  const nextSlide = () => {
    setCurrent(current === featuredList.length - 1 ? 0 : current + 1);
    setCounter(counter === featuredList.length - 1 ? 0 : counter + 1);
    setCounter1(counter1 === featuredList.length - 1 ? 0 : counter1 + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? featuredList.length - 1 : current - 1);
    setCounter(counter === 0 ? featuredList.length - 1 : counter - 1);
    setCounter1(counter1 === 0 ? featuredList.length - 1 : counter1 - 1);
  };


  return (
    <div className='flex flex-col gap-2 min-w-screen'>
      <h1>Featured:</h1>
      <main className='flex gap-5 items-center'>
      <button onClick={prevSlide} className='text-white bg-transparent focus:outline-0'>
        <FontAwesomeIcon icon={faArrowAltCircleLeft} className='scale-125 hover:scale-150 transtion-all duration-[150ms]'/>
      </button>
      {featuredList.map((element, index) => {
        return (
          current === index && (
            <div className='flex gap-5' key={index}>
              <MovieCard title={element.title} image={element.image} year={element.year} />
              <section className='hidden md:inline'>
              <MovieCard title={featuredList[counter].title} image={featuredList[counter].image} year={featuredList[counter].year} />
              </section>
              <section className='hidden xl:inline'>
              <MovieCard title={featuredList[counter1].title} image={featuredList[counter1].image} year={featuredList[counter1].year} />
              </section>
            </div>
          )
        );
      })}
      <button onClick={nextSlide} className='text-white bg-transparent focus:outline-0'>
        <FontAwesomeIcon icon={faArrowAltCircleRight} className='scale-125 hover:scale-150 transtion-all duration-[150ms]'/>
      </button>
      </main>
    </div>
  );
};

export default FeaturedList;
