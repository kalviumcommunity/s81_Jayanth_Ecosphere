import { useState } from 'react'
import { BrowserRouter, Routes , Route } from 'react-router-dom'
import Login from "./components/login"
import Signup from './components/signup'

import Home from './pages/home'
import Navbar from './pages/Navbar'
import './App.css'

function App() {
  

  return (
    <>
    <BrowserRouter>
    <Navbar/>
    <Routes>
    <Route path="/" element={<Home />}></Route>
    <Route path="/Login" element={<Login />}></Route>
    <Route path="/Signup" element={<Signup />}></Route>
  
    </Routes>
    </BrowserRouter> 

    </>
  )
}

export default App
