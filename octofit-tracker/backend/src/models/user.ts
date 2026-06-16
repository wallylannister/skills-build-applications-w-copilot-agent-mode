import mongoose, { Document, Schema } from 'mongoose'

export interface IUser extends Document {
  name: string
  email: string
  teamId?: string
  joinedAt: Date
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  teamId: { type: String, required: false },
  joinedAt: { type: Date, required: true, default: () => new Date() }
})

const User = mongoose.models.User || mongoose.model<IUser>('User', userSchema)
export default User
