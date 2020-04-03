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
  profile: {
    type: Schema.Types.ObjectId,
    ref: 'Profile',
    required: false,
  },
});

userSchema.path('email').validate(async (value: string) => {
  const emailCount = await user.countDocuments({ email: value });
  return !emailCount;
},                                'Email already exists');

const user = mongoose.model<UserType>('User', userSchema);
export default user;
