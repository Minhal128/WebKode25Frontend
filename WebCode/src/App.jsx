import React from 'react';
import './App.css';
import { Routes, Route } from "react-router-dom";
import Header from './components/Header';
import HeroBanner from './components/HeroBanner';
import SupportedByCompanies from './components/SupportedByCompanies';
import Footer from './components/Footer';
import Newsletter from './components/Newsletter';
import Packages from './components/Packages';
import Testimonials from './components/Testimonials';
import Login from './components/Login';
import Register from './components/Register';
import VisaCard from './components/VisaCard';
import RegisterOTP from './components/registrerOTP';

function App() {
  return (
    <div className="app-container">
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header/>
              <HeroBanner/>
              <SupportedByCompanies/>
              <Packages/>
              <VisaCard/>
              <Testimonials/>
              <Newsletter/>
              <Footer/>
            </>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/otp" element={<RegisterOTP/>} />
        {/* Add other routes here */}
      </Routes>
    </div>
  );
}

export default App;