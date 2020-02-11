import { IProfile } from './Profile';

export interface IUser {
    name: string,
    email: string,
    password: string,
    profile?: IProfile,
}