// src/Landing/JSX/PCOSPrediction.jsx
import React from 'react';
import { motion } from 'framer-motion';
import styles from '../CSS/PCOSPrediction.module.css';

const predictions = [
  { label: 'Risk Level', value: 75 },
  { label: 'Hormonal Imbalance', value: 60 },
  { label: 'Cycle Irregularity', value: 85 },
];

const PCOSPrediction = () => {
  return (
    <motion.div
      className={styles.predictionContainer}
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className={styles.heading}>PCOS Prediction</h2>
      <div className={styles.bars}>
        {predictions.map((item, index) => (
          <div key={index} className={styles.barGroup}>
            <div className={styles.label}>{item.label}</div>
            <div className={styles.progressWrapper}>
              <motion.div
                className={styles.progress}
                initial={{ width: 0 }}
                animate={{ width: `${item.value}%` }}
                transition={{ duration: 1 + index * 0.3 }}
              />
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default PCOSPrediction;