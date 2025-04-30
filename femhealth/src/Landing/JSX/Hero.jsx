import React from 'react';
import styles from '../CSS/Hero.module.css';
import Vector1 from '../../assets/vector1.svg';
import Vector2 from '../../assets/vector2.svg';
import Vector3 from '../../assets/vector3.svg';
// import NavBar from '../../Components/JSX/NavBar';

import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <>
      {/* <NavBar className={styles.navMenu}/> */}
      <section className={styles.landingWrapper} id="home" aria-label="Home Section">
      <div className={styles.background} />


      <div className={styles.headingBlock}>
        <div className={styles.welcome}>Welcome to</div>
        <div className={styles.mainTitle}>FemHealth</div>
        <div className={styles.subTitle}>Companion</div>
      </div>
      <div className={styles.cliffs}>
      <img src={Vector1} alt="Layer 1" className={styles.box1} />
      <img src = {Vector2} className={styles.box2} />
      <img src={Vector3} className={styles.box3} />
      </div>
    </section>
    </>
  );
};

export default Hero;