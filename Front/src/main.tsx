import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './css/index.css';
import App from './App.tsx';
import { AppointmentProvider } from './context/AppointmentContext';
import { AuthProvider } from './context/AuthContext';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <AppointmentProvider>
        <App />
      </AppointmentProvider>
    </AuthProvider>
  </StrictMode>
);
