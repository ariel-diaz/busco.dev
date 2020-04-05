// import mongoose, { Schema, Document } from 'mongoose';
// import { IProfile } from '../interfaces/Profile';

// export type ProfileType = IProfile & Document;

// export const profilesSchema = new Schema({
//   city: { type: String, required: true },
//   english: {
//     type: String,
//     enum: ['BASIC', 'INTERMEDIATE', 'ADVANCE'],
//     required: true,
//   },
//   skills: {
//     type: [String],
//     required: true,
//   },
//   portfolio: {
//     type: String,
//     required: false,
//   },
//   linkedin: {
//     type: String,
//     required: false,
//   },
//   github: {
//     type: String,
//     required: false,
//   },
//   experience: {
//     type: Boolean,
//     required: true,
//   },
// });

// profilesSchema.path('portfolio').validate(async (value: string) => {
//   if (!value) return true;
//   const portfolioCount = await profile.countDocuments({ portfolio: value });
//   return !portfolioCount;
// }, 'Portfolio already exists');

// profilesSchema.path('github').validate(async (value: string) => {
//   if (!value) return true;
//   const githubCount = await profile.countDocuments({ github: value });
//   return !githubCount;
// }, 'Github already exists');

// profilesSchema.path('linkedin').validate(async (value: string) => {
//   if (!value) return true;
//   const linkedinCount = await profile.countDocuments({ linkedin: value });
//   return !linkedinCount;
// }, 'Linkedin already exists');

// const profile = mongoose.model<ProfileType>('Profile', profilesSchema);
// export default profile;
