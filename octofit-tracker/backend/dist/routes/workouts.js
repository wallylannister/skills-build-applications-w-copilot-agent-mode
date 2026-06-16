"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const workout_1 = __importDefault(require("../models/workout"));
const router = (0, express_1.Router)();
router.get('/', async (req, res) => {
    const workouts = await workout_1.default.find().limit(100);
    res.json({ workouts });
});
router.post('/', async (req, res) => {
    const workout = new workout_1.default({
        name: req.body.name,
        description: req.body.description,
        difficulty: req.body.difficulty,
        exercises: req.body.exercises || []
    });
    await workout.save();
    res.status(201).json({ workout });
});
exports.default = router;
