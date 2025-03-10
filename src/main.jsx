import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import OBR from '@owlbear-rodeo/sdk'
import './index.css'
import App from './App.jsx'
import { setupContextMenu } from './contextMenu.js'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

OBR.onReady(() => {
  setupContextMenu();
})