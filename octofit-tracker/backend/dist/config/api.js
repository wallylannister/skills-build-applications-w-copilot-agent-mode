"use strict";
// API configuration for backend
// Determines the base URL based on environment (Codespaces or localhost)
Object.defineProperty(exports, "__esModule", { value: true });
exports.API_ENDPOINTS = exports.baseUrl = exports.port = exports.codespaceName = void 0;
exports.codespaceName = process.env.CODESPACE_NAME;
exports.port = Number(process.env.PORT ?? 8000);
exports.baseUrl = exports.codespaceName
    ? `https://${exports.codespaceName}-${exports.port}.app.github.dev`
    : `http://localhost:${exports.port}`;
// API endpoints
exports.API_ENDPOINTS = {
    users: `${exports.baseUrl}/api/users`,
    activities: `${exports.baseUrl}/api/activities`,
    teams: `${exports.baseUrl}/api/teams`,
    leaderboard: `${exports.baseUrl}/api/leaderboard`,
    workouts: `${exports.baseUrl}/api/workouts`,
};
exports.default = exports.baseUrl;
