// API helper utilities for backend and frontend consumption

export interface FetchOptions extends RequestInit {
  headers?: Record<string, string>
}

/**
 * Generic fetch wrapper for API calls
 * Automatically uses the correct base URL (Codespaces or localhost)
 */
export const fetchAPI = async <T = any>(
  baseUrl: string,
  endpoint: string,
  options: FetchOptions = {}
): Promise<T> => {
  const url = endpoint.startsWith('http') ? endpoint : `${baseUrl}${endpoint}`
  
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  })

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status} ${response.statusText}`)
  }

  return response.json() as Promise<T>
}

/**
 * Fetch users from the API
 */
export const fetchUsers = (baseUrl: string) => fetchAPI(baseUrl, '/api/users')

/**
 * Fetch activities from the API
 */
export const fetchActivities = (baseUrl: string) => fetchAPI(baseUrl, '/api/activities')

/**
 * Fetch teams from the API
 */
export const fetchTeams = (baseUrl: string) => fetchAPI(baseUrl, '/api/teams')

/**
 * Fetch leaderboard from the API
 */
export const fetchLeaderboard = (baseUrl: string) => fetchAPI(baseUrl, '/api/leaderboard')

/**
 * Fetch workouts from the API
 */
export const fetchWorkouts = (baseUrl: string) => fetchAPI(baseUrl, '/api/workouts')
