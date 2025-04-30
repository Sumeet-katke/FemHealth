import React, { useState } from 'react';

import styles from '../CSS/RegisterModal.module.css';
import logo from '../../assets/logo.png'
import { GoogleLogin } from '@react-oauth/google';
import googleLogo from '../../assets/google.svg';

const RegisterModal = ({ onClose }) => {
    const [form, setForm] = useState({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      age: '',
      weight: '',
    });

    const handleChange = (e) => {
      const { name, value } = e.target;
      setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.post('/register', form);
        console.log('Registered:', response.data);
        // optionally close modal or show success
        onClose();
      } catch (error) {
        console.error('Registration error:', error);
      }
    };

  const handleGoogleSuccess = credentialResponse => {
    console.log('Google user:', credentialResponse);
    // TODO: send credentialResponse.credential to your backend
  };
  const handleGoogleError = () => {
    console.error('Google Sign In was unsuccessful');
  };

  const handleFacebookResponse = response => {
    console.log('Facebook user:', response);
    // TODO: send response.accessToken to your backend
  };

  return (
    <section id='signin'>
    <div className={styles.modalOverlay} onClick={e => e.stopPropagation()}>
      <div className={styles.modalWrapper}>

        {/* Your leftBg, avatar, logo if you want to keep them */}
        <div className={styles.leftBg} />
      <img className={styles.avatar} src={logo} alt="User Avatar" />
      <div className={styles.logo}>FemHealth</div>
        <div className={styles.rightPanel}>
        <button className={styles.closeButton} onClick={onClose}>×</button>
          <div className={styles.heading}>Register</div>

          <form onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <input
              className={styles.input}
              type="text"
              name="firstName"
              placeholder=" "
              value={form.firstName}
              onChange={handleChange}
            />
            <label className={styles.floatingLabel}>First Name</label>
          </div>

          <div className={styles.inputGroup}>
            <input
              className={styles.input}
              type="text"
              name="lastName"
              placeholder=" "
              value={form.lastName}
              onChange={handleChange}
            />
            <label className={styles.floatingLabel}>Last Name</label>
          </div>

          <div className={styles.inputGroup}>
            <input
              className={styles.input}
              type="email"
              name="email"
              placeholder=" "
              value={form.email}
              onChange={handleChange}
            />
            <label className={styles.floatingLabel}>Email</label>
          </div>

          <div className={styles.inputGroup}>
            <input
              className={styles.input}
              type="tel"
              name="phone"
              placeholder=" "
              value={form.phone}
              onChange={handleChange}
            />
            <label className={styles.floatingLabel}>Phone Number</label>
          </div>

          <div className={styles.row}>
            <div className={`${styles.inputGroup} ${styles.inputGroupHalf}`}>
              <input
                className={styles.input}
                type="number"
                name="age"
                placeholder=" "
                value={form.age}
                onChange={handleChange}
              />
              <label className={styles.floatingLabel}>Age</label>
            </div>

            <div className={`${styles.inputGroup} ${styles.inputGroupHalf}`}>
              <input
                className={styles.input}
                type="number"
                name="weight"
                placeholder=" "
                value={form.weight}
                onChange={handleChange}
              />
              <label className={styles.floatingLabel}>Weight</label>
            </div>
          </div>

          <button className={styles.registerButton} type="submit">Register</button>
          </form>

          <div className={styles.socialSignup}>
      <GoogleLogin
        onSuccess={handleGoogleSuccess}
        onError={handleGoogleError}
        render={renderProps => (
          <button className={styles.socialButton} onClick={renderProps.onClick} disabled={renderProps.disabled}>
            <img src={googleLogo} alt="Google" className={styles.socialIcon} />
            <span>Sign up with Google</span>
          </button>
        )}
      />
      {/* <FacebookLogin
        appId="YOUR_FACEBOOK_APP_ID"
        callback={handleFacebookResponse}
        render={renderProps => (
          <button className={styles.socialButton} onClick={renderProps.onClick}>
            <img src={facebookLogo} alt="Facebook" className={styles.socialIcon} />
            <span>Sign up with Facebook</span>
          </button>
        )}
      /> */}
    </div>
        </div>
      </div>
    </div>
    </section>
  );
};

export default RegisterModal;