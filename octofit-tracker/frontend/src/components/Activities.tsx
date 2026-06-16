import { useEffect, useState } from 'react'
import { buildApiUrl, normalizeApiResponse } from '../lib/api'

interface Activity {
  _id?: string
  userId?: string
  type?: string
  duration?: number
  calories?: number
  date?: string
}

function Activities() {
  const [activities, setActivities] = useState<Activity[]>([])
  const [message, setMessage] = useState('Loading activities...')

  useEffect(() => {
    fetch(buildApiUrl('activities'))
      .then((res) => res.json())
      .then((data) => {
        const normalized = normalizeApiResponse<Activity>(data, 'activities')
        setActivities(normalized)
        if (normalized.length === 0) {
          setMessage('No activities found.')
        }
      })
      .catch(() => setMessage('Unable to load activities.'))
  }, [])

  return (
    <div className="container py-4">
      <h2>Activities</h2>
      {activities.length === 0 ? (
        <p>{message}</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>User</th>
                <th>Type</th>
                <th>Duration</th>
                <th>Calories</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {activities.map((activity, index) => (
                <tr key={activity._id ?? index}>
                  <td>{activity.userId ?? 'Unknown'}</td>
                  <td>{activity.type ?? '—'}</td>
                  <td>{activity.duration ?? '—'}</td>
                  <td>{activity.calories ?? '—'}</td>
                  <td>{activity.date ? new Date(activity.date).toLocaleString() : '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default Activities
