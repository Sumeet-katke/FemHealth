import React, { useEffect, useState } from 'react';
import styles from '../CSS/NavBar.module.css';
import { FaBars, FaTimes } from 'react-icons/fa';

const sections = [
  { id: 'home', label: 'Home' },
  { id: 'pcos', label: 'About PCOS' },
  { id: 'features', label: 'Features' },
  { id: 'team', label: 'Team' },
  { id: 'signin', label: 'Sign-up' },
];

const NavBar = ({ openRegister }) => {
  const [activeSection, setActiveSection] = useState('');
  const [prevScrollY, setPrevScrollY] = useState(0);
  const [hideNav, setHideNav] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setHideNav(scrollY > prevScrollY && scrollY > 100);
      setPrevScrollY(scrollY);

      const current = sections.find(({ id }) => {
        const el = document.getElementById(id);
        if (!el) return false;
        const rect = el.getBoundingClientRect();
        return rect.top <= 100 && rect.bottom >= 100;
      });

      setActiveSection(current?.id || '');
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollY]);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setMenuOpen(false); // Close mobile menu
    }
  };

  return (
    <nav className={`${styles.navContainer} ${hideNav ? styles.hide : ''}`}>
      <div className={styles.mobileMenuIcon} onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <FaTimes /> : <FaBars />}
      </div>
      <ul className={`${styles.navItems} ${menuOpen ? styles.navItemsMobileOpen : ''}`}>
        {sections.map(({ id, label }) => (
          <li
            key={id}
            className={`${styles.navItem} ${activeSection === id ? styles.active : ''}`}
            onClick={() => {
              if (id === 'signin') {
                openRegister();
              } else {
                scrollToSection(id);
              }
            }}
          >
            {label}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;