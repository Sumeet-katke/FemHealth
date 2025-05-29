// src/Landing/JSX/Cont/PCOSPrediction.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import styles from '../CSS/PCOSPrediction.module.css';
import { useFemHealth } from '../../../../contexts/FemHealthContext';

// Blood‐group dropdown options & numeric mapping
const bloodGroupOptions = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
const bloodGroupMap = {
  'A+': 11, 'A-': 12,
  'B+': 13, 'B-': 14,
  'O+': 15, 'O-': 16,
  'AB+': 17, 'AB-': 18
};

// Progress-bar styling helper (retain your ambient glow logic)
const getBarStyle = (value) => {
  let color = '#EDE8F5';
  if (value <= 50) color = '#3D52A0';
  else if (value <= 70) color = '#8697C4';
  else if (value <= 85) color = '#7091E6';
  else color = '#3D52A0';
  return {
    backgroundColor: color,
    boxShadow: `0 0 10px 2px ${color}55`,
  };
};

// Step-by-step questions (16 user-answerable features)
const questions = [
  { label: 'What is your age?',            type: 'number', name: 'age',           validation: v => v > 0 },
  { label: 'What is your weight (kg)?',    type: 'number', name: 'weight',        validation: v => v > 0 },
  { label: 'What is your height (cm)?',    type: 'number', name: 'height',        validation: v => v > 0 },
  { label: 'What is your blood group?',   type: 'select', name: 'bloodGroup',    options: bloodGroupOptions,
                                           validation: v => bloodGroupOptions.includes(v) },
  { label: 'Is your cycle Regular or Irregular?', type: 'select', name: 'cycleType',
                                           options: ['R','I'], displayOptions: ['Regular','Irregular'],
                                           validation: v => ['R','I'].includes(v) },
  { label: 'Your menstrual cycle length (days)?',   type: 'number', name: 'cycleLength',    validation: v => v > 0 },
  { label: 'How long have you been married for (0 for unmarried)?',              type: 'number', name: 'marriedYears',   validation: v => v >= 0 },
  { label: 'Have you ever been pregnant?',type: 'select', name: 'pregnant',
                                           options: ['Yes','No'], validation: v => ['Yes','No'].includes(v) },
  { label: 'How many number of abortions have you had?',        type: 'number', name: 'abortions',      validation: v => v >= 0 },
  { label: 'Are you experiencing  weight gain lately?',    type: 'select', name: 'weightGain',
                                           options: ['Yes','No'], validation: v => ['Yes','No'].includes(v) },
  { label: 'Are you experiencing Excess hair growth lately?',         type: 'select', name: 'hairGrowth',
                                           options: ['Yes','No'], validation: v => ['Yes','No'].includes(v) },
  { label: 'Are you experiencing Skin darkening lately?',             type: 'select', name: 'skinDarkening',
                                           options: ['Yes','No'], validation: v => ['Yes','No'].includes(v) },
  { label: 'Are you experiencing Hair loss lately?',                  type: 'select', name: 'hairLoss',
                                           options: ['Yes','No'], validation: v => ['Yes','No'].includes(v) },
  { label: 'Are you getting pimples recently?',                    type: 'select', name: 'pimples',
                                           options: ['Yes','No'], validation: v => ['Yes','No'].includes(v) },
  { label: 'Eat fast food frequently?',   type: 'select', name: 'fastFood',
                                           options: ['Yes','No'], validation: v => ['Yes','No'].includes(v) },
  { label: 'Exercise regularly?',         type: 'select', name: 'exercise',
                                           options: ['Yes','No'], validation: v => ['Yes','No'].includes(v) },
];

const PCOSPrediction = () => {
  const { risk, Hormonal, CycleIrregularity, APIFetcher, setRisk, setHormonal, setCycleIrregularity } = useFemHealth();

  // Initial three predictions from context
  const [predictions, setPredictions] = useState([
    { label: 'Risk Level',           value: risk },
    { label: 'Hormonal Imbalance',   value: Hormonal },
    { label: 'Cycle Irregularity',   value: CycleIrregularity },
  ]);
  const [animatedValues, setAnimatedValues] = useState(predictions.map(() => 0));

  // Form state
  const [formData, setFormData] = useState(() => {
    const init = {};
    questions.forEach(q => { init[q.name] = ''; });
    return init;
  });
  const [currentStep, setCurrentStep] = useState(0);
  const [errors, setErrors] = useState({});
  const [modalOpen, setModalOpen] = useState(false);

  // Animate progress bars when predictions change
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimatedValues(prev =>
        prev.map((v,i) => Math.min(v + 1, predictions[i].value))
      );
    }, 20);
    return () => clearInterval(interval);
  }, [predictions]);

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData(fd => ({ ...fd, [name]: value }));
  };

  const handleNextStep = e => {
    e.preventDefault();
    const q = questions[currentStep];
    const val = formData[q.name];
    if (!q.validation(val)) {
      setErrors({ [q.name]: 'Invalid input' });
      return;
    }
    setErrors({});
    if (currentStep < questions.length - 1) {
      setCurrentStep(cs => cs + 1);
    } else {
      submitForm();
    }
  };

  const submitForm = async () => {
    setModalOpen(false);
    // Map formData → payload
    const payload = { ...formData };
    payload.bloodGroup = bloodGroupMap[formData.bloodGroup];
    // Everything else stays string as collected

    try {
      const res = await APIFetcher({
        url: 'http://127.0.0.1:5000/api/predict-pcos/',
        method: 'POST',
        body: JSON.stringify(payload),
        needAuth: true
      });
      if (res.status === 200) {
        setPredictions(res.data.predictions);
        setAnimatedValues(res.data.predictions.map(() => 0));

        const preds = res.data.predictions;

        // setRisk(preds[0].value);
        // setHormonal(preds[1].value);
        // setCycleIrregularity(parseInt(preds[2].value));
        const parsedPreds = preds.map(p => ({
          label: p.label,
          value: parseFloat(p.value) || 0   // fallback to 0 if parse fails
        }));

        setPredictions(parsedPreds);
        setAnimatedValues(parsedPreds.map(() => 0));

        setRisk(parsedPreds[0].value);
        setHormonal(parsedPreds[1].value);
        setCycleIrregularity(parsedPreds[2].value);
      }
    } catch (err) {
      console.error('Prediction failed', err);
    }
  };
  const updateData = async () => {
    try {
      const res = await APIFetcher({
        url: 'http://127.0.0.1:5000/api/predict-pcos/',
        method: 'GET',
        needAuth: true      // no `body` here
      });
      if (res.status === 200) {
        const _preds = res.data.predictions;
        const parsedPreds = _preds.map(p => ({
          label: p.label,
          value: parseFloat(p.value) || 0   // fallback to 0 if parse fails
        }));
        setPredictions(parsedPreds);
        setAnimatedValues(parsedPreds.map(() => 0));

        const preds = parsedPreds;
        setRisk(preds[0].value);
        setHormonal(preds[1].value);
        setCycleIrregularity(parseFloat(preds[2].value));
      }
    } catch (err) {
      console.error('Fetch failed', err);
    }
  };
  
  useEffect(() => {
    updateData();
  }, []);

  return (
    <motion.div
      className={styles.predictionContainer}
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className={styles.heading}>PCOS Prediction</h2>

      {/* Progress bars (retain original styling & animation) */}
      <div className={styles.bars}>
        {predictions.map((item, i) => (
          <div key={i} className={styles.barGroup}>
            <div className={styles.label}>
              {item.label}
              <span className={styles.percentageText}>
                {parseFloat(animatedValues[i])}%
              </span>
            </div>
            <div className={styles.progressWrapper}>
            <motion.div
              className={styles.progress}
                initial={{ width: '0%' }}
                animate={{ width: `${item.value ?? 0}%` }}
                transition={{ duration: 1 + i * 0.2 }}
                style={getBarStyle(item.value)}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Take Test button */}
      <button
        onClick={() => { setModalOpen(true); setCurrentStep(0); }}
        className={styles.takeTestButton}
      >
        Take the PCOS Test
      </button>

      {/* Modal Form */}
      {modalOpen && (
        <motion.div
          className={styles.modalOverlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            className={styles.modalContent}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
          >
            <button
              className={styles.closeModal}
              onClick={() => setModalOpen(false)}
            >
              ×
            </button>
            <h2 className={styles.formHeading}>AI-Powered PCOS Test</h2>

            <h3 className={styles.stepTitle}>
              {questions[currentStep].label}
            </h3>

            {questions[currentStep].type === 'select' ? (
              <select
                name={questions[currentStep].name}
                value={formData[questions[currentStep].name]}
                onChange={handleInputChange}
                className={styles.selectField}
              >
                <option value="">Select...</option>
                {questions[currentStep].options.map((opt, idx) => (
                  <option key={idx} value={opt}>
                    {questions[currentStep].displayOptions
                      ? questions[currentStep].displayOptions[idx]
                      : opt}
                    {questions[currentStep].name === 'bloodGroup'
                      ? ` (${opt})`
                      : ''}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type={questions[currentStep].type}
                name={questions[currentStep].name}
                value={formData[questions[currentStep].name]}
                onChange={handleInputChange}
                className={styles.inputField}
              />
            )}
            {errors[questions[currentStep].name] && (
              <div className={styles.errorText}>
                {errors[questions[currentStep].name]}
              </div>
            )}

            <button
              onClick={handleNextStep}
              className={styles.nextButton}
            >
              {currentStep === questions.length - 1 ? 'Submit' : 'Next'}
            </button>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default PCOSPrediction;