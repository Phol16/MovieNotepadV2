import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import noteYellow from '../assets/noteYellow.svg';
import notePink from '../assets/notePink.svg';
import Questions from '../components/Questions';
import IntroHero from '../components/IntroHero';
import NetflixImage from '../assets/NetflixsImage.png';
import InfoNote from '../components/InfoNote';

type details = {
  title: string;
  content: string;
  image?: string[];
};

const Question: details[] = [
  {
    title: 'What is Movie Notepad?',
    content: `Movie Notepad is an application that provides a list of movies and TV shows so users can add it in their watch list, you can add notes to the movie or TV show that you added in that watch list so that you won't forget anything about it.`,
  },
  {
    title: 'Tech Stack Used',
    content: 'The tech stack used to build this project is MERN stack which consist of Mongo Db for database, expressJS for nodeJS framework, ReactJS for frontend framework and TailwindCSS for the styling.',
  },
  {
    title: 'Why App is Created',
    content: 'First and foremost this app is created to showcase my skills and also this application is created for users like me who are not subscribe with different paid streaming platfrom, so the movies I watch are pirated and don`t have a way to track watched movies',
  },
];

const PageContent: details[] = [
  {
    title: 'Notes Everywhere.',
    content: 'Add notes in every movies or TV shows in your watch list.',
    image: [noteYellow, notePink],
  },
  {
    title: 'Create profile for kids.',
    content: 'Send kids on adventures with their favorite characters in a space made just for them—free with your membership.',
    image: [NetflixImage],
  },
];

const IntroPage = () => {
  return (
    <>
      <IntroHero />
      {PageContent.map((element, index) => {
        return (
          <article className='p-10 border-t-8 border-white/30' key={index}>
            <section className={`flex flex-col gap-5 items-center w-fit m-auto ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
              <div className='max-w-[14rem] md:max-w-[18rem] lg:max-w-[450px]'>
                <h1 className='text-xl md:text-2xl lg:text-4xl font-semibold'>{element.title}</h1>
                <h2 className='text-xs md:text-sm lg:text-lg p-2'>{element.content}</h2>
              </div>
              {element.image ? (
                <main className={`flex flex-col`}>
                  {element.image?.map((e, i) => {
                    return <LazyLoadImage effect='blur' src={e} alt='Icon' className={`w-fit h-fit sm:max-w-lg ${i % 2 === 0 ? null : 'self-end'}`} key={e} />;
                  })}
                </main>
              ) : null}
            </section>
          </article>
        );
      })}
      <section className='flex flex-col items-center p-10 gap-5 border-t-8 border-white/30'>
        <h1 className='text-xl md:text-2xl lg:text-4xl font-semibold'>Got Questions?</h1>
        <main className='flex flex-col gap-2'>
          {Question.map((element, index) => {
            return <Questions title={element.title} content={element.content} key={index} />;
          })}
        </main>
      </section>
      <section className='fixed bottom-10 left-5 -rotate-[9deg]'>
        <InfoNote/>
      </section>
    </>
  );
};

export default IntroPage;
