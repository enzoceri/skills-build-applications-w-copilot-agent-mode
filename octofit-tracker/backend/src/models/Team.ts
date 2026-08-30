import { Schema, model, Document } from 'mongoose';

interface ITeam extends Document {
  name: string;
  description: string;
  points: number;
  members: string[];
  createdAt: Date;
}

const teamSchema = new Schema<ITeam>(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String },
    points: { type: Number, default: 0 },
    members: [{ type: String }],
  },
  { timestamps: true }
);

export const Team = model<ITeam>('Team', teamSchema);
