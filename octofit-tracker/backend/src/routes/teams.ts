import { Router } from 'express'
import Team from '../models/team'

const router = Router()

router.get('/', async (req, res) => {
  const teams = await Team.find().limit(100)
  res.json({ teams })
})

router.post('/', async (req, res) => {
  const team = new Team({
    name: req.body.name,
    description: req.body.description,
    memberIds: req.body.memberIds || [],
    createdAt: req.body.createdAt ? new Date(req.body.createdAt) : new Date()
  })

  await team.save()
  res.status(201).json({ team })
})

export default router
