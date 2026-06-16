// API configuration for frontend
// Determines the base URL based on environment (Codespaces or localhost)

export const getApiBaseUrl = (): string => {
  // Check if running in Codespaces
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME || 
                        (typeof window !== 'undefined' && (window as any).__CODESPACE_NAME__)
  
  if (codespaceName) {
    return `https://${codespaceName}-8000.app.github.dev`
  }
  
  // Fallback to localhost
  return 'http://localhost:8000'
}

export const apiBaseUrl = getApiBaseUrl()

// API endpoints
export const API_ENDPOINTS = {
  users: `${apiBaseUrl}/api/users`,
  activities: `${apiBaseUrl}/api/activities`,
  teams: `${apiBaseUrl}/api/teams`,
  leaderboard: `${apiBaseUrl}/api/leaderboard`,
  workouts: `${apiBaseUrl}/api/workouts`,
}

export default apiBaseUrl
