"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const users_1 = __importDefault(require("./routes/users"));
const teams_1 = __importDefault(require("./routes/teams"));
const activities_1 = __importDefault(require("./routes/activities"));
const leaderboard_1 = __importDefault(require("./routes/leaderboard"));
const workouts_1 = __importDefault(require("./routes/workouts"));
const database_1 = __importDefault(require("./config/database"));
const api_1 = require("./config/api");
// API Base URL Configuration
// When CODESPACE_NAME is available, the API will be accessible at:
// https://$CODESPACE_NAME-8000.app.github.dev/api
// Otherwise falls back to localhost:8000/api
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/api/users', users_1.default);
app.use('/api/teams', teams_1.default);
app.use('/api/activities', activities_1.default);
app.use('/api/leaderboard', leaderboard_1.default);
app.use('/api/workouts', workouts_1.default);
app.get('/', (req, res) => {
    res.json({ message: 'OctoFit Tracker backend is running.', apiBaseUrl: `${api_1.baseUrl}/api` });
});
app.listen(api_1.port, async () => {
    console.log(`Backend listening on http://localhost:${api_1.port}`);
    console.log(`API base URL: ${api_1.baseUrl}/api`);
    if (api_1.codespaceName) {
        console.log(`Codespaces environment detected: ${api_1.codespaceName}`);
    }
    try {
        await (0, database_1.default)();
    }
    catch (error) {
        console.error('Database connection failed:', error);
    }
});
