import { StrictMode, lazy, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

const AdminApp = lazy(() => import('./admin/AdminApp.jsx'))

const isAdmin = typeof window !== 'undefined' && window.location.hash === '#admin'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {isAdmin
      ? <Suspense fallback={<div style={{color:'#c9a96e',padding:'2rem',fontFamily:'sans-serif'}}>Loading admin…</div>}><AdminApp /></Suspense>
      : <App />
    }
  </StrictMode>,
)
