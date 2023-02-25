import { Route, Routes } from "react-router-dom"
import Intro from "../layouts/Intro"
import IntroPage from "../page/IntroPage"
import LogIn from "../page/logIn"
import PageNotFound from "../page/PageNotFound"
import SignUp from "../page/signUp"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Intro/>}>
        <Route path="/" element={<IntroPage/>}/>
        <Route path="/logIn" element={<LogIn/>}/>
        <Route path="/signUp" element={<SignUp/>}/>
      </Route>
      <Route path="*" element={<PageNotFound/>}/>
    </Routes>
  )
}

export default App
