
import mongoose, { Schema, Document} from 'mongoose';
import { IUser } from '../interfaces/User';

export type UserType = IUser & Document;

export const UserSchema = new Schema({
    name: {
        type: String, required: true
    },
    email: {
        type: String, required: true
    },
    password: {
        type: String, required: true
    },
    profile: {
        type: Object, required: false
    }
})


const User = mongoose.model<UserType>('User', UserSchema);
export default User;