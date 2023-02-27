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

function App() {
  return (
    <Routes>
      <Route path='/' element={<Intro />}>
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
        <Route path='/home/movie/:movieId' element={<MoviePage/>}/>
      </Route>
      <Route path='*' element={<PageNotFound />} />
    </Routes>
  );
}

export default App;
