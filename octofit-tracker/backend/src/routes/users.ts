import { Router } from 'express'
import User from '../models/user'

const router = Router()

router.get('/', async (req, res) => {
  const users = await User.find().limit(100)
  res.json({ users })
})

router.post('/', async (req, res) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    teamId: req.body.teamId,
    joinedAt: req.body.joinedAt ? new Date(req.body.joinedAt) : new Date()
  })

  await user.save()
  res.status(201).json({ user })
})

export default router
