"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const activity_1 = __importDefault(require("../models/activity"));
const user_1 = __importDefault(require("../models/user"));
const router = (0, express_1.Router)();
router.get('/', async (req, res) => {
    const limit = Number(req.query.limit || 10);
    const rankings = await activity_1.default.aggregate([
        {
            $group: {
                _id: '$userId',
                totalCalories: { $sum: '$calories' },
                totalDuration: { $sum: '$duration' },
                activityCount: { $sum: 1 }
            }
        },
        { $sort: { totalCalories: -1, totalDuration: -1, activityCount: -1 } },
        { $limit: limit }
    ]);
    const leaderboard = await Promise.all(rankings.map(async (entry) => {
        const user = await user_1.default.findById(entry._id);
        return {
            userId: entry._id,
            name: user?.name ?? 'Unknown',
            totalCalories: entry.totalCalories,
            totalDuration: entry.totalDuration,
            activityCount: entry.activityCount
        };
    }));
    res.json({ leaderboard });
});
exports.default = router;
