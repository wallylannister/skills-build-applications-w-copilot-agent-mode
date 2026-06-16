import { useEffect, useState } from 'react'
import { buildApiUrl, normalizeApiResponse } from '../lib/api'

interface User {
  _id?: string
  name?: string
  email?: string
  teamId?: string
  joinedAt?: string
}

function Users() {
  const [users, setUsers] = useState<User[]>([])
  const [message, setMessage] = useState('Loading users...')

  useEffect(() => {
    fetch(buildApiUrl('users'))
      .then((res) => res.json())
      .then((data) => {
        const normalized = normalizeApiResponse<User>(data, 'users')
        setUsers(normalized)
        if (normalized.length === 0) {
          setMessage('No users found.')
        }
      })
      .catch(() => setMessage('Unable to load users.'))
  }, [])

  return (
    <div className="container py-4">
      <h2>Users</h2>
      {users.length === 0 ? (
        <p>{message}</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-hover">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Team</th>
                <th>Joined</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user._id ?? index}>
                  <td>{user.name ?? 'Unknown'}</td>
                  <td>{user.email ?? '—'}</td>
                  <td>{user.teamId ?? '—'}</td>
                  <td>{user.joinedAt ? new Date(user.joinedAt).toLocaleDateString() : '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default Users
