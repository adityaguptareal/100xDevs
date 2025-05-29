import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { DashboardProvider } from './Context/DashboardContext.tsx'
import { SidebarProvider } from './Context/SidebarContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SidebarProvider>
      <DashboardProvider>
        <App />
      </DashboardProvider>
    </SidebarProvider>

  </StrictMode>,
)
