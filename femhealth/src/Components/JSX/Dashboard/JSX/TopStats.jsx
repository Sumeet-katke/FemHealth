// src/Landing/JSX/TopStats.jsx
import React from 'react';
import { motion } from 'framer-motion';
import styles from '../CSS/TopStats.module.css';

const TopStats = () => {
  const stats = [
    { label: "Day 16", sub: "of Cycle" },
    { label: "Next Period", sub: "in 14 Days" },
    { label: "Symptoms", sub: "to Watch" },
    { label: "Mood", sub: "Steady" },
  ];

  return (
    <div className={styles.statsContainer}>
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          className={styles.statCard}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className={styles.statLabel}>{stat.label}</div>
          <div className={styles.statSub}>{stat.sub}</div>
        </motion.div>
      ))}
    </div>
  );
};

export default TopStats;