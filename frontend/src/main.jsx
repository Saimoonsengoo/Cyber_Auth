import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Routes from './routers/index.router'
import { AuthContextProvider } from './contexts/AuthContext'

createRoot(document.getElementById('root')).render(
  <AuthContextProvider>
    <Routes />
  </AuthContextProvider>,
)
