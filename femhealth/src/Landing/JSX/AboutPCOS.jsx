import React from 'react';
import styles from '../CSS/AboutPCOS.module.css';
import nurse from '../../assets/nurse.svg';
import { motion } from 'framer-motion';
import NavBar from '../../Components/JSX/NavBar';
import PCOSCarousel from './PCOSCarousel';

const AboutPCOS = () => {
  return (
    <section id='pcos'>
    <motion.section id='pcos'
      className={styles.aboutSection}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      {/* <div className={styles.navContainer}>
        <NavBar/>
      </div> */}

      <div className={styles.bodySection}>
        <div className={styles.bodyContent}>
          <div className={styles.heading}>About Poly-cystic Ovary Syndrome!</div>
          <div className={styles.description}>
          Polycystic Ovary Syndrome (PCOS) is a hormonal imbalance that affects 1 in 10 women of reproductive age. It’s a condition where the ovaries produce an abnormal amount of androgens (male hormones), which can interfere with ovulation.
          </div>
        </div>
        <div className={styles.imagePlaceholder}>
          <img src={nurse} alt="nurse illustration" />
        </div>
      </div>
        {/* <PCOSCarousel/> */}
    </motion.section>
    </section>
  );
};

export default AboutPCOS;