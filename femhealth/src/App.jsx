import React, { useEffect, useState } from 'react';
import { FemHealthProvider } from './contexts/FemHealthContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Hero from './Landing/JSX/Hero';
import AboutPCOS from './Landing/JSX/AboutPCOS';
import Features from './Landing/JSX/Features';
import NavBar from './Components/JSX/NavBar';
import RegisterModal from './Landing/JSX/RegisterModal';
import LoginModal from './Landing/JSX/LoginModal';  // Assuming this is the correct path
import Dashboard from './Components/JSX/Dashboard/JSX/Dashboard';
import { motion } from 'framer-motion'; // Framer Motion import for smooth transitions
import './App.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state for RegisterModal
  const [isLoginModal, setIsLoginModal] = useState(false); // Modal state for LoginModal

  const toggleModal = () => setIsModalOpen(!isModalOpen);
  const toggleLoginModal = () => setIsLoginModal(!isLoginModal); // Toggle for login modal

  useEffect(() => {
    console.log(isLoginModal, isModalOpen);
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsModalOpen(false);
        setIsLoginModal(false); // Close login modal on Escape
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    const handleOverlayClick = (e) => {
      if (e.target.className === 'modal-overlay') {
        setIsModalOpen(false);
        setIsLoginModal(false); // Close login modal on overlay click
      }
    };
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }
  , [isLoginModal]);
  // Close modal on outside click


  return (
    <Router>
      <FemHealthProvider>
      <NavBar 
        openRegister={toggleModal} 
        openLogin={toggleLoginModal}  // Pass toggle function to open login modal
      /> {/* Pass toggle function to NavBar */}
      
      <Routes>
        {/* Root Routes (Landing Page) */}
        <Route 
          path="/" 
          element={
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Landing Page Section */}
              <Hero />
              <motion.div 
                id="aboutPCOS" 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                exit={{ opacity: 0 }} 
                transition={{ duration: 0.6 }}>
                <AboutPCOS />
              </motion.div>
              <motion.div 
                id="features" 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                exit={{ opacity: 0 }} 
                transition={{ duration: 0.6 }}>
                <Features />
              </motion.div>
            </motion.div>
          } 
        />
        
        {/* Dashboard Route */}
        <Route path='/dashboard/*' element={<Dashboard />} />
      </Routes>

      {/* Render RegisterModal conditionally */}
      {isModalOpen && !isLoginModal && (
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
          onClick={toggleModal} // Clicking overlay closes
        >
          <RegisterModal onClose={toggleModal} />
        </div>
      )}

      {/* Render LoginModal conditionally */}
      {isLoginModal && (
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
          onClick={toggleModal} // Clicking overlay closes
        >
          <LoginModal onClose={toggleLoginModal} />
        </div>
      )}
    </FemHealthProvider>
    </Router>
  );
}

export default App;