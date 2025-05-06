import React, { useState } from 'react';
import styles from '../CSS/RegisterModal.module.css';
import logo from '../../assets/logo.png';
import { GoogleLogin } from '@react-oauth/google';
import googleLogo from '../../assets/google.svg';
import { useFemHealth } from '../../contexts/FemHealthContext';
import { u } from 'framer-motion/client';

const LoginModal = ({ onClose }) => {
  const { setUser, APIFetcher, handleLogin, updateUserData } = useFemHealth();
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation checks
    if (!form.email || !form.password) {
      alert('Please fill out both email and password');
      return;
    }

    try {
      const response = await handleLogin(form);
      
      console.log('Login successful:', response);
      // Optionally close modal or show success
      // onClose();
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const handleGoogleSuccess = (credentialResponse) => {
    console.log('Google user:', credentialResponse);
    // TODO: send credentialResponse.credential to your backend
  };

  const handleGoogleError = () => {
    console.error('Google Sign In was unsuccessful');
  };

  return (
    <section id='login'>
      <div className={styles.modalOverlay} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalWrapper}>
          <div className={styles.leftBg} />
          <img className={styles.avatar} src={logo} alt='User Avatar' />
          <div className={styles.logo}>FemHealth</div>
          <div className={styles.rightPanel}>
            <button className={styles.closeButton} onClick={onClose}>
              ×
            </button>
            <div className={styles.heading}>Login</div>

            <form onSubmit={handleSubmit}>
              <div className={styles.inputGroup}>
                <input
                  className={styles.input}
                  type='email'
                  name='email'
                  placeholder=' '
                  value={form.email}
                  onChange={handleChange}
                />
                <label className={styles.floatingLabel}>Email</label>
              </div>

              <div className={styles.inputGroup}>
                <input
                  className={styles.input}
                  type='password'
                  name='password'
                  placeholder=' '
                  value={form.password}
                  onChange={handleChange}
                />
                <label className={styles.floatingLabel}>Password</label>
              </div>

              <button className={styles.registerButton} type='submit'>
                Login
              </button>
            </form>

            <div className={styles.socialSignup}>
              <GoogleLogin
                className={styles.Google}
                onSuccess={handleGoogleSuccess}
                onError={handleGoogleError}
                render={(renderProps) => (
                  <button
                    className={styles.socialButton}
                    onClick={renderProps.onClick}
                    disabled={renderProps.disabled}
                  >
                    <img src={googleLogo} alt='Google' className={styles.socialIcon} />
                    <span>Login with Google</span>
                  </button>
                )}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginModal;