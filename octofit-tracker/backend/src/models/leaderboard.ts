import mongoose, { Document, Schema } from 'mongoose'

export interface ILeaderboardEntry extends Document {
  userId: string
  totalCalories: number
  totalDuration: number
  activityCount: number
}

const leaderboardSchema = new Schema<ILeaderboardEntry>({
  userId: { type: String, required: true },
  totalCalories: { type: Number, required: true, default: 0 },
  totalDuration: { type: Number, required: true, default: 0 },
  activityCount: { type: Number, required: true, default: 0 }
})

const Leaderboard = mongoose.models.Leaderboard || mongoose.model<ILeaderboardEntry>('Leaderboard', leaderboardSchema)
export default Leaderboard
