import React, { useState } from 'react';
import styles from '../CSS/Dashboard.module.css';
import TopStats from './TopStats';
import PeriodTracker from './PeriodTracker';
import PCOSPrediction from './PCOSPrediction';
import ChatBotSection from './ChatBotSection';
import HealthTips from './HealthTips';
import HealthGraphs from './HealthGraphs';
import { motion, AnimatePresence } from 'framer-motion';

const Dashboard = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState('');

  const openModal = (title) => {
    setModalContent(title);
    setModalOpen(true);
  };

  const closeModal = () => setModalOpen(false);

  return (
    <div className={styles.dashboard}>
      <div className={styles.topStats}><TopStats /></div>
      <div className={styles.periodTracker}><PeriodTracker /></div>
      <div className={styles.pcosPrediction}><PCOSPrediction /></div>
      <div className={styles.chatbotPanel}><ChatBotSection/></div>
      <div className={styles.tipAndArticles}>
        <div className={styles.contentWrapper}><HealthTips/></div>
      </div>
      <div className={styles.healthAnalytics1}>
        <div className={styles.contentWrapper}><HealthGraphs chartType="mood" /></div>
      </div>
      <div className={styles.healthAnalytics2}>
        <div className={styles.contentWrapper}><HealthGraphs chartType="periodFlow" /></div>
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
              <p>This is a deep dive into {modalContent}. Here you could display extra graphs, insights or related health data.</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dashboard;