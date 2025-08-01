import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from "./components/login"
import Signup from './components/signup'
import Volunteer from './components/volenteer'
import Home from './pages/home'
import Navbar from './pages/Navbar'
import Data from './components/Data'
import Profile from './components/profile'
import Otp from './components/otpgenerate'
import AddressForm from './components/AddressForm'
import './App.css'
import { jwtDecode } from "jwt-decode";
import GoogleSuccess from './components/GoogleSuccess'
import WildfireInfo from './pages/wildfire'
import FloodInfo from './pages/Floods'
import LandslideInfo from './pages/Landslide'
import EarthquakeInfo from './pages/Earth'
import CycloneInfo from './pages/Cyclone'
import TsunamiInfo from './pages/Tsunami'
import ClimateResilience from './pages/Climateresilience'
import DisasterReliefInfo from './pages/DisasterReliefInfo'

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
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/data" element={<Data />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/volunteer" element={<Volunteer />} />
          <Route path="/Otp" element={<Otp />} />
          <Route path="/Address-up" element={<AddressForm />} />
          <Route path="/google-success" element={<GoogleSuccess />} />
          <Route path="/wildfire" element={<WildfireInfo />} />
          <Route path="/flood" element={<FloodInfo />} />
          <Route path="/landslide" element={<LandslideInfo />} />
          <Route path="/earthquake" element={<EarthquakeInfo />} />
          <Route path="/cyclone" element={<CycloneInfo />} />
          <Route path="/tsunami" element={<TsunamiInfo />} />
          <Route path="/climate-resilience" element={<ClimateResilience />} />
          <Route path="/disaster-relief" element={<DisasterReliefInfo />} />
          {userRole === 'volunteer' && (
            <Route path="/profile" element={<Profile />} />
          )}
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
