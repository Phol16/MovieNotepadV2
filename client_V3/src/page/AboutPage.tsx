import React from 'react'
import { primText } from '../style/theme'
import Questions from '../components/Questions'

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
  {
    title: 'Who Created MovieNotepad',
    content: 'The Person responsible for this application is none other than Phol'
  },
];

const AboutPage = () => {
  return (
    <div className={`flex flex-col items-center gap-5 py-20 ${primText}`}>
      <h1>About Movie Notepad</h1>
      <main className='flex flex-col gap-2'>
          {Question.map((element, index) => {
            return <Questions title={element.title} content={element.content} key={index} />;
          })}
        </main>
    </div>
  )
}

export default AboutPage