import { Schema, model, Document } from 'mongoose';

interface IWorkout extends Document {
  userId: string;
  type: string;
  difficulty: string;
  duration: number;
  description: string;
  points: number;
  createdAt: Date;
}

const workoutSchema = new Schema<IWorkout>(
  {
    userId: { type: String },
    type: { type: String, required: true }, // strength, cardio, flexibility, etc.
    difficulty: { type: String, required: true }, // beginner, intermediate, advanced
    duration: { type: Number, required: true }, // in minutes
    description: { type: String, required: true },
    points: { type: Number, required: true },
  },
  { timestamps: true }
);

export const Workout = model<IWorkout>('Workout', workoutSchema);
