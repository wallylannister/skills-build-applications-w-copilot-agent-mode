import { BrowserRouter, Routes, Route, NavLink, Navigate } from 'react-router-dom'
import Activities from './components/Activities'
import Leaderboard from './components/Leaderboard'
import Teams from './components/Teams'
import Users from './components/Users'
import Workouts from './components/Workouts'
import { getCodespaceNotice } from './lib/api'

function App() {
  return (
    <BrowserRouter>
      <div className="container py-4">
        <header className="mb-4">
          <h1>OctoFit Tracker</h1>
          <p className="lead">Modern multi-tier fitness tracking experience.</p>
          <p className="text-muted small">{getCodespaceNotice()}</p>
        </header>

        <nav className="mb-4">
          <div className="nav nav-tabs">
            <NavLink to="/" end className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>
              Activities
            </NavLink>
            <NavLink to="/leaderboard" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>
              Leaderboard
            </NavLink>
            <NavLink to="/teams" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>
              Teams
            </NavLink>
            <NavLink to="/users" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>
              Users
            </NavLink>
            <NavLink to="/workouts" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>
              Workouts
            </NavLink>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/users" element={<Users />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
