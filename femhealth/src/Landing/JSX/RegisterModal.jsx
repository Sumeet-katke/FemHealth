import React, { useState } from 'react';
import styles from '../CSS/RegisterModal.module.css';
import logo from '../../assets/logo.png';
import { GoogleLogin } from '@react-oauth/google';
import googleLogo from '../../assets/google.svg';
import { useFemHealth } from '../../contexts/FemHealthContext';

const RegisterModal = ({ onClose }) => {
  const { setUser, APIFetcher } = useFemHealth();
  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    age: '',
    weight: '',
    password: '',
    // gender: 'female', // Default gender set to female
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate age and weight
    if (form.age < 18 || form.age > 100) {
      alert('Please enter a valid age between 18 and 100');
      return;
    }

    if (form.weight < 30 || form.weight > 300) {
      alert('Please enter a valid weight between 30kg and 300kg');
      return;
    }

    try {
      const response = await APIFetcher({
        url: 'https://femhealth-backend.onrender.com/api/register/',
        method: 'POST',
        body: form,
      });
      console.log('Registered:', response.data);
      // Optionally close modal or show success
      // onClose();
    } catch (error) {
      console.error('Registration error:', error);
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
    <section id='signin'>
      <div className={styles.modalOverlay} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalWrapper}>
          <div className={styles.leftBg} />
          <img className={styles.avatar} src={logo} alt='User Avatar' />
          <div className={styles.logo}>FemHealth</div>
          <div className={styles.rightPanel}>
            <button className={styles.closeButton} onClick={onClose}>
              ×
            </button>
            <div className={styles.heading}>Register</div>

            <form onSubmit={handleSubmit}>
              <div className={styles.inputGroup}>
                <input
                  className={styles.input}
                  type='text'
                  name='first_name'
                  placeholder=' '
                  value={form.first_name}
                  onChange={handleChange}
                />
                <label className={styles.floatingLabel}>First Name</label>
              </div>

              <div className={styles.inputGroup}>
                <input
                  className={styles.input}
                  type='text'
                  name='last_name'
                  placeholder=' '
                  value={form.last_name}
                  onChange={handleChange}
                />
                <label className={styles.floatingLabel}>Last Name</label>
              </div>

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
                  type='tel'
                  name='phone'
                  placeholder=' '
                  value={form.phone}
                  onChange={handleChange}
                />
                <label className={styles.floatingLabel}>Phone Number</label>
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
              <div className={styles.row}>
                <div className={`${styles.inputGroup} ${styles.inputGroupHalf}`}>
                  <input
                    className={styles.input}
                    type='number'
                    name='age'
                    placeholder=' '
                    value={form.age}
                    onChange={handleChange}
                  />
                  <label className={styles.floatingLabel}>Age</label>
                </div>

                <div className={`${styles.inputGroup} ${styles.inputGroupHalf}`}>
                  <input
                    className={styles.input}
                    type='number'
                    name='weight'
                    placeholder=' '
                    value={form.weight}
                    onChange={handleChange}
                  />
                  <label className={styles.floatingLabel}>Weight</label>
                </div>
              </div>

      

              <button className={styles.registerButton} type='submit'>
                Register
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
                    <span>Sign up with Google</span>
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

export default RegisterModal;