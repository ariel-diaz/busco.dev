import dotenv from 'dotenv';
import cors from 'cors';
import { Strategy as GitHubStrategy } from 'passport-github';
import passport from 'passport';
import authGithub from './authGithub';

dotenv.config();

import express, { Application } from 'express';
import morgan from 'morgan';

import connect from './db';

const app: Application = express();
const PORT = 5000;
const db: string = process.env.MONGO_CONNECTION_STRING;

import authRouter from './routes/auth';
import userRouter from './routes/user';
import profileRouter from './routes/profile';

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(morgan('dev'));
app.use(passport.initialize());

// Routes
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/profile', profileRouter);

// Passport
passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_SECRET_ID,
  callbackURL: 'http://localhost:5000/api/auth/github/login',
},                              authGithub));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) =>  {
  done(null, user); // null is for errors
});

// Connect db
connect(db);

app.listen(PORT, () => {
  // tslint:disable-next-line: no-console
  console.log(`SERVER RUNNING PORT: ${PORT}`);
});
