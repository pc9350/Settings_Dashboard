import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import SettingsPage from './pages/SettingsPage'
import StatsPage from './pages/StatsPage'
import NotFoundPage from './pages/NotFoundPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="/settings" replace />} />
        <Route path="settings" element={<SettingsPage />} />
        <Route path="stats" element={<StatsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}

export default App 