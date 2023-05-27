import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom'

import 'animate.css';
import './Home.css'

function Home() {

  //Darkmode
  const [darkMode, setDarkMode] = useState(false);

  const handleDarkModeToggle = () => {
    setDarkMode(!darkMode);
  };

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
        <NavLink end to="/" className="home-header-logo">MOXi</NavLink>

        <div className="home-header-center">
          <NavLink to="/todo" className="home-header-link underline">To-Do</NavLink>
          <svg xmlns="http://www.w3.org/2000/svg" width="59" height="16" viewBox="0 0 59 16">
            <path d="M51.358 16L50.6591 15.3011L57.1193 8.85795H0V7.86932H57.1193L50.6591 1.40909L51.358 0.727273L58.9943 8.36364L51.358 16Z" fill="currentColor" />
          </svg>
          <NavLink to="/classtimer" className="home-header-link underline">Class Timer</NavLink>
          <svg xmlns="http://www.w3.org/2000/svg" width="59" height="16" viewBox="0 0 59 16">
            <path d="M51.358 16L50.6591 15.3011L57.1193 8.85795H0V7.86932H57.1193L50.6591 1.40909L51.358 0.727273L58.9943 8.36364L51.358 16Z" fill="currentColor" />
          </svg>
          <NavLink to="/memo" className="home-header-link underline">MeMo</NavLink>
        </div>

        <div className="home-header-darkmode">
          <label className="switch">
            <input type="checkbox" onChange={handleDarkModeToggle} checked={darkMode} />
            <span className="slider" />
          </label>
        </div>

      </header>

      <main className="home-main">

        <div className="home-header-center-hidden">
          <NavLink to="/todo" className="home-header-link underline">To-Do</NavLink>
          <svg xmlns="http://www.w3.org/2000/svg" width="10" height="8" viewBox="0 0 10 8" fill="none">
            <path d="M5.4517 8L4.94886 7.50142L7.91477 4.53977H0.5V3.82386H7.91477L4.94886 0.862216L5.4517 0.363636L9.26989 4.18182L5.4517 8Z" fill="black" />
          </svg>
          <NavLink to="/classtimer" className="home-header-link underline">Class Timer</NavLink>
          <svg xmlns="http://www.w3.org/2000/svg" width="10" height="8" viewBox="0 0 10 8" fill="none">
            <path d="M5.4517 8L4.94886 7.50142L7.91477 4.53977H0.5V3.82386H7.91477L4.94886 0.862216L5.4517 0.363636L9.26989 4.18182L5.4517 8Z" fill="black" />
          </svg>
          <NavLink to="/memo" className="home-header-link underline">MeMo</NavLink>
        </div>

        <div className="home-main-left">
          <div className="home-main-left-text animate__animated animate__fadeInLeft">
            list what you need to be completed.
            <span className="home-main-left-text-highlight"> TO-DO </span>
          </div>

          <div className="home-main-left-text animate__animated animate__fadeInLeft">
            for remind your class date.
            <span className="home-main-left-text-highlight"> Class Timer </span>
          </div>

          <div className="home-main-left-text animate__animated animate__fadeInLeft">
            a short message for note your idea.
            <span className="home-main-left-text-highlight"> MeMo </span>
          </div>
        </div>
        <div className="home-main-right">
          <div className="home-main-right-logo animate__animated animate__fadeInUp">MOXi</div>
          <button className="home-main-right-cta">Start Now!</button>
        </div>
      </main>

      <footer className="home-footer">
        <div className="home-footer-contact underline">
          <div className="home-footer-contact-title">Contact</div>
          <i className="fa-brands fa-github home-footer-contact-icon "></i>
          <i className="fa-brands fa-dribbble home-footer-contact-icon "></i>
          <i className="fa-brands fa-codepen home-footer-contact-icon "></i>
        </div>

        <div className="home-footer-marquee">
          <div>
            <span className="home-footer-marquee-text">don't expect the results without the work. “the only place where success comes before work is in the dictionary.  </span>
            <span className="home-footer-marquee-text">don't expect the results without the work. “the only place where success comes before work is in the dictionary. </span>
          </div>
        </div>

        <div className="home-footer-donate underline">
          Buy me a coffin.
        </div>
      </footer>
    </div>
  )
}

export default Home
