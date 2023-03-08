import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Protected from '../components/Protected';
import Home from '../layouts/Home';
import Intro from '../layouts/Intro';
import HomePage from '../page/HomePage';
import IntroPage from '../page/IntroPage';
import LogInPage from '../page/LogInPage';
import MoviePage from '../page/MoviePage';
import PageNotFound from '../page/PageNotFound';
import SignUpPage from '../page/SignUpPage';
import api from '../api/localhost';
import ConnectingPage from '../page/ConnectingPage';
import WatchListPage from '../page/WatchListPage';
import WatchList from '../layouts/WatchList';
import WLMoviePage from '../page/WLMoviePage';

function App() {
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    try {
      const connecting = async () => {
        const response = await fetch(`${api()}/`,{
          cors:'cors',
          headers:{
            'Content-Type': 'application/json'
          }
        }).then((res) => res.json());
        response.message === 'Connected' ? setConnected(true) : setConnected(false);
      };
      connecting();
    } catch (error) {
      console.log(error.message);
    }
  }, []);
  return (
    <Routes>
      <Route path='/' element={connected ? <Intro /> : <ConnectingPage />}>
        <Route path='/' element={<IntroPage />} />
        <Route path='/logIn' element={<LogInPage />} />
        <Route path='/signUp' element={<SignUpPage />} />
      </Route>
      <Route
        path='/home'
        element={
          <Protected>
            <Home />
          </Protected>
        }
      >
        <Route path='/home' element={<HomePage />} />
        <Route path='/home/movie/:movieId' element={<MoviePage />} />
      </Route>
      <Route
        path='/watchList'
        element={
          <Protected>
            <WatchList />
          </Protected>
        }
      >
        <Route path='/watchList' element={<WatchListPage />} />
        <Route path='/watchList/movie/:WLMovieID' element={<WLMoviePage/>}/>
      </Route>
      <Route path='*' element={<PageNotFound />} />
    </Routes>
  );
}

export default App;
