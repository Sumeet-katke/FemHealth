// src/Components/Dashboard/DashboardHeader.jsx
import React from 'react';
import styles from '../CSS/DashboardHeader.module.css';

const DashboardHeader = () => {
  return (
    <header className={styles.header}>
      <h1>Welcome Back, User 👋</h1>
      <p>Your health insights at a glance</p>
    </header>
  );
};

export default DashboardHeader;