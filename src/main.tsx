import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './theme/tokens.css'
import App from './App.tsx'
import { PhoneFrame } from './components/PhoneFrame'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PhoneFrame>
      <App />
    </PhoneFrame>
  </StrictMode>,
)
