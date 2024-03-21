import { useState } from 'react'
import {Route,Routes,BrowserRouter as Router} from 'react-router-dom'
  import './App.css'
import SignUp from './components/Signup'
import Login from './components/Login'
import Homepage from './components/Homepage'
import PrivateComponent from './components/PrivateComponent'

function App() {

  return (
    <>
     {/* <p>Hello Social Animals</p> */}
      <Router>
        <Routes>
        <Route path="/" element={<PrivateComponent />}>
            <Route path="/" element={<Homepage />} />
          {/* <Route path="/" element={<Homepage />} /> */}
          </Route>
          <Route path="/login" element={<Login/>} />
          <Route path="/signup" element={<SignUp/>} />
        </Routes>
      </Router>
    </> 
  )
}

export default App
