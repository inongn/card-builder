import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { registerSW } from 'virtual:pwa-register'
import './index.css'
import App from './App.jsx'
import { LocaleProvider } from './i18n.jsx'

registerSW({ immediate: true })

if (typeof document !== 'undefined' && document.fonts?.load) {
  document.fonts.load('0.75rem "Google Sans Flex"').catch(() => {});
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LocaleProvider>
      <App />
    </LocaleProvider>
  </StrictMode>,
)

