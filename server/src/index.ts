import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();

import express, { Application, NextFunction, Request, Response } from 'express';
import morgan from 'morgan';

import connect from './db';

const app: Application = express();
const PORT = 5000;
const db: string = process.env.MONGO_CONNECTION_STRING;

import authRouter from './routes/auth';
import userRouter from './routes/user';
import profileRouter from './routes/profile';

// Middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/profile', profileRouter);

// Connect db
connect(db);

app.listen(PORT, () => {
  // tslint:disable-next-line: no-console
  console.log(`SERVER RUNNING PORT: ${PORT}`);
});
