import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './context/AuthContext.jsx'
import { RouteProvider } from './context/RouteContext.jsx'
import { CategoryProvider } from './context/CategoryContext.jsx'
import { TransactionProvider } from './context/TransactionContext.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Toaster
      position="bottom-right"
      reverseOrder={false}
      toastOptions={{
        style: {
          fontSize: '1rem',
          padding: '0.5rem 1rem',
        },
      }}
    />
    <AuthProvider>
      <RouteProvider>
        <CategoryProvider>
          <TransactionProvider>
            
            <App />
          </TransactionProvider>
        </CategoryProvider>
      </RouteProvider>
    </AuthProvider>
  </StrictMode>,
)
