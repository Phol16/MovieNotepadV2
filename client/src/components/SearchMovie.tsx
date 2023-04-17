import React, { useCallback, useEffect, useRef, useState } from 'react';
import { dataFetching } from '../utils/dataFetching';
import Loading from './Loading';
import searchIcon from '../assets/searchIcon.svg';
import upIcon from '../assets/arrowUp.svg';
import downIcon from '../assets/arrowDown.svg';
import { useNavigate } from 'react-router-dom';

const SearchMovie = () => {
  const [list, setList] = useState<Record<string, any>[]>([]);
  const [search, setSearch] = useState<string>('');
  const [active, setActive] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchList = async () => {
      const response = new dataFetching(`/movie/movies`);
      const fetchedData = await response.getData();
      setList(fetchedData.data);
    };
    fetchList();
  }, []);

  const handleClick = () => {
    console.log();
    list.map((e, i) => {
      if (e.title.toLowerCase() === search?.toLowerCase()) {
        navigate(`/home/movie/${e._id}`);
      }
    });
  };
  return (
    <div className='text-sm relative '>
      <fieldset className='outline-white flex items-center gap-2'>
        {active ? (
          <button
            onClick={() => {
              setActive(false);
            }}
          >
            <img src={upIcon} alt='Icon' className='w-3' />
          </button>
        ) : (
          <button
            onClick={() => {
              setActive(true);
            }}
          >
            <img src={downIcon} alt='Icon' className='w-3' />
          </button>
        )}
        <input
          placeholder='Search Movie Here'
          onFocus={() => {
            setActive(true);
          }}
          type='text'
          className='text-black py-1 px-2 rounded-xl text-xs md:text-sm'
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
        <button className=' h-fit' onClick={handleClick}>
          <img src={searchIcon} alt='Icon' className='w-4' />
        </button>
      </fieldset>
      <main className='bg-white text-black mt-2 absolute w-full z-40 max-h-80 overflow-auto rounded-lg'>
        {active &&
          (list ? (
            list.map((element, index) => {
              if (element.title.toLowerCase().includes(search?.toLowerCase()) && index < 15) {
                return (
                  <button
                    key={index}
                    className='p-2 border-b w-full text-justify'
                    onClick={() => {
                      setSearch(element.title), setActive(false);
                    }}
                  >
                    {element.title}
                  </button>
                );
              }
            })
          ) : (
            <Loading />
          ))}
      </main>
    </div>
  );
};

export default SearchMovie;
