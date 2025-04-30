import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { StateProvider } from './helper.jsx';

createRoot(document.getElementById('root')).render(
  <StateProvider>
    <StrictMode>
      <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
      <App />
      </GoogleOAuthProvider>
    </StrictMode>
  </StateProvider>

)
