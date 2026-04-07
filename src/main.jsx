import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles/globals.css'

console.log('VITE_SUPABASE_URL:', import.meta.env.VITE_SUPABASE_URL);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

// PWA 서비스 워커 등록
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('PWA SW registered: ', registration);
      })
      .catch(error => {
        console.log('PWA SW registration failed: ', error);
      });
  });
}