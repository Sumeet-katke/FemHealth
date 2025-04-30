// // src/Landing/JSX/Cont
// import React, { useState } from 'react';
// import Calendar from 'react-calendar';
// import { motion } from 'framer-motion';
// import 'react-calendar/dist/Calendar.css'; 
// import styles from '../CSS/PeriodTracker.module.css';

// const PeriodTracker = () => {
//   const [selectedDate, setSelectedDate] = useState(new Date());

//   const handleDateChange = (date) => {
//     setSelectedDate(date);
//   };

//   return (
//     <motion.div 
//       className={styles.trackerContainer}
//       initial={{ opacity: 0, y: 30 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.6 }}
//     >
//       <h2 className={styles.heading}>Period Tracker</h2>
//       <Calendar
//         onChange={handleDateChange}
//         value={selectedDate}
//         className={styles.customCalendar}
//         tileClassName={({ date, view }) => 
//           view === 'month' && (date.getDate() % 7 === 0) ? styles.periodDay : null
//         }
//       />
//     </motion.div>
//   );
// };

// export default PeriodTracker;
import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import { motion, AnimatePresence } from 'framer-motion';
import 'react-calendar/dist/Calendar.css';
import styles from '../CSS/PeriodTracker.module.css'; // Use consistent styling

const PeriodTracker = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showModal, setShowModal] = useState(false);
  const [entries, setEntries] = useState([{ date: '', flow: '' }]);
  const [periodData, setPeriodData] = useState({});

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('periodData');
    if (saved) setPeriodData(JSON.parse(saved));
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('periodData', JSON.stringify(periodData));
  }, [periodData]);

  const handleDateClick = (date) => {
    setSelectedDate(date);
    setEntries([{ date: date.toISOString().split('T')[0], flow: '' }]);
    setShowModal(true);
  };

  const handleChange = (index, field, value) => {
    const updated = [...entries];
    updated[index][field] = value;
    setEntries(updated);
  };

  const addMoreEntry = () => {
    setEntries([...entries, { date: '', flow: '' }]);
  };

  const saveEntries = () => {
    const updatedData = { ...periodData };
    entries.forEach(({ date, flow }) => {
      if (date && flow) {
        updatedData[new Date(date).toDateString()] = { flow: Number(flow) };
      }
    });
    setPeriodData(updatedData);
    setShowModal(false);
  };

  const tileClassName = ({ date, view }) => {
    const key = date.toDateString();
    if (view === 'month' && periodData[key]) {
      return styles.flowTile;
    }
    return null;
  };

  return (
    <motion.div
      className={styles.trackerContainer}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className={styles.heading}>🌸 Period Tracker</h2>

      <Calendar
        onClickDay={handleDateClick}
        value={selectedDate}
        tileClassName={tileClassName}
        className={styles.customCalendar}
      />

      <AnimatePresence>
      {showModal && (
  <motion.div
    className={styles.modalOverlay}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
  >
    <motion.div
      className={styles.modalContent}
      initial={{ scale: 0.7 }}
      animate={{ scale: 1 }}
      exit={{ scale: 0.7 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      onClick={(e) => e.stopPropagation()}
    >
      <h3 className="modalTitle">Add Period Entries</h3>
      {entries.map((entry, index) => (
        <div key={index} className={styles.modalEntry}>
          <label>Date</label>
          <input
            type="date"
            value={entry.date}
            onChange={(e) => handleChange(index, 'date', e.target.value)}
            className={styles.modalInput}
          />

          <label>Flow (1-5)</label>
          <input
            type="range"
            min="1"
            max="5"
            value={entry.flow}
            onChange={(e) => handleChange(index, 'flow', e.target.value)}
            className={styles.sliderInput}
          />
          <div className={styles.sliderLabel}>Intensity: {entry.flow}</div>
        </div>
      ))}

      <div className={styles.modalButtons}>
        <button onClick={addMoreEntry} className="modalBtn">+ Add More</button>
        <button onClick={saveEntries} className="modalBtn save">Save</button>
        <button onClick={() => setShowModal(false)} className="modalBtn cancel">Cancel</button>
      </div>
    </motion.div>
  </motion.div>
)}
      </AnimatePresence>
    </motion.div>
  );
};

export default PeriodTracker;