import dotenv from 'dotenv';
dotenv.config();

import express, { Application, NextFunction, Request, Response } from 'express';
import morgan from 'morgan';

import connect from './db';

const app: Application = express();
const PORT = 3000;
const db: string = process.env.MONGO_CONNECTION_STRING;

import authRouter from './routes/auth';
import userRouter from './routes/user';

// Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);

// Connect db
connect(db);

app.listen(PORT, () => {
  // tslint:disable-next-line: no-console
  console.log(`SERVER RUNNING PORT: ${PORT}`);
});
