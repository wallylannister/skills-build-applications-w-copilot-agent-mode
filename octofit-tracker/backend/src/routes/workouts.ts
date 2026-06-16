import { Router } from 'express'
import Workout from '../models/workout'

const router = Router()

router.get('/', async (req, res) => {
  const workouts = await Workout.find().limit(100)
  res.json({ workouts })
})

router.post('/', async (req, res) => {
  const workout = new Workout({
    name: req.body.name,
    description: req.body.description,
    difficulty: req.body.difficulty,
    exercises: req.body.exercises || []
  })

  await workout.save()
  res.status(201).json({ workout })
})

export default router
