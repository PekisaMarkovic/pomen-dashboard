import { StrictMode } from 'react'
import 'react-datepicker/dist/react-datepicker.css'
import { createRoot } from 'react-dom/client'
import 'react-toastify/dist/ReactToastify.css'
import 'reset-css'
import './styles/index.scss'
import './translations/config.ts'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <div>MRS TAMO SISO</div>
  </StrictMode>,
)
