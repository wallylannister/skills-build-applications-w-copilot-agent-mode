"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.baseUrl = exports.codespaceName = exports.mongoUri = void 0;
exports.connectDatabase = connectDatabase;
const mongoose_1 = __importDefault(require("mongoose"));
exports.mongoUri = process.env.MONGODB_URI ?? 'mongodb://localhost:27017/octofit_db';
exports.codespaceName = process.env.CODESPACE_NAME;
exports.baseUrl = exports.codespaceName
    ? `https://${exports.codespaceName}-8000.app.github.dev`
    : 'http://localhost:8000';
async function connectDatabase() {
    try {
        await mongoose_1.default.connect(exports.mongoUri);
        console.log('Connected to MongoDB at', exports.mongoUri);
    }
    catch (error) {
        console.error('Failed to connect to MongoDB:', error);
        throw error;
    }
}
exports.default = connectDatabase;
