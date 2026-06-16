import { useEffect, useState } from 'react'
import { buildApiUrl, normalizeApiResponse } from '../lib/api'

function Teams() {
  const [teams, setTeams] = useState([])
  const [message, setMessage] = useState('Loading teams...')

  useEffect(() => {
    fetch(buildApiUrl('teams'))
      .then((res) => res.json())
      .then((data) => {
        const normalized = normalizeApiResponse(data, 'teams')
        setTeams(normalized)
        if (normalized.length === 0) {
          setMessage('No teams found.')
        }
      })
      .catch(() => setMessage('Unable to load teams.'))
  }, [])

  return (
    <div className="container py-4">
      <h2>Teams</h2>
      {teams.length === 0 ? (
        <p>{message}</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Members</th>
                <th>Created</th>
              </tr>
            </thead>
            <tbody>
              {teams.map((team, index) => (
                <tr key={team._id ?? index}>
                  <td>{team.name ?? 'Untitled'}</td>
                  <td>{team.description ?? '—'}</td>
                  <td>{team.memberIds?.length ?? 0}</td>
                  <td>{team.createdAt ? new Date(team.createdAt).toLocaleDateString() : '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default Teams
