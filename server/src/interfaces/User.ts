import { IProfile } from './Profile';

export interface IUser {
  name: string;
  email: string;
  password: string;
  access_token_github?: string;
}
