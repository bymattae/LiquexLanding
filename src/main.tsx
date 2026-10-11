import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import './index.css'
import { AppShell } from './components/ui/app-shell.tsx'
import IBsPage from './pages/IBsPage.tsx'
import { ConvertPage, GrowPage, RetainPage, VerifyPage } from './pages/stages.tsx'
import { PrivacyPage, TermsPage } from './pages/legal.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<AppShell />}>
          <Route path="/" element={<IBsPage />} />
          <Route path="/grow" element={<GrowPage />} />
          <Route path="/convert" element={<ConvertPage />} />
          <Route path="/verify" element={<VerifyPage />} />
          <Route path="/retain" element={<RetainPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/affiliateos" element={<Navigate to="/" replace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
