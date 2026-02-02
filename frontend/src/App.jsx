import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/login";
import Signup from "./components/signup";
import Volunteer from "./components/volenteer";
import Home from "./Main/Home";
import Navbar from "./Main/Navbar";
import Data from "./components/Data";
import Profile from "./components/profile";
import Settings from "./components/Settings";
import Otp from "./components/otpgenerate";
import AddressForm from "./components/AddressForm";
import "./App.css";
import GoogleSuccess from "./components/GoogleSuccess";
import WildfireInfo from "./pages/wildfire";
import FloodInfo from "./pages/Floods";
import LandslideInfo from "./pages/Landslide";
import EarthquakeInfo from "./pages/Earth";
import CycloneInfo from "./pages/Cyclone";
import TsunamiInfo from "./pages/Tsunami";
import ClimateResilience from "./pages/ClimateResilience";
import DisasterReliefInfo from "./pages/DisasterReliefInfo";
import ChatPage from "./components/ChatPage";
import useAuth from "./hooks/useAuth";
import Donate from "./components/Donate";
import DonationSuccess from "./components/DonationSuccess";
import IncidentFeed from "./components/IncidentFeed";
import IncidentSubmit from "./components/IncidentSubmit";
import AssistanceNew from "./components/AssistanceNew";
import AssistanceMy from "./components/AssistanceMy";
import AssistancePending from "./components/AssistancePending";
import AdminIncidentReview from "./components/AdminIncidentReview";
import MyDonations from "./components/MyDonations";
import AdminNGOVerify from "./components/AdminNGOVerify";
import NGOVolunteerAssign from "./components/NGOVolunteerAssign";
import Dashboard from "./components/Dashboard";
import UserDashboard from "./components/UserDashboard";
import NgoDashboard from "./components/NgoDashboard";
import AdminDashboard from "./components/AdminDashboard";

function App() {
  const { user } = useAuth();
  const userRole = user?.role || "";

  
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/data" element={<Data />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/user/dashboard" element={<UserDashboard />} />
          <Route path="/ngo/dashboard" element={<NgoDashboard />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
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
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/donate" element={<Donate />} />
          <Route path="/donation-success" element={<DonationSuccess />} />
          <Route path="/incidents" element={<IncidentFeed />} />
          <Route path="/incidents/submit" element={<IncidentSubmit />} />
          <Route path="/incidents/admin" element={<AdminIncidentReview />} />
          <Route path="/assistance/new" element={<AssistanceNew />} />
          <Route path="/assistance/my" element={<AssistanceMy />} />
          <Route path="/assistance/pending" element={<AssistancePending />} />
          <Route path="/donations" element={<MyDonations />} />
          <Route path="/admin/ngos" element={<AdminNGOVerify />} />
          <Route path="/ngo/volunteers" element={<NGOVolunteerAssign />} />
          {userRole === "volunteer" && (
            <Route path="/profile" element={<Profile />} />
          )}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
