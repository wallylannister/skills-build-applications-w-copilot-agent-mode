import { useEffect, useState } from 'react'
import { buildApiUrl, normalizeApiResponse } from '../lib/api'

// Uses dynamic Codespaces-aware endpoint such as:
// https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard
function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([])
  const [message, setMessage] = useState('Loading leaderboard...')

  useEffect(() => {
    fetch(buildApiUrl('leaderboard'))
      .then((res) => res.json())
      .then((data) => {
        const normalized = normalizeApiResponse(data, 'leaderboard')
        setLeaderboard(normalized)
        if (normalized.length === 0) {
          setMessage('No leaderboard data available.')
        }
      })
      .catch(() => setMessage('Unable to load leaderboard.'))
  }, [])

  return (
    <div className="container py-4">
      <h2>Leaderboard</h2>
      {leaderboard.length === 0 ? (
        <p>{message}</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-hover">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Name</th>
                <th>Calories</th>
                <th>Duration</th>
                <th>Activities</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((entry, index) => (
                <tr key={entry.userId ?? index}>
                  <td>{index + 1}</td>
                  <td>{entry.name ?? 'Unknown'}</td>
                  <td>{entry.totalCalories ?? 0}</td>
                  <td>{entry.totalDuration ?? 0}</td>
                  <td>{entry.activityCount ?? 0}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default Leaderboard
