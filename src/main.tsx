import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './theme/tokens.css'
import App from './App.tsx'
import { PhoneFrame } from './components/PhoneFrame'
import { assetUrl } from './lib/assetUrl'

document.documentElement.style.setProperty(
  '--bg-image',
  `url(${assetUrl('assets/backgrounds/sky_daytime.png')})`,
)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PhoneFrame>
      <App />
    </PhoneFrame>
  </StrictMode>,
)
