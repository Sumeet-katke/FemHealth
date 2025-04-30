// src/Components/Dashboard/StatsCards.jsx
import React from 'react';
import styles from '../CSS/StatsCards.module.css';

const data = [
  { label: 'Predicted Period Date', value: '12 May 2025', color: '#7091E6' },
  { label: 'PCOS Risk', value: 'Low', color: '#8697C4' },
  { label: 'Ovary Health', value: 'Normal', color: '#ADBBDA' },
  { label: 'Mood', value: 'Happy', color: '#EDE9F5' },
];

const StatsCards = () => {
  return (
    <div className={styles.cardContainer}>
      {data.map((item, index) => (
        <div key={index} className={styles.card} style={{ backgroundColor: item.color }}>
          <h3>{item.value}</h3>
          <p>{item.label}</p>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;