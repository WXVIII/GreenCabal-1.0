import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Toaster } from 'react-hot-toast';
import App from './App';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Toaster 
      position="top-right"
      toastOptions={{
        className: 'bg-[#022424] text-[#03ffc3] border border-[#03ffc3]/20',
        duration: 3000
      }}
    />
    <App />
  </StrictMode>
);