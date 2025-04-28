import { useState } from 'react'
import { BrowserRouter, Routes , Route } from 'react-router-dom'
import Login from "./components/login"
import Signup from './components/signup'
import Volunteer from './components/volenteer'
import Home from './pages/home'
import Navbar from './pages/Navbar'
import Homepage from './components/homepage'
import Profile from './components/profile'
import './App.css'
import { jwtDecode } from "jwt-decode";
import GoogleSuccess from './components/GoogleSuccess'
function App() {
  const token = localStorage.getItem("token");

    let userRole = "";
    if (token) {
      try {
        const decoded = jwtDecode(token);
        userRole = decoded.role;
      } catch (error) {
        console.log("invalid token", error);
      }
    }

  return (
    <>
    <BrowserRouter>
    <Navbar/>
    <Routes>
    <Route path="/" element={<Home />}></Route>
    <Route path="/data" element={<Homepage />}></Route>
    <Route path="/Login" element={<Login />}></Route>
    <Route path="/Signup" element={<Signup />}></Route>
    <Route path="/volunteer" element={<Volunteer />}></Route>
    <Route path="/google-success" element={<GoogleSuccess />}></Route>
    {userRole=='volunteer' && (
      <Route path="/profile" element={<Profile />}></Route>
    )}

    </Routes>
    </BrowserRouter> 

    </>
  )
}

export default App
