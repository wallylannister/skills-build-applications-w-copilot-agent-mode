// API configuration for backend
// Determines the base URL based on environment (Codespaces or localhost)

export const codespaceName = process.env.CODESPACE_NAME
export const port = Number(process.env.PORT ?? 8000)

export const baseUrl = codespaceName
  ? `https://${codespaceName}-${port}.app.github.dev`
  : `http://localhost:${port}`

// API endpoints
export const API_ENDPOINTS = {
  users: `${baseUrl}/api/users`,
  activities: `${baseUrl}/api/activities`,
  teams: `${baseUrl}/api/teams`,
  leaderboard: `${baseUrl}/api/leaderboard`,
  workouts: `${baseUrl}/api/workouts`,
}

export default baseUrl
