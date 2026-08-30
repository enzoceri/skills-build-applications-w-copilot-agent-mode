import { Schema, model, Document } from 'mongoose';

interface IUser extends Document {
  email: string;
  name: string;
  password: string;
  points: number;
  teamId?: string;
  createdAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
    points: { type: Number, default: 0 },
    teamId: { type: String },
  },
  { timestamps: true }
);

export const User = model<IUser>('User', userSchema);
