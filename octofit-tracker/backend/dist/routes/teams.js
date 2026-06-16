"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const team_1 = __importDefault(require("../models/team"));
const router = (0, express_1.Router)();
router.get('/', async (req, res) => {
    const teams = await team_1.default.find().limit(100);
    res.json({ teams });
});
router.post('/', async (req, res) => {
    const team = new team_1.default({
        name: req.body.name,
        description: req.body.description,
        memberIds: req.body.memberIds || [],
        createdAt: req.body.createdAt ? new Date(req.body.createdAt) : new Date()
    });
    await team.save();
    res.status(201).json({ team });
});
exports.default = router;
