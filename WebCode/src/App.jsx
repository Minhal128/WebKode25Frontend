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

function App() {
  return (
    <Routes>
      <Route
          path="/"
          element={
            <>
              <Header/>
              <HeroBanner/>
              <SupportedByCompanies/>
              <Testimonials/>
              <Packages/>
              <Newsletter/>
              <Footer/>
            </>
          }
        />
        <Route path="/login" element={<Login />} />
        {/* Add other routes here */}
      </Routes>
  );
}
export default App;
