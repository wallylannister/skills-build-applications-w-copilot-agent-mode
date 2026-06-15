import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

function Home() {
  return (
    <div className="container py-5">
      <h1>OctoFit Tracker</h1>
      <p className="lead">Modern multi-tier fitness tracking experience.</p>
    </div>
  )
}

export default App
