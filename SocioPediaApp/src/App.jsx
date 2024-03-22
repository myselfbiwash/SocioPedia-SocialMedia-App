import { useState } from 'react'
import {Route,Routes,BrowserRouter as Router} from 'react-router-dom'
  import './App.css'
  import './index.css'
import SignUp from './components/Signup'
import Login from './components/Login'
import Homepage from './components/Homepage'
import PrivateComponent from './components/PrivateComponent'
import Navbar from './components/Navbar'

function App() {

  return (
    <>
     {/* <p>Hello Social Animals</p> */}
     {/* <Route path="/" element={<Navbar />} /> */}
      <Router>
      <Navbar />

        <Routes>
        <Route path="/" element={<PrivateComponent />}>
          <Route path="/" element={<Homepage />} />
          </Route>
          <Route path="/login" element={<Login/>} />
          <Route path="/signup" element={<SignUp/>} />
        </Routes>
      </Router>
    </> 
  )
}

export default App
