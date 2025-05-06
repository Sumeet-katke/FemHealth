// src/Landing/JSX/Cont/HealthGraphs.jsx
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
import { useFemHealth } from '../../../../contexts/FemHealthContext';
import styles from '../CSS/Dashboard.module.css';

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Filler);

// your mood categories
const moodCategories = ['Happy', 'Sad', 'Irritable', 'Anxious'];

const HealthGraphs = ({ chartType = 'mood' }) => {
  const { cycleEntries } = useFemHealth();
  const [showModal, setShowModal] = useState(false);
  const [chartView, setChartView] = useState(chartType);

  // derive mood entries
  const moodEntries = cycleEntries
    .filter(e => e.mood)
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  const flowEntries = cycleEntries
    .filter(e => e.flow)
    .sort((a, b) => new Date(a.date) - new Date(b.date));
  const flowLabels = flowEntries.map(e =>
    new Date(e.date).toLocaleDateString('en-US', { weekday: 'short' })
  );
  const flowData = flowEntries.map(e => e.flow);

  const moodLabels = moodEntries.map(e =>
    new Date(e.date).toLocaleDateString('en-US', { weekday: 'short' })
  );
  const moodData = moodEntries.map(e => e.mood);

  // static flow data (you can replace with dynamic later)
  const flowOptions = {
    title: 'Period Flow Trend',
    labels: flowLabels,
    data: flowData,
    label: 'Flow Intensity',
  };

  // choose config
  const config =
    chartView === 'mood'
      ? {
          title: 'Mood Pattern',
          labels: moodLabels,
          data: moodData,
          label: 'Mood',
        }
      : flowOptions;

  // build chartData
  const chartData = {
    labels: config.labels,
    datasets: [
      {
        label: config.label,
        data: config.data,
        backgroundColor: '#7091E6',
        borderColor: '#3D52A0',
        fill: true,
        tension: 0.4,
      },
    ],
  };  

  // conditional chartOptions
  const chartOptions = {
    responsive: true,
    scales: {
      y: chartView === 'mood'
        ? {
            type: 'category',
            labels: moodCategories,
          }
        : {
            beginAtZero: true,
            type: 'linear',
          },
    },
  };

  return (
    <>
      <motion.div
        className={styles.graphWrapper}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        onClick={() => setShowModal(true)}
      >
        <h3>{config.title}</h3>
        <Line data={chartData} options={chartOptions} />
      </motion.div>

      {showModal && (
        <motion.div
          className={styles.modalOverlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setShowModal(false)}
        >
          <motion.div
            className={styles.modalContent}
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.9 }}
            onClick={e => e.stopPropagation()}
          >
            <div className={styles.modalHeader}>
              <h2>{config.title}</h2>
              <button
                className={styles.switchButton}
                onClick={() =>
                  setChartView(prev => (prev === 'mood' ? 'periodFlow' : 'mood'))
                }
              >
                Switch to {chartView === 'mood' ? 'Period Flow' : 'Mood'} Graph
              </button>
            </div>
            <Line data={chartData} options={chartOptions} />
            <button
              className={styles.closeModal}
              onClick={() => setShowModal(false)}
            >
              ×
            </button>
          </motion.div>
        </motion.div>
      )}
    </>
  );
};

export default HealthGraphs;