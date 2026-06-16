import { Router } from 'express'
import Activity from '../models/activity'

const router = Router()

router.get('/', async (req, res) => {
  const activities = await Activity.find().sort({ date: -1 }).limit(200)
  res.json({ activities })
})

router.post('/', async (req, res) => {
  const activity = new Activity({
    userId: req.body.userId,
    type: req.body.type,
    duration: req.body.duration,
    calories: req.body.calories,
    date: req.body.date ? new Date(req.body.date) : new Date()
  })

  await activity.save()
  res.status(201).json({ activity })
})

export default router
