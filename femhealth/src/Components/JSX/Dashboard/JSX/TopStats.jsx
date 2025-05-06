// src/Landing/JSX/TopStats.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { useFemHealth } from '../../../../contexts/FemHealthContext';
import styles from '../CSS/TopStats.module.css';
import { Circles } from 'react-loader-spinner'; // or any other loader from the library

const TopStats = () => {
  const { cycleLength, cycleType, mood, symptoms, dayInCycle } = useFemHealth();
  const stats = [
    { label: `Day ${dayInCycle}`, sub: `of Cycle (${cycleType})` },
    { label: `Next Period`, sub: `in ${cycleLength - dayInCycle} Days` },
    { label: `Symptoms`, sub: symptoms.length > 0 ? symptoms.join(', ') : 'None' },
    { label: `Mood`, sub: mood || 'Steady' },
  ];
  // const {cycleType, cycleLength, dayInCycle, symptoms} = useFemHealth();


  // const isLoading = !cycleLength || !cycleType || !dayInCycle || !Array.isArray(symptoms);


  // if (isLoading) {
  //   return (
  //     <div className={styles.loaderContainer}>
  //       <Circles
  //         height="80"
  //         width="80"
  //         color="#4fa94d"
  //         ariaLabel="circles-loading"
  //         wrapperStyle={{}}
  //         wrapperClass=""
  //         visible={true}
  //       />
  //       <div className={styles.loadingText}>Loading your health stats...</div>
  //     </div>
  //   );
  // }


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
