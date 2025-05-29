// src/Landing/JSX/HealthTips.jsx
import React from 'react';
import { motion } from 'framer-motion';
import styles from '../CSS/HealthTips.module.css';

const tips = [
  { title: "5 Easy Yoga Poses for PCOS Relief", description: "Discover how simple stretches can reduce PCOS symptoms.", link: "https://www.indianyogaassociation.com/blog/yoga-asanas-to-relieve-symptoms-of-pcos.html" },
  { title: "15 Best Foods for Hormonal Balance", description: "Eating smartly can make a huge difference. Learn how.", link: "https://oasisindia.in/blog/best-foods-for-hormonal-balance/" },
  { title: "What Are the First Signs of PCOS?", description: "Awareness is power! Know the early signs.", link: "https://www.medicinenet.com/the_first_signs_of_pcos/article.htm" }
];

const HealthTips = () => {
  return (
    <motion.div 
      className={styles.tipsContainer}
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
    >
      <h2 className={styles.heading}>Tips & Articles 📚</h2>
      
      <div className={styles.cards}>
        {tips.map((tip, idx) => (
          <div key={idx} className={styles.card}>
            <h3>{tip.title}</h3>
            <p>{tip.description}</p>
            <a href={tip.link} className={styles.readMore}>Read More</a>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default HealthTips;