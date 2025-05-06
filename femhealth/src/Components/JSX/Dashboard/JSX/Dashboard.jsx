import React, { useState } from 'react';
import styles from '../CSS/Dashboard.module.css';
import TopStats from './TopStats';
import PeriodTracker from './PeriodTracker';
import PCOSPrediction from './PCOSPrediction';
import ChatBotSection from './ChatBotSection';
import HealthTips from './HealthTips';
import HealthGraphs from './HealthGraphs';
import { motion, AnimatePresence } from 'framer-motion';
import PCOSDetection from './PCOSDetection'; // Import PCOSDetection
import { useFemHealth } from '../../../../contexts/FemHealthContext';

const Dashboard = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const {risk } = useFemHealth();
  const [modalContent, setModalContent] = useState('');
  const [riskLevel, setRiskLevel] = useState(risk); // Set to the actual risk level from PCOSPrediction
  console.log('Risk Level:', risk);
  const openModal = (title) => {
    setModalContent(title);
    setModalOpen(true);
  };

  const closeModal = () => setModalOpen(false);

  const handleRiskLevelMessage = () => {
    if (risk > 80) {
      return (
        <div className={styles.riskMessage}>
          <h3>Your risk level is high!</h3>
          <p>We recommend taking an image-based PCOS detection test to get a more accurate result.</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className={styles.dashboard}>
      {/* Top Stats */}
      <div className={styles.topStats}><TopStats /></div>

      {/* First Row */}
      <div className={styles.topRow}>
        <div className={styles.periodTracker}><PeriodTracker /></div>

        <div className={styles.healthAnalytics1}>
          <div className={styles.contentWrapper}><HealthGraphs chartType="mood" /></div>
          <div className={styles.contentWrapper}><HealthGraphs chartType="periodFlow" /></div>
        </div>

        <div className={styles.chatbotPanel}><ChatBotSection /></div>
      </div>

      {/* Second Row */}
      <div className={styles.bottomRow}>
        <div className={styles.pcosPrediction}>
          <PCOSPrediction openModal={openModal} setRiskLevel={setRiskLevel} />
          {handleRiskLevelMessage()}
          <PCOSDetection openModal={openModal} closeModal={closeModal} />
        </div>

        {/* <div className={styles.tipAndArticles}> */}
          <div className={styles.contentWrapper}><HealthTips /></div>
        {/* </div> */}

        <div className={styles.detectionCard}>
          {/* Add Detection component here if available */}
          {/* <Detection /> */}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div 
            className={styles.modalOverlay}
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className={styles.modalContent}
              initial={{ scale: 0.8 }} 
              animate={{ scale: 1 }} 
              exit={{ scale: 0.8 }}
            >
              <button className={styles.closeModal} onClick={closeModal}>×</button>
              <h2>{modalContent}</h2>
              <p>This is a deep dive into {modalContent}. Here you could display extra graphs, insights, or related health data.</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dashboard;