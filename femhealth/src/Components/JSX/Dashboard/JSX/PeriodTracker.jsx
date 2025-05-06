// src/Landing/JSX/Cont/PeriodTracker.jsx
import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import { motion, AnimatePresence } from 'framer-motion';
import 'react-calendar/dist/Calendar.css';
import styles from '../CSS/PeriodTracker.module.css';
// import { useFemHealth } from '../Context/FemHealthContext'; // adjust path as needed
import { useFemHealth } from '../../../../contexts/FemHealthContext';

const moods = ['Happy', 'Sad', 'Irritable', 'Anxious'];
const symptoms = ['Cramps', 'Bloating', 'Headache', 'Fatigue'];

const PeriodTracker = () => {
  const { APIFetcher } = useFemHealth();

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showModal, setShowModal] = useState(false);
  const [entries, setEntries] = useState([{ date: '', flow: 1, mood: '', symptoms: [] }]);
  const [periodData, setPeriodData] = useState({});

  // Fetch all saved entries from backend on mount
  const fetchEntries = async () => {
    const res = await APIFetcher({
      url: 'http://127.0.0.1:5000/api/daily-entry/',
      method: 'GET',
      needAuth: true
    });
    if (!res.error && res.status === 200) {
      const mapping = {};
      res.data.forEach(entry => {
        const key = new Date(entry.date).toDateString();
        mapping[key] = {
          flow: entry.flow,
          mood: entry.mood,
          symptoms: entry.symptoms
        };
      });
      setPeriodData(mapping);
    }
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  const formatDate = date => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  };

  // const handleDateClick = date => {
  //   setSelectedDate(date);
  //   const formatted = formatDate(date);
  //   setEntries([{ date: formatted, flow: 1, mood: '', symptoms: [] }]);
  //   setShowModal(true);
  // };

    const handleDateClick = (date) => {
      setSelectedDate(date);
      const formatted = formatDate(date)  ;
      setEntries([{ date: formatted, flow: 1, mood: '', symptoms: [] }]);
      setShowModal(true);
    };

  const handleChange = (idx, field, value) => {
    const updated = [...entries];
    if (field === 'symptoms') {
      const list = updated[idx].symptoms;
      updated[idx].symptoms = list.includes(value)
        ? list.filter(s => s !== value)
        : [...list, value];
    } else {
      updated[idx][field] = value;
    }
    setEntries(updated);
  };

  const addMoreEntry = () => {
    setEntries([...entries, { date: '', flow: 1, mood: '', symptoms: [] }]);
  };

  const saveEntries = async () => {
    // POST the batch of entries to your API
    const res = await APIFetcher({
      url: 'http://127.0.0.1:5000/api/daily-entry/',
      method: 'POST',
      body: { entries },
      needAuth: true
    });

    if (!res.error && (res.status === 201 || res.status === 207)) {
      // refresh the calendar mapping
      await fetchEntries();
      setShowModal(false);
    } else {
      console.error('Failed to save entries:', res.error || res.data);
    }
  };

  const tileClassName = ({ date, view }) => {
    const key = date.toDateString();
    if (view === 'month' && periodData[key]) {
      const lvl = periodData[key].flow;
      if (lvl <= 2) return styles.flow_light;
      if (lvl === 3) return styles.flow_medium;
      return styles.flow_heavy;
    }
    return null;
  };

  const tileContent = ({ date }) => {
    const entry = periodData[date.toDateString()];
    return entry ? (
      <div
        className={styles.dot}
        title={`Flow: ${entry.flow}, Mood: ${entry.mood}, Symptoms: ${entry.symptoms.join(', ')}`}
      />
    ) : null;
  };

  return (
    <motion.div
      className={styles.trackerContainer}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className={styles.heading}>Period Tracker</h2>
      <Calendar
        onClickDay={handleDateClick}
        value={selectedDate}
        tileClassName={tileClassName}
        tileContent={tileContent}
        className={styles.customCalendar}
      />

      <AnimatePresence>
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
              initial={{ scale: 0.7 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.7 }}
              transition={{ type: 'spring', stiffness: 260, damping: 20 }}
              onClick={e => e.stopPropagation()}
            >
              <h3 className={styles.modalTitle}>Add Period Details</h3>

              {entries.map((entry, idx) => (
                <div key={idx} className={styles.modalEntry}>
                  <label>Date</label>
                  <input
                    type="date"
                    value={entry.date}
                    onChange={e => handleChange(idx, 'date', e.target.value)}
                    className={styles.modalInput}
                  />

                  <label>Flow Intensity</label>
                  <input
                    type="range"
                    min="1"
                    max="5"
                    value={entry.flow}
                    onChange={e => handleChange(idx, 'flow', e.target.value)}
                    className={styles.sliderInput}
                  />

                  <label>Mood</label>
                  <div className={styles.optionGroup}>
                    {moods.map(m => (
                      <button
                        key={m}
                        className={
                          entry.mood === m ? styles.activeOption : styles.optionBtn
                        }
                        onClick={() => handleChange(idx, 'mood', m)}
                      >
                        {m}
                      </button>
                    ))}
                  </div>

                  <label>Symptoms</label>
                  <div className={styles.optionGroup}>
                    {symptoms.map(s => (
                      <button
                        key={s}
                        className={
                          entry.symptoms.includes(s)
                            ? styles.activeOption
                            : styles.optionBtn
                        }
                        onClick={() => handleChange(idx, 'symptoms', s)}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              ))}

              <div className={styles.modalButtons}>
                <button onClick={addMoreEntry} className={styles.modalBtn}>
                  + Add More
                </button>
                <button
                  onClick={saveEntries}
                  className={`${styles.modalBtn} ${styles.save}`}
                >
                  Save
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className={`${styles.modalBtn} ${styles.cancel}`}
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default PeriodTracker;