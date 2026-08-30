import { Schema, model, Document } from 'mongoose';

interface ILeaderboardEntry extends Document {
  userId: string;
  userName: string;
  points: number;
  rank: number;
  activities: number;
  lastActivityDate?: Date;
}

const leaderboardSchema = new Schema<ILeaderboardEntry>(
  {
    userId: { type: String, required: true, unique: true },
    userName: { type: String, required: true },
    points: { type: Number, required: true },
    rank: { type: Number, required: true },
    activities: { type: Number, default: 0 },
    lastActivityDate: { type: Date },
  },
  { timestamps: true }
);

export const Leaderboard = model<ILeaderboardEntry>('Leaderboard', leaderboardSchema);
