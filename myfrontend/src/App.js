// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import Footer from './components/Footer';
// import DangNhap from './components/DangNhap'; // Import component Form đăng nhập
import './App.css';


function FooterWrapper() {
  const location = useLocation();
  return location.pathname === '/' ? <Footer /> : null;
}
function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<HeroSection />} />
        {/* <Route path='/Dang-Nhap' element={<DangNhap />} /> */}
        {/* Add other routes here */}
      </Routes>
      <FooterWrapper />
    </Router>
  );
}

export default App;
