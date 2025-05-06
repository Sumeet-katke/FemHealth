import React, { use, useEffect, useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom'; // Import to track the current URL
import styles from '../CSS/NavBar.module.css';
import { useFemHealth } from '../../contexts/FemHealthContext'; 

// Sections for Root Page
const rootSections = [
  { id: 'home', label: 'Home' },
  { id: 'pcos', label: 'About PCOS' },
  { id: 'features', label: 'Features' },
  { id: 'signin', label: 'Sign-up' },
  { id: 'login', label: 'Login' },
];

// Sections for Dashboard
const dashboardSections = [
  { id: 'predict', label: 'Predictor' },
  { id: 'detector', label: 'Detector' },
  { id: 'tracker', label: 'Tracker' },
  { id: 'profile', label: 'Profile' },
  { id: 'logout', label: 'Logout' }
];

const NavBar = ({ openRegister, openLogin }) => {
  const [activeSection, setActiveSection] = useState('');
  const [prevScrollY, setPrevScrollY] = useState(0);
  const [hideNav, setHideNav] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { handleLogout } = useFemHealth(); 

  const location = useLocation(); // Get the current route

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setHideNav(scrollY > prevScrollY && scrollY > 100);
      setPrevScrollY(scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollY]);

  // Function to scroll to the respective section
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setMenuOpen(false); // Close mobile menu
    }
  };

  // Choose sections based on current route
  const sections = location.pathname === '/dashboard' ? dashboardSections : rootSections;

  return (
    <motion.nav
      className={`${styles.navContainer} ${hideNav ? styles.hide : ''}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className={styles.mobileMenuIcon} onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <FaTimes /> : <FaBars />}
      </div>
      <ul className={`${styles.navItems} ${menuOpen ? styles.navItemsMobileOpen : ''}`}>
      {sections.map(({ id, label }) => (
        <motion.li
          key={id}
          className={`${styles.navItem} ${activeSection === id ? styles.active : ''}`}
          onClick={() => {
            // Check if the ID is 'signin' or 'login' and open respective modals
            if (id === 'signin') {
              openRegister();  // Open Register Modal
            } else if (id === 'login') {
              openLogin();  // Open Login Modal
            } else if(label === 'Logout') {
              handleLogout();
            }
            else {
              scrollToSection(id);  // Scroll to the relevant section
            }
          }}
          whileHover={{ scale: 1.1 }} // Hover effect with Framer Motion
        >
          {label}
        </motion.li>
      ))}
      </ul>
    </motion.nav>
  );
};

export default NavBar;