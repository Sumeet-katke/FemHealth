// Dashboard.jsx
import React from 'react';
import { motion } from 'framer-motion';
import styles from '../CSS/Dashboard.module.css';
import {
  Chart as ChartJS,
  CategoryScale, 
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );
import { Line } from 'react-chartjs-2';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const Dashboard = () => {
  const lineData = {
    labels: ['Day 1', 'Day 5', 'Day 10', 'Day 15', 'Day 20', 'Day 25'],
    datasets: [
      {
        label: 'Mood Swings',
        data: [3, 4, 2, 5, 3, 4],
        fill: false,
        borderColor: '#7091E6',
        tension: 0.4,
      },
    ],
  };

  return (
    <motion.section
      className={styles.dashboard}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Header */}
      <motion.div className={styles.header}
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1>Welcome Back, [User Name]</h1>
        <p>Your Health at a Glance 🌸</p>
      </motion.div>

      {/* Big Cards */}
      <motion.div className={styles.statsGrid}
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1 }}
      >
        <div className={styles.statCard}>
          <h2>Next Period</h2>
          <p>5 Days Remaining</p>
        </div>

        <div className={styles.statCard}>
          <h2>PCOS Risk</h2>
          <p><span className={styles.riskLow}>Low</span></p>
        </div>

        <div className={styles.statCard}>
          <h2>Current Mood</h2>
          <p>😊 Happy</p>
        </div>
      </motion.div>

      {/* Calendar + Graphs */}
      <motion.div className={styles.bottomGrid}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 1 }}
      >
        <div className={styles.calendarSection}>
          <h2>Period Tracker</h2>
          <Calendar />
        </div>

        <div className={styles.graphSection}>
          <h2>Mood Variation</h2>
          <Line data={lineData} />
        </div>
      </motion.div>

      {/* Chatbot + Reports */}
      <motion.div className={styles.bottomMiniGrid}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 1 }}
      >
        <div className={styles.chatbot}>
          <h2>FemBot Assistant</h2>
          <button className={styles.chatButton}>Open Chat</button>
        </div>

        <div className={styles.detectionStatus}>
          <h2>Last PCOS Detection</h2>
          <p>Status: Healthy</p>
          <button className={styles.reportButton}>View Report</button>
        </div>
      </motion.div>
    </motion.section>
  );
};

export default Dashboard;