import React, { useEffect, useRef, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Hero from './Landing/JSX/Hero';
import AboutPCOS from './Landing/JSX/AboutPCOS';
import Features from './Landing/JSX/Features';
import NavBar from './Components/JSX/NavBar';
import RegisterModal from './Landing/JSX/RegisterModal';
import './App.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Dashboard from './Components/JSX/Dashboard/JSX/Dashboard';


const ScrollWrapper = () => {
  const location = useLocation();
  const aboutRef = useRef(null);
  const featuresRef = useRef(null);

  useEffect(() => {
    if (location.pathname === '/pcos' && aboutRef.current) {
      aboutRef.current.scrollIntoView({ behavior: 'smooth' });
    } else if (location.pathname === '/features' && featuresRef.current) {
      featuresRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [location]);

  return (
    <div>
      <Hero />
      <div ref={aboutRef}>
        <AboutPCOS />
      </div>
      <div ref={featuresRef}>
        <Features />
      </div>
    </div>
  );
};

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false); // ✅ modal state

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  return (
    <Router>
      <NavBar openRegister={toggleModal} /> {/* ✅ pass toggle function to NavBar */}
      
      <Routes>
        <Route path="/" element={<ScrollWrapper />} />
        <Route path="/pcos" element={<ScrollWrapper />} />
        <Route path="/features" element={<ScrollWrapper />} />
        <Route path='/dashboard' element={<Dashboard/>}/>
      </Routes>

      {/* ✅ Render modal conditionally */}
      {isModalOpen && (
  <div
    style={{
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      zIndex: 999,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}
    onClick={toggleModal} // ← clicking overlay closes
  >
    <RegisterModal onClose={toggleModal} />
  </div>
)}
    </Router>
  );
}

export default App;