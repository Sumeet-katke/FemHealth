import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { createContext } from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import { redirect } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const FemHealthContext = createContext();

export const APIFetcher = async ({ url, method = 'GET', body = null, headers = {}, needAuth = false }) => {
  try {
    const token = needAuth ? Cookies.get('access_token') : null;
    
    const config = {
      method,
      url,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
        ...(needAuth && token ? { 'Authorization': `Bearer ${token}` } : {}),
      },
      data: body,
    };
    
    const response = await axios(config);
    console.log('API Response:', response.data, response.status)
    return response;
  } catch (error) {
    console.error('API Error:', error);
    return { error: error.response?.data?.message || error.message };
  }
};

export const FemHealthProvider = ({ children }) => {
  // User's health data
  const [age, setAge] = useState(null);
  const [weight, setWeight] = useState(null);
  const [height, setHeight] = useState(null);
  const [cycleType, setCycleType] = useState('');
  const [cycleLength, setCycleLength] = useState(28);
  const [marriedYears, setMarriedYears] = useState('');
  const [pregnant, setPregnant] = useState('');
  const [abortions, setAbortions] = useState('');
  const [symptoms, setSymptoms] = useState(['Sad', 'Happy']);
    const navigate = useNavigate();

  // Periods related data
  const [dayInCycle, setDayInCycle] = useState(6);
  const [mood, setMood] = useState('Irritable');

  //PCOS prediction related data
  const [risk, setRisk] = useState(0);
  const [Hormonal, setHormonal] = useState(0);
  const [cycleIrregularity, setCycleIrregularity] = useState(0);
  
  //PCOS detection related data
  const [score, setScore] = useState(0);
  const [resultLabel, setResultLabel] = useState(null);
  const [confidence, setConfidence] = useState(0);

  // Prediction and Detection Results
  const [predictionResult, setPredictionResult] = useState(null);
  const [detectionResult, setDetectionResult] = useState(null);

  // Modal visibility states
  const [isPredictionModalOpen, setIsPredictionModalOpen] = useState(false);
  const [isDetectionModalOpen, setIsDetectionModalOpen] = useState(false);

  // Loading states for prediction and detection
  const [isPredictionLoading, setIsPredictionLoading] = useState(false);
  const [isDetectionLoading, setIsDetectionLoading] = useState(false);

  // Error handling state
  const [error, setError] = useState(null);

  // User authentication state
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [refreshToken, setRefreshToken] = useState(null);
    const [accessToken, setAccessToken] = useState(null);

  // Login/Registration data
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const updateUserData = async (userData) => {
    // Store tokens in cookies
    Cookies.set('access_token', userData.access_token);
    Cookies.set('refresh_token', userData.refresh_token);

    // Update the user data (e.g., age, weight, etc.)
    setAge(userData.age);
    setWeight(userData.weight);
    setHeight(userData.height);
    setCycleType(userData.cycleType);
    setCycleLength(userData.cycleLength);
    setMarriedYears(userData.marriedYears);
    setPregnant(userData.pregnant);
    setAbortions(userData.abortions);
    setSymptoms(userData.symptoms);

    //Token
    setAccessToken(userData.access_token);
    setRefreshToken(userData.refresh_token);
    setIsAuthenticated(true);  // Set authenticated state to true


    // Optionally, handle prediction and detection results if needed
    setPredictionResult(userData.predictionResult);
    setDetectionResult(userData.detectionResult);
  };

  const checkAndUpdateToken = async (setAccessToken, setIsAuthenticated) => {
    const accessToken = Cookies.get('access_token');
    const refreshToken = Cookies.get('refresh_token');
  
    // If there's no access token, we don't need to check for expiration
    if (!accessToken || !refreshToken) {
      setIsAuthenticated(false);
      return;
    }
  
    try {
      const response = await axios.post('https://femhealth-backend.onrender.com/api/token/refresh/', {
        refresh_token: refreshToken,
      });
  
      // If refresh token is valid and we get a new access token
      if (response.status === 200 && response.data.access_token) {
        // Update the access token in cookies and the state
        Cookies.set('access_token', response.data.access_token);
        setAccessToken(response.data.access_token);
        setIsAuthenticated(true);
        console.log('Access token refreshed successfully');
      } else {
        // If refresh token is invalid or expired, log out the user
        // setIsAuthenticated(false);
        // Cookies.remove('access_token');
        // Cookies.remove('refresh_token');
      }
    } catch (error) {
      console.error('Token refresh failed:', error);
      setIsAuthenticated(false);
      Cookies.remove('access_token');
      Cookies.remove('refresh_token');
    }
  };

  // useEffect(() => {
  //   const access_token = Cookies.get('access_token');
  //   const refresh_token = Cookies.get('refresh_token');

  //   if (access_token && refresh_token) {
  //     setIsAuthenticated(true);
  //     setAccessToken(access_token);
  //   } else {
  //     setIsAuthenticated(false);
  //   }

  //   // Set interval to check token validity every 4 minutes (240000ms)
  //   const intervalId = setInterval(() => {
  //     checkAndUpdateToken(setAccessToken, setIsAuthenticated);
  //   }, 240000); // 4 minutes

  //   // Cleanup the interval when the component is unmounted
  //   return () => clearInterval(intervalId);
  // }, []);

  const handleLogin = async (loginData) => {
    try {
      const response = await APIFetcher({
        url: 'https://femhealth-backend.onrender.com/api/login/',  // Update with your backend API URL
        method: 'POST',
        body: loginData,
      });

      if (response.status !== 200) {
        console.error('Login failed:', response);  
        return;  
      }
      console.log('Login Successful:', response.data);
      if (response.data.access_token && response.data.refresh_token) {
        updateUserData(response.data);  // Update user data and tokens on successful login
      }
      navigate('/dashboard');  // Redirect to dashboard after successful login
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  useEffect(() => {
    const access_token = Cookies.get('access_token');
    const refresh_token = Cookies.get('refresh_token');
    // Check if tokens exist in cookies
    if (access_token && refresh_token) {
   
        setIsAuthenticated(true);  // Set authenticated state to true
        setAccessToken(access_token);  // Set access token
        setRefreshToken(refresh_token);  // Set refresh token
        // Optionally, you can fetch user data here if needed
    } else {
        setIsAuthenticated(false);
        handleLogout();  // Set authenticated state to false
    }
  }, []);

  const handleLogout = () => {
    // Clear user data and tokens
    setAge(null);
    setWeight(null);
    setHeight(null);
    setCycleType('');
    setCycleLength(28);
    setMarriedYears('');
    setPregnant('');
    setAbortions('');
    setSymptoms([]);
    
    Cookies.remove('access_token');
    Cookies.remove('refresh_token');

    navigate('/')  // Redirect to home page after logout
  }

  const handleRegister = async (registrationData) => {
    try {
      const response = await APIFetcher({
        url: 'https://femhealth-backend.onrender.com/api/register/',  // Update with your backend API URL
        method: 'POST',
        body: registrationData,
      });
      console.log('Registration Successful:', response.data);
      if (response.data.access_token && response.data.refresh_token) {
        updateUserData(response.data);  // Update user data and tokens on successful registration
      }
    } catch (error) {
      console.error('Registration error:', error);
    }
  };

  // Function to open the prediction modal
  const openPredictionModal = () => setIsPredictionModalOpen(true);
  const closePredictionModal = () => setIsPredictionModalOpen(false);

  // Function to open the detection modal
  const openDetectionModal = () => setIsDetectionModalOpen(true);
  const closeDetectionModal = () => setIsDetectionModalOpen(false);
  const [cycleEntries, setCycleEntries] = useState([]);

  // fetch all cycle entries and store in context
  const fetchCycleEntries = async () => {
    const res = await APIFetcher({
      url: 'https://femhealth-backend.onrender.com/api/daily-entry/',
      method: 'GET',
      needAuth: true,
    });
    if (!res.error && res.status === 200) {
      setCycleEntries(res.data);
    }
  };

  const PredictPeriod = async () => {

    const res = await APIFetcher({
      url: 'https://femhealth-backend.onrender.com/api/predict-period/',  // Update with your backend API URL
      method: 'GET',
      needAuth: true,
    });
  //   {
  //     "day_of_period": 5,
  //     "cycle_type": "Regular",
  //     "next_period_in_days": 24,
  //     "predicted_cycle_length": 28,
  //     "predicted_next_period_date": "2025-05-29",
  //     "latest_mood": "Irritable",
  //     "latest_symptoms": [
  //         "Headache",
  //         "Bloating",
  //         "Fatigue"
  //     ]
  // }
    if (res.status === 200) {
      setDayInCycle(res.data.day_of_period);
      setCycleType(res.data.cycle_type);
      setCycleLength(res.data.predicted_cycle_length);
      setMood(res.data.latest_mood);
      setSymptoms(res.data.latest_symptoms);
    }
    if (res.status !== 200) {
      console.error('Prediction failed:', res);
      return;
    }
  };
  const updateScore = async () => {
    const token = Cookies.get('access_token') ?Cookies.get('access_token') : null;

    try {
      const res = await fetch('https://femhealth-backend.onrender.com/api/pcos-detect/', {
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
  

  // load on mount
  useEffect(() => {
    fetchCycleEntries();
    PredictPeriod();
    updateScore();
  }, []);

  return (
    <FemHealthContext.Provider
      value={{
        // User's health data
        age,
        weight,
        height,
        cycleType,
        cycleLength,
        dayInCycle,
        marriedYears,
        pregnant,
        abortions,
        symptoms,
        mood,
        predictionResult,
        detectionResult,
        isPredictionModalOpen,
        isDetectionModalOpen,
        isPredictionLoading,
        isDetectionLoading,
        error,

        // User authentication
        isAuthenticated,
        refreshToken,
        accessToken,
        email,
        password,

        cycleEntries,
        fetchCycleEntries,

        //PCOS prediction related data
        risk,
        Hormonal,
        cycleIrregularity,
        setRisk,
        setHormonal,
        setCycleIrregularity,

        //PCOS detection related data
        score,
        resultLabel,
        confidence,
        setScore,
        setResultLabel,
        setConfidence,
        
        // API Fetcher
        APIFetcher,

        // Functions
        updateUserData,
        handleLogin,
        handleLogout,
        handleRegister,
        openPredictionModal,
        closePredictionModal,
        openDetectionModal,
        closeDetectionModal,
      }}
    >
      {children}
    </FemHealthContext.Provider>
  );
};

export const useFemHealth = () => {
  return React.useContext(FemHealthContext);
};