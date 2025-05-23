// src/Landing/JSX/Cont/PCOSDetection.jsx
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from '../CSS/PCOSDetection.module.css';
import { CircleLoader } from 'react-spinners';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Cookies from 'js-cookie';
import { useFemHealth } from '../../../../contexts/FemHealthContext';

const PCOSDetection = () => {
  const [file, setFile] = useState(null);
  const [previewURL, setPreviewURL] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  // pull from context
  const {
    score,              // raw 0–1 probability
    resultLabel,        // "PCOS Detected" / "PCOS Not Detected"
    setScore,
    setResultLabel
  } = useFemHealth();

  // derive 0–100% for the ring
  const percentage = React.useMemo(() => {
    if (score == null) return 0;
    // if detected, confidence = (1 - score)*100, else score*100
    return Math.round(
      resultLabel === 'PCOS Detected'
        ? (1 - score) * 100
        : score * 100
    );
  }, [score, resultLabel]);

  const token = Cookies.get('access_token');

  const handleImageChange = e => {
    const f = e.target.files[0];
    if (!f) return;
    setFile(f);
    setPreviewURL(URL.createObjectURL(f));
    setResultLabel(null);
    setScore(null);
  };

  const handleDetect = async () => {
    if (!file) {
      alert('Please upload an image first');
      return;
    }
    setIsProcessing(true);
    try {
      const form = new FormData();
      form.append('image', file);

      const res = await fetch('http://127.0.0.1:5000/api/pcos-detect/', {
        method: 'POST',
        headers: {
          'Authorization': token ? `Bearer ${token}` : ''
        },
        body: form
      });
      if (!res.ok) throw new Error(`Server returned ${res.status}`);
      const data = await res.json();
      // save into context
      setResultLabel(data.label);
      setScore(data.score);
    } catch (err) {
      console.error(err);
      setResultLabel('Error detecting');
      setScore(0);
    } finally {
      setIsProcessing(false);
    }
  };

  const updateScore = async () => {
    try {
      const res = await fetch('http://127.0.0.1:5000/api/pcos-detect/', {
        method: 'GET',
        headers: {
          'Authorization': token ? `Bearer ${token}` : '',
          'Content-Type': 'application/json'
        }
      });
  
      if (!res.ok) {
        console.error('Failed to fetch latest detection:', res.status, res.statusText);
        return;
      }
  
      const data = await res.json();
      // data comes back as your PCOSDetectionSerializer, e.g.
      // {
      //   id, user, image, score, label, created_at
      // }
      setScore(data.score);
      setResultLabel(data.label);
    } catch (err) {
      console.error('Error updating score:', err);
    }
  };

  useEffect(() => {updateScore();}, []);

  return (
    <div className={styles.detectionCard}>
      <motion.div
        className={styles.detectionContainer}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* -- Ring + Label on Main Card -- */}

        <h2 className={styles.heading}>
          PCOS Detection from Ultrasound
        </h2>
        {resultLabel && (
          <div className={styles.mainRingSection}>
            <CircularProgressbar
              value={percentage}
              text={`${percentage}%`}
              styles={{
                path: {
                  stroke:
                    resultLabel === 'PCOS Detected'
                      ? '#FF5733'
                      : '#4BB543'
                },
                trail: { stroke: '#EDE9F5' },
                text: {
                  fill: '#3D52A0',
                  fontSize: '20px',
                  fontWeight: 'bold'
                }
              }}
            />
            <div className={styles.mainStatusLabel}>
              {resultLabel}
            </div>
          </div>
        )}

        <button
          className={styles.detectButton}
          onClick={() => setModalOpen(true)}
        >
          Start Detection
        </button>

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
                <button
                  className={styles.closeModal}
                  onClick={() => setModalOpen(false)}
                >
                  ×
                </button>

                {/* Upload Section */}
                <div className={styles.uploadSection}>
                  <label
                    htmlFor="image-upload"
                    className={styles.fileInputLabel}
                  >
                    Upload Ultrasound Image
                  </label>
                  <input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className={styles.fileInput}
                  />
                  {previewURL && (
                    <img
                      src={previewURL}
                      alt="preview"
                      className={styles.uploadedImage}
                    />
                  )}
                </div>

                {/* Loading State */}
                {isProcessing && (
                  <div className={styles.loadingContainer}>
                    <CircleLoader
                      color="#3D52A0"
                      loading={true}
                      size={50}
                    />
                  </div>
                )}

                {/* Modal Result */}
                {!isProcessing && resultLabel && (
                  <div className={styles.resultSection}>
                    <h3>{resultLabel}</h3>
                    <CircularProgressbar
                      value={percentage}
                      text={`${percentage}%`}
                      styles={{
                        path: {
                          stroke:
                            resultLabel === 'PCOS Detected'
                              ? '#FF5733'
                              : '#4BB543'
                        },
                        trail: { stroke: '#EDE9F5' },
                        text: {
                          fill: '#3D52A0',
                          fontSize: '24px',
                          fontWeight: 'bold'
                        }
                      }}
                    />
                  </div>
                )}

                {/* Detect Button */}
                {!isProcessing && !resultLabel && (
                  <button
                    className={styles.detectButton}
                    onClick={handleDetect}
                  >
                    🔍 Detect
                  </button>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default PCOSDetection;