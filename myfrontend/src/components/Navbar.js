import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <nav className='navbar'>
      <div className='navbar-container'>
        <Link to="/" className='navbar-logo'>
          {/* <img src="images/logo2.png" alt="logo2" className="navbar-logo-img" /> */}
          HỆ THỐNG QUAN TRẮC
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
