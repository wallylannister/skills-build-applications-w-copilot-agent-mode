import mongoose from 'mongoose'

export const mongoUri = process.env.MONGODB_URI ?? 'mongodb://localhost:27017/octofit_db'
export const codespaceName = process.env.CODESPACE_NAME
export const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000'

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
