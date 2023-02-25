import { Route, Routes } from "react-router-dom"
import Intro from "../layouts/Intro"
import IntroPage from "../page/IntroPage"
import LogInPage from "../page/LogInPage"
import PageNotFound from "../page/PageNotFound"
import SignUpPage from "../page/SignUpPage"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Intro/>}>
        <Route path="/" element={<IntroPage/>}/>
        <Route path="/logIn" element={<LogInPage/>}/>
        <Route path="/signUp" element={<SignUpPage/>}/>
      </Route>
      <Route path="*" element={<PageNotFound/>}/>
    </Routes>
  )
}

export default App
