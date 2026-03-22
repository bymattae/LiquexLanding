import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import { AppShell } from './components/ui/app-shell.tsx'
import IBsPage from './pages/IBsPage.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<AppShell />}>
          <Route path="/" element={<App />} />
          <Route path="/ibs" element={<IBsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
