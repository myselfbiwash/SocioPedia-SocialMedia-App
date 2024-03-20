import { useState } from 'react'
import {Route,Routes,BrowserRouter as Router} from 'react-router-dom'
  import './App.css'
import SignUp from './components/Signup'
import Login from './components/Login'

function App() {

  return (
    <>
     {/* <p>Hello Social Animals</p> */}
      <Router>
        <Routes>
          <Route path="/" element={<Login/>} />
          <Route path="/signup" element={<SignUp/>} />
        </Routes>
      </Router>
    </> 
  )
}

export default App
