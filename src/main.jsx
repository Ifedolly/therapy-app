import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './styles/layout.css'
import App from './App.jsx'

console.log("ENV TEST:", import.meta.env.VITE_FIREBASE_PROJECT_ID)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
