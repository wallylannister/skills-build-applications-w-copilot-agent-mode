import { useEffect, useState } from 'react'
import { buildApiUrl, normalizeApiResponse } from '../lib/api'

interface Workout {
  _id?: string
  name?: string
  description?: string
  difficulty?: string
  exercises?: string[]
}

function Workouts() {
  const [workouts, setWorkouts] = useState<Workout[]>([])
  const [message, setMessage] = useState('Loading workouts...')

  useEffect(() => {
    fetch(buildApiUrl('workouts'))
      .then((res) => res.json())
      .then((data) => {
        const normalized = normalizeApiResponse<Workout>(data, 'workouts')
        setWorkouts(normalized)
        if (normalized.length === 0) {
          setMessage('No workouts found.')
        }
      })
      .catch(() => setMessage('Unable to load workouts.'))
  }, [])

  return (
    <div className="container py-4">
      <h2>Workouts</h2>
      {workouts.length === 0 ? (
        <p>{message}</p>
      ) : (
        <div className="row gy-3">
          {workouts.map((workout, index) => (
            <div className="col-md-6" key={workout._id ?? index}>
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">{workout.name ?? 'Untitled workout'}</h5>
                  <p className="card-text">{workout.description ?? 'No description available.'}</p>
                  <p className="text-muted mb-1">Difficulty: {workout.difficulty ?? 'Unknown'}</p>
                  <p className="text-muted mb-0">Exercises: {(workout.exercises?.length ?? 0)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Workouts
