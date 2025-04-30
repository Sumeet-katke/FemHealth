// FeatureCard.jsx
import React from "react";
import styles from "../CSS/FeatureCard.module.css";

const FeatureCard = ({ title, description, features }) => {
  return (
    <div className={styles.cardWrapper}>
      <div className={styles.cardTop}>
        <h2 className={styles.title}>{title}</h2>
      </div>
      <div className={styles.cardBottom}>
        <p className={styles.description}>{description}</p>
        <ul className={styles.features}>
          {features.map((feat, i) => (
            <li key={i}>{feat}</li>
          ))}
        </ul>
        <button className={styles.exploreBtn}>Explore</button>
      </div>
    </div>
  );
};

export default FeatureCard;