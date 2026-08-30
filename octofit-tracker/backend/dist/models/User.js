import { Schema, model } from 'mongoose';
const userSchema = new Schema({
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
    points: { type: Number, default: 0 },
    teamId: { type: String },
}, { timestamps: true });
export const User = model('User', userSchema);
