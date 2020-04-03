import mongoose, { Schema, Document } from 'mongoose';
import { IProfile } from '../interfaces/Profile';

export type ProfileType = IProfile & Document;

export const profilesSchema = new Schema({
  city: { type: String, required: true },
  english: {
    type: String,
    enum: ['BASIC', 'INTERMEDIATE', 'ADVANCE'],
    required: true,
  },
  skills: {
    type: [String],
    required: true,
  },
  portfolio: {
    type: String,
    unique: true,
    required: false,
  },
  linkedin: {
    type: String,
    unique: true,
    required: false,
  },
  github: {
    type: String,
    unique: true,
    required: false,
  },
  experience: {
    type: Boolean,
    required: true,
  },
});

profilesSchema.path('portfolio').validate(async (value: string) => {
  const portfolioCount = await profile.countDocuments({ portfolio: value });
  return !portfolioCount;
},                                        'Portfolio already exists');

profilesSchema.path('github').validate(async (value: string) => {
  const githubCount = await profile.countDocuments({ github: value });
  return !githubCount;
},                                     'Github already exists');

profilesSchema.path('linkedin').validate(async (value: string) => {
  const linkedinCount = await profile.countDocuments({ linkedin: value });
  return !linkedinCount;
},                                       'Linkedin already exists');

const profile = mongoose.model<ProfileType>('Profile', profilesSchema);
export default profile;
