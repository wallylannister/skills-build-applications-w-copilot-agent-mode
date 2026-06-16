import mongoose, { Document, Schema } from 'mongoose'

export interface IWorkout extends Document {
  name: string
  description?: string
  difficulty?: string
  exercises: Array<{ name: string; reps?: number; duration?: number }>
}

const workoutSchema = new Schema<IWorkout>({
  name: { type: String, required: true },
  description: { type: String, required: false },
  difficulty: { type: String, required: false },
  exercises: {
    type: [
      {
        name: { type: String, required: true },
        reps: { type: Number, required: false },
        duration: { type: Number, required: false }
      }
    ],
    required: true,
    default: []
  }
})

const Workout = mongoose.models.Workout || mongoose.model<IWorkout>('Workout', workoutSchema)
export default Workout
