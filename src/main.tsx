import React from 'react'

import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { Toaster } from 'react-hot-toast'
import {
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query'
import SocketContextProvider from './context/socket.tsx'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_OAUTH_CLIENT_ID}>
      <SocketContextProvider>
      <React.StrictMode>
        <App />
        <Toaster />
      </React.StrictMode>
      </SocketContextProvider>
    </GoogleOAuthProvider>
  </QueryClientProvider>
)
