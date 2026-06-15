import express from 'express'
import mongoose from 'mongoose'

const app = express()
const port = process.env.PORT ? Number(process.env.PORT) : 8000
const mongoUri = process.env.MONGODB_URI ?? 'mongodb://localhost:27017/octofit'

app.use(express.json())

app.get('/', (req, res) => {
  res.json({ message: 'OctoFit Tracker backend is running.' })
})

app.listen(port, async () => {
  console.log(`Backend listening on http://localhost:${port}`)

  try {
    await mongoose.connect(mongoUri)
    console.log('Connected to MongoDB at', mongoUri)
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error)
  }
})
