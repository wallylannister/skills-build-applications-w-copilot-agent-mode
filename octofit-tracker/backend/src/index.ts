import express from 'express'
import usersRouter from './routes/users'
import teamsRouter from './routes/teams'
import activitiesRouter from './routes/activities'
import leaderboardRouter from './routes/leaderboard'
import workoutsRouter from './routes/workouts'
import connectDatabase from './config/database'
import { baseUrl, port } from './config/api'

const app = express()

app.use(express.json())
app.use('/api/users', usersRouter)
app.use('/api/teams', teamsRouter)
app.use('/api/activities', activitiesRouter)
app.use('/api/leaderboard', leaderboardRouter)
app.use('/api/workouts', workoutsRouter)

app.get('/', (req, res) => {
  res.json({ message: 'OctoFit Tracker backend is running.', apiBaseUrl: `${baseUrl}/api` })
})

app.listen(port, async () => {
  console.log(`Backend listening on http://localhost:${port}`)
  console.log(`API base URL: ${baseUrl}/api`)

  try {
    await connectDatabase()
  } catch (error) {
    console.error('Database connection failed:', error)
  }
})

