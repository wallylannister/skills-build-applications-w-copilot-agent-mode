import { API_ENDPOINTS } from './api'

interface FetchOptions extends RequestInit {
  headers?: Record<string, string>
}

/**
 * Generic fetch wrapper for API calls
 * Automatically uses the correct base URL (Codespaces or localhost)
 */
export const fetchAPI = async <T = any>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<T> => {
  const url = endpoint.startsWith('http') ? endpoint : `${API_ENDPOINTS.users.replace('/api/users', '')}${endpoint}`
  
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
export const fetchUsers = () => fetchAPI('/api/users')

/**
 * Fetch activities from the API
 */
export const fetchActivities = () => fetchAPI('/api/activities')

/**
 * Fetch teams from the API
 */
export const fetchTeams = () => fetchAPI('/api/teams')

/**
 * Fetch leaderboard from the API
 */
export const fetchLeaderboard = () => fetchAPI('/api/leaderboard')

/**
 * Fetch workouts from the API
 */
export const fetchWorkouts = () => fetchAPI('/api/workouts')
