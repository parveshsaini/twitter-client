import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { Toaster } from 'react-hot-toast'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <GoogleOAuthProvider clientId="300684891935-dr7na3rk5bq91938g63vlg254tn8v9mu.apps.googleusercontent.com">
    <React.StrictMode>
      <App />
      <Toaster />
    </React.StrictMode>
  </GoogleOAuthProvider>
)
