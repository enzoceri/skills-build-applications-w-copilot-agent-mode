import { Schema, model } from 'mongoose';
const activitySchema = new Schema({
    userId: { type: String, required: true },
    type: { type: String, required: true }, // running, cycling, swimming, etc.
    duration: { type: Number, required: true }, // in minutes
    distance: { type: Number }, // in km
    calories: { type: Number },
    points: { type: Number, required: true },
    timestamp: { type: Date, default: Date.now },
}, { timestamps: true });
export const Activity = model('Activity', activitySchema);
