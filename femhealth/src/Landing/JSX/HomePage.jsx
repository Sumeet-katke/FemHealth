import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Hero from './Hero';
import AboutPCOS from './AboutPCOS';
import Features from './Features';

const HomePage = () => {
  const location = useLocation();

  useEffect(() => {
    const id = location.hash.replace('#', '');
    if (id) {
      const section = document.getElementById(id);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

  return (
    <>
      <Hero />
      <div id="pcos">
        <AboutPCOS />
      </div>
      <div id="features">
        <Features />
      </div>
    </>
  );
};

export default HomePage;