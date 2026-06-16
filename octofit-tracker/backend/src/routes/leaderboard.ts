import { Router } from 'express'
import Activity from '../models/activity'
import User from '../models/user'

const router = Router()

router.get('/', async (req, res) => {
  const limit = Number(req.query.limit || 10)

  const rankings = await Activity.aggregate([
    {
      $group: {
        _id: '$userId',
        totalCalories: { $sum: '$calories' },
        totalDuration: { $sum: '$duration' },
        activityCount: { $sum: 1 }
      }
    },
    { $sort: { totalCalories: -1, totalDuration: -1, activityCount: -1 } },
    { $limit: limit }
  ])

  const leaderboard = await Promise.all(
    rankings.map(async (entry) => {
      const user = await User.findById(entry._id)
      return {
        userId: entry._id,
        name: user?.name ?? 'Unknown',
        totalCalories: entry.totalCalories,
        totalDuration: entry.totalDuration,
        activityCount: entry.activityCount
      }
    })
  )

  res.json({ leaderboard })
})

export default router
