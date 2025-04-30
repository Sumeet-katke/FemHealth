import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { motion } from 'framer-motion';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Filler,
} from 'chart.js';
import styles from '../CSS/Dashboard.module.css';

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Filler);

const HealthGraphs = ({ chartType = 'mood' }) => {
  const [showModal, setShowModal] = useState(false);
  const [chartView, setChartView] = useState(chartType);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);
  const toggleChart = () =>
    setChartView((prev) => (prev === 'mood' ? 'periodFlow' : 'mood'));

  const dataOptions = {
    mood: {
      title: 'Mood Pattern',
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
      data: [2, 3, 4, 3, 5],
      label: 'Mood (1-5)',
    },
    periodFlow: {
      title: 'Period Flow Trend',
      labels: ['Cycle 1', 'Cycle 2', 'Cycle 3', 'Cycle 4'],
      data: [4, 3, 2, 3],
      label: 'Flow Intensity',
    },
  };

  const selected = dataOptions[chartView];

  const chartData = {
    labels: selected.labels,
    datasets: [
      {
        label: selected.label,
        data: selected.data,
        backgroundColor: '#7091E6',
        borderColor: '#3D52A0',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    scales: {
      y: { beginAtZero: true },
    },
  };

  return (
    <>
      <motion.div
        className={styles.graphWrapper}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        onClick={openModal}
      >
        <h3>{selected.title}</h3>
        <Line data={chartData} options={chartOptions} />
      </motion.div>

      {showModal && (
        <motion.div
          className={styles.modalOverlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeModal}
        >
          <motion.div
            className={styles.modalContent}
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.9 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.modalHeader}>
              <h2>{selected.title}</h2>
              <button className={styles.switchButton} onClick={toggleChart}>
                Switch to {chartView === 'mood' ? 'Period Flow' : 'Mood'} Graph
              </button>
            </div>
            <Line data={chartData} options={chartOptions} />
            <button className={styles.closeModal} onClick={closeModal}>
              ×
            </button>
          </motion.div>
        </motion.div>
      )}
    </>
  );
};

export default HealthGraphs;