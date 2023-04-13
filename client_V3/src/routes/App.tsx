import { Routes, Route } from 'react-router-dom';
import Intro from '../layout/Intro';
import IntroPage from '../page/IntroPage';
import LogInPage from '../page/LogInPage';
import SignUpPage from '../page/SignUpPage';
import Main from '../layout/Main';
import Protected from '../components/Protected';
import AboutPage from '../page/AboutPage';
import WatchListPage from '../page/WatchListPage';
import MainPage from '../page/MainPage';
import HomePage from '../page/HomePage';
import MoviePage from '../page/MoviePage';
import PageNotFound from '../page/PageNotFound';
function App() {
  return (
    <Routes>
      <Route path='/' element={<Intro />}>
        <Route path='/' element={<IntroPage />} />
        <Route path='/signIn' element={<LogInPage />} />
        <Route path='/signUp' element={<SignUpPage />} />
      </Route>
      <Route
        path='/home'
        element={
          <Protected>
            <Main />
          </Protected>
        }
      >
        <Route path='/home' element={<HomePage/>}/>
        <Route path='/home/movie/:id' element={<MoviePage/>}/>
        <Route path='/home/about' element={<AboutPage/>}/>
        <Route path='/home/watchList' element={<WatchListPage/>}/>
      </Route>
      <Route path='*' element={<PageNotFound/>}/>
    </Routes>
  );
}

export default App;
