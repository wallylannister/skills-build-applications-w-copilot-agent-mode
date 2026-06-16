import mongoose, { Document, Schema } from 'mongoose'

export interface IActivity extends Document {
  userId: string
  type: string
  duration: number
  calories: number
  date: Date
}

const activitySchema = new Schema<IActivity>({
  userId: { type: String, required: true },
  type: { type: String, required: true },
  duration: { type: Number, required: true, default: 0 },
  calories: { type: Number, required: true, default: 0 },
  date: { type: Date, required: true, default: () => new Date() }
})

const Activity = mongoose.models.Activity || mongoose.model<IActivity>('Activity', activitySchema)
export default Activity
