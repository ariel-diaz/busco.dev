import dotenv from 'dotenv';
dotenv.config();

import express, { Application, NextFunction,Request, Response } from 'express';
import morgan from 'morgan'

import connect from './db';

const app : Application = express();
const PORT = 3000;
const db: string = `mongodb+srv://ariel:ariel123@clusterari-lop9w.mongodb.net/test?retryWrites=true&w=majority`


import authRouter from './routes/auth';
import userRouter from './routes/user';

// Middlewares
app.use(morgan('dev'))
app.use(express.json());
app.use(express.urlencoded( { extended: false }))

// Routes
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);


// Connect db
connect(db);

app.listen(PORT, () => {
    console.log(`SERVER RUNNING PORT ${PORT}`)
})