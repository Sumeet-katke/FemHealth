// src/Components/Dashboard/PeriodCalendar.jsx
import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import styles from '../CSS/PeriodCalendar.module.css';

const PeriodCalendar = () => {
  return (
    <div className={styles.calendarWrapper}>
      <h3>Period Tracker</h3>
      <Calendar />
    </div>
  );
};

export default PeriodCalendar;