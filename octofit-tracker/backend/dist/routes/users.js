"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = __importDefault(require("../models/user"));
const router = (0, express_1.Router)();
router.get('/', async (req, res) => {
    const users = await user_1.default.find().limit(100);
    res.json({ users });
});
router.post('/', async (req, res) => {
    const user = new user_1.default({
        name: req.body.name,
        email: req.body.email,
        teamId: req.body.teamId,
        joinedAt: req.body.joinedAt ? new Date(req.body.joinedAt) : new Date()
    });
    await user.save();
    res.status(201).json({ user });
});
exports.default = router;
