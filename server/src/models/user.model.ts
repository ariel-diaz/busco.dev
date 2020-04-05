import mongoose, { Schema, Document } from 'mongoose';

import { IUser } from '../interfaces/User';

export type UserType = IUser & Document;

export const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    uniqueCaseInsensitive: true,
  },
  password: {
    type: String,
    required: true,
  },
  city: { type: String, required: false },
  english: {
    type: String,
    enum: ['BASIC', 'INTERMEDIATE', 'ADVANCE'],
    required: false,
  },
  skills: {
    type: [String],
    required: false,
  },
  portfolio: {
    type: String,
    required: false,
  },
  linkedin: {
    type: String,
    required: false,
  },
  github: {
    type: String,
    required: false,
  },
  experience: {
    type: Boolean,
    required: false,
  },
});

userSchema.path('email').validate(async (value: string) => {
  const emailCount = await user.countDocuments({ email: value });
  return !emailCount;
}, 'Email already exists');

userSchema.path('portfolio').validate(async (value: string) => {
  if (!value) return true;
  const portfolioCount = await user.countDocuments({ portfolio: value });
  return !portfolioCount;
}, 'Portfolio already exists');

userSchema.path('github').validate(async (value: string) => {
  if (!value) return true;
  const githubCount = await user.countDocuments({ github: value });
  return !githubCount;
}, 'Github already exists');

userSchema.path('linkedin').validate(async (value: string) => {
  if (!value) return true;
  const linkedinCount = await user.countDocuments({ linkedin: value });
  return !linkedinCount;
}, 'Linkedin already exists');

const user = mongoose.model<UserType>('User', userSchema);
export default user;
