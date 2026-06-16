import mongoose from 'mongoose'

export const mongoUri = process.env.MONGODB_URI ?? 'mongodb://localhost:27017/octofit_db'

export async function connectDatabase() {
  try {
    await mongoose.connect(mongoUri)
    console.log('Connected to MongoDB at', mongoUri)
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error)
    throw error
  }
}

export default connectDatabase
