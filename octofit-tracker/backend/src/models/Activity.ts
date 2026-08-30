import { Schema, model, Document } from 'mongoose';

interface IActivity extends Document {
  userId: string;
  type: string;
  duration: number;
  distance?: number;
  calories?: number;
  points: number;
  timestamp: Date;
}

const activitySchema = new Schema<IActivity>(
  {
    userId: { type: String, required: true },
    type: { type: String, required: true }, // running, cycling, swimming, etc.
    duration: { type: Number, required: true }, // in minutes
    distance: { type: Number }, // in km
    calories: { type: Number },
    points: { type: Number, required: true },
    timestamp: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export const Activity = model<IActivity>('Activity', activitySchema);
