import { Schema, model } from 'mongoose';
const workoutSchema = new Schema({
    userId: { type: String },
    type: { type: String, required: true }, // strength, cardio, flexibility, etc.
    difficulty: { type: String, required: true }, // beginner, intermediate, advanced
    duration: { type: Number, required: true }, // in minutes
    description: { type: String, required: true },
    points: { type: Number, required: true },
}, { timestamps: true });
export const Workout = model('Workout', workoutSchema);
