import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom'

import './Error.css'
import '../home/Home.css'

function Error() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode) {
      setDarkMode(JSON.parse(savedDarkMode));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    switchColors();
  }, [darkMode]);

  const switchColors = () => {
    const root = document.documentElement;
    if (darkMode) {
      root.style.setProperty('--first-color', '#101010');
      root.style.setProperty('--second-color', '#dddddd');
    } else {
      root.style.setProperty('--first-color', '#dddddd');
      root.style.setProperty('--second-color', '#101010');
    }
  };

  return (
    <div className="home-container">
      <header className="home-header">

      </header>

      <div className="error-main">

        <h1 className='error-404'>404</h1>
        <h1 className="error-notfound">We couldn't find the page you are looking for.</h1>
        <NavLink end to="/"><button className="error-cta">
          MOXi
        </button></NavLink>
      </div>
    </div>
  )
}

export default Error
