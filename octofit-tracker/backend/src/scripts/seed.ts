import mongoose from 'mongoose'
import User from '../models/user'
import Team from '../models/team'
import Activity from '../models/activity'
import Workout from '../models/workout'
import Leaderboard from '../models/leaderboard'

const mongoUri = process.env.MONGODB_URI ?? 'mongodb://localhost:27017/octofit_db'

async function seed() {
  console.log('Seed the octofit_db database with test data')

  await mongoose.connect(mongoUri)
  console.log('Connected to MongoDB at', mongoUri)

  await Promise.all([
    User.deleteMany({}),
    Team.deleteMany({}),
    Activity.deleteMany({}),
    Workout.deleteMany({}),
    Leaderboard.deleteMany({})
  ])

  const teams = await Team.insertMany([
    { name: 'Team Pulse', description: 'Fast-paced training and cardio champions', memberIds: [], createdAt: new Date() },
    { name: 'Core Collective', description: 'Strength, endurance, and team accountability', memberIds: [], createdAt: new Date() }
  ])

  const users = await User.insertMany([
    { name: 'Avery Moss', email: 'avery.moss@example.com', teamId: teams[0]._id.toString(), joinedAt: new Date('2026-01-12') },
    { name: 'Jordan Kim', email: 'jordan.kim@example.com', teamId: teams[0]._id.toString(), joinedAt: new Date('2026-02-03') },
    { name: 'Sienna Park', email: 'sienna.park@example.com', teamId: teams[1]._id.toString(), joinedAt: new Date('2026-03-08') },
    { name: 'Miles Carter', email: 'miles.carter@example.com', teamId: teams[1]._id.toString(), joinedAt: new Date('2026-04-01') }
  ])

  teams[0].memberIds = [users[0]._id.toString(), users[1]._id.toString()]
  teams[1].memberIds = [users[2]._id.toString(), users[3]._id.toString()]
  await Promise.all([teams[0].save(), teams[1].save()])

  const activities = await Activity.insertMany([
    { userId: users[0]._id.toString(), type: 'Running', duration: 40, calories: 420, date: new Date('2026-05-10') },
    { userId: users[0]._id.toString(), type: 'Yoga', duration: 55, calories: 210, date: new Date('2026-05-12') },
    { userId: users[1]._id.toString(), type: 'Cycling', duration: 70, calories: 560, date: new Date('2026-05-11') },
    { userId: users[1]._id.toString(), type: 'HIIT', duration: 30, calories: 330, date: new Date('2026-05-13') },
    { userId: users[2]._id.toString(), type: 'Strength Training', duration: 60, calories: 520, date: new Date('2026-05-09') },
    { userId: users[2]._id.toString(), type: 'Pilates', duration: 50, calories: 250, date: new Date('2026-05-14') },
    { userId: users[3]._id.toString(), type: 'Swimming', duration: 45, calories: 370, date: new Date('2026-05-08') },
    { userId: users[3]._id.toString(), type: 'Rowing', duration: 35, calories: 310, date: new Date('2026-05-15') }
  ])

  const workouts = await Workout.insertMany([
    {
      name: 'Morning Momentum',
      description: 'A balanced routine to wake up muscles and boost energy.',
      difficulty: 'Intermediate',
      exercises: [
        { name: 'Jumping Jacks', reps: 40 },
        { name: 'Bodyweight Squats', reps: 20 },
        { name: 'Plank', duration: 90 },
        { name: 'Push-ups', reps: 15 }
      ]
    },
    {
      name: 'Strength Builder',
      description: 'Resistance-based strength session with core focus.',
      difficulty: 'Advanced',
      exercises: [
        { name: 'Deadlift', reps: 10 },
        { name: 'Bench Press', reps: 12 },
        { name: 'Bent-over Row', reps: 12 },
        { name: 'Lunges', reps: 20 }
      ]
    }
  ])

  const leaderboardEntries = users.map((user, index) => ({
    userId: user._id.toString(),
    totalCalories: 1500 + index * 120,
    totalDuration: 240 + index * 15,
    activityCount: 5 + index
  }))

  await Leaderboard.insertMany(leaderboardEntries)

  console.log('Seed data created:')
  console.log(`  users: ${users.length}`)
  console.log(`  teams: ${teams.length}`)
  console.log(`  activities: ${activities.length}`)
  console.log(`  workouts: ${workouts.length}`)
  console.log(`  leaderboard entries: ${leaderboardEntries.length}`)

  await mongoose.disconnect()
  console.log('Disconnected from MongoDB')
}

seed().catch((error) => {
  console.error('Seeding failed:', error)
  process.exit(1)
})
