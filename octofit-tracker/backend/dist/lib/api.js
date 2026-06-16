"use strict";
// API helper utilities for backend and frontend consumption
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchWorkouts = exports.fetchLeaderboard = exports.fetchTeams = exports.fetchActivities = exports.fetchUsers = exports.fetchAPI = void 0;
/**
 * Generic fetch wrapper for API calls
 * Automatically uses the correct base URL (Codespaces or localhost)
 */
const fetchAPI = async (baseUrl, endpoint, options = {}) => {
    const url = endpoint.startsWith('http') ? endpoint : `${baseUrl}${endpoint}`;
    const response = await fetch(url, {
        headers: {
            'Content-Type': 'application/json',
            ...options.headers,
        },
        ...options,
    });
    if (!response.ok) {
        throw new Error(`API request failed: ${response.status} ${response.statusText}`);
    }
    return response.json();
};
exports.fetchAPI = fetchAPI;
/**
 * Fetch users from the API
 */
const fetchUsers = (baseUrl) => (0, exports.fetchAPI)(baseUrl, '/api/users');
exports.fetchUsers = fetchUsers;
/**
 * Fetch activities from the API
 */
const fetchActivities = (baseUrl) => (0, exports.fetchAPI)(baseUrl, '/api/activities');
exports.fetchActivities = fetchActivities;
/**
 * Fetch teams from the API
 */
const fetchTeams = (baseUrl) => (0, exports.fetchAPI)(baseUrl, '/api/teams');
exports.fetchTeams = fetchTeams;
/**
 * Fetch leaderboard from the API
 */
const fetchLeaderboard = (baseUrl) => (0, exports.fetchAPI)(baseUrl, '/api/leaderboard');
exports.fetchLeaderboard = fetchLeaderboard;
/**
 * Fetch workouts from the API
 */
const fetchWorkouts = (baseUrl) => (0, exports.fetchAPI)(baseUrl, '/api/workouts');
exports.fetchWorkouts = fetchWorkouts;
