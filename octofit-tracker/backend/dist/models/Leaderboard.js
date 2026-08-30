import { Schema, model } from 'mongoose';
const leaderboardSchema = new Schema({
    userId: { type: String, required: true, unique: true },
    userName: { type: String, required: true },
    points: { type: Number, required: true },
    rank: { type: Number, required: true },
    activities: { type: Number, default: 0 },
    lastActivityDate: { type: Date },
}, { timestamps: true });
export const Leaderboard = model('Leaderboard', leaderboardSchema);
