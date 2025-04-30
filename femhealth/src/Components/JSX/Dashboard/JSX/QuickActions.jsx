// src/Components/Dashboard/QuickActions.jsx
import React from 'react';
import styles from '../CSS/QuickActions.module.css';

const QuickActions = () => {
  return (
    <div className={styles.actions}>
      <button>Track Period</button>
      <button>Predict PCOS</button>
      <button>Upload Scans</button>
      <button>Chat With Assistant</button>
    </div>
  );
};

export default QuickActions;