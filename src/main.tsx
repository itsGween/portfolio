import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { inject } from '@vercel/analytics'
import { injectSpeedInsights } from '@vercel/speed-insights'
import './i18n/index'
import './index.css'
import App from './App'

inject()
injectSpeedInsights()

/* ── Easter egg console ── */
console.log(
  '%c\n' +
  '  ██████╗ ██╗    ██╗███████╗███████╗███╗   ██╗\n' +
  ' ██╔════╝ ██║    ██║██╔════╝██╔════╝████╗  ██║\n' +
  ' ██║  ███╗██║ █╗ ██║█████╗  █████╗  ██╔██╗ ██║\n' +
  ' ██║   ██║██║███╗██║██╔══╝  ██╔══╝  ██║╚██╗██║\n' +
  ' ╚██████╔╝╚███╔███╔╝███████╗███████╗██║ ╚████║\n' +
  '  ╚═════╝  ╚══╝╚══╝ ╚══════╝╚══════╝╚═╝  ╚═══╝\n\n' +
  '  Hey toi 👋  Tu inspectes le code — j\'adore ça.\n' +
  '  Je suis Gween, développeuse full-stack à Ottawa.\n' +
  '  gween.hkangah@gmail.com\n',
  'color: #ff9d3d; font-family: monospace; font-size: 12px;'
)

const root = document.getElementById('root')
if (!root) throw new Error('Root element not found')

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>
)
