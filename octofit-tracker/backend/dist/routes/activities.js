"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const activity_1 = __importDefault(require("../models/activity"));
const router = (0, express_1.Router)();
router.get('/', async (req, res) => {
    const activities = await activity_1.default.find().sort({ date: -1 }).limit(200);
    res.json({ activities });
});
router.post('/', async (req, res) => {
    const activity = new activity_1.default({
        userId: req.body.userId,
        type: req.body.type,
        duration: req.body.duration,
        calories: req.body.calories,
        date: req.body.date ? new Date(req.body.date) : new Date()
    });
    await activity.save();
    res.status(201).json({ activity });
});
exports.default = router;
