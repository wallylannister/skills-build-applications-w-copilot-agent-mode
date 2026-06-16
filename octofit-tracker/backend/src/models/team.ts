import mongoose, { Document, Schema } from 'mongoose'

export interface ITeam extends Document {
  name: string
  description?: string
  memberIds: string[]
  createdAt: Date
}

const teamSchema = new Schema<ITeam>({
  name: { type: String, required: true },
  description: { type: String, required: false },
  memberIds: { type: [String], required: true, default: [] },
  createdAt: { type: Date, required: true, default: () => new Date() }
})

const Team = mongoose.models.Team || mongoose.model<ITeam>('Team', teamSchema)
export default Team
