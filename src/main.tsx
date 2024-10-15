import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import { store } from './state/store.ts'
import 'react-date-range/dist/styles.css' // main css file
import 'react-date-range/dist/theme/default.css'
import 'reset-css'
import 'react-toastify/dist/ReactToastify.css'
import './styles/index.scss'
import { ToastContainer } from 'react-toastify'
import './translations/config.ts'
import MainModal from './components/modal/index.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <Router>
        <App />
        <ToastContainer autoClose={3000} position="top-center" hideProgressBar />
        <MainModal />
      </Router>
    </Provider>
  </StrictMode>,
)
