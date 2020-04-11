import dotenv from 'dotenv';
import cors from 'cors';
import { Strategy as GitHubStrategy } from 'passport-github';
import passport from 'passport';

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

import User from './models/user.model';

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
  clientID: '32f939675961a229330d' || process.env.GITHUB_CLIENT_ID,
  clientSecret: '92a47f5155579dface3970843bd352219003245d' || process.env.GITHUB_SECRET_ID,
  callbackURL: 'http://localhost:5000/auth/github/login',
// tslint:disable-next-line: align
}, (accessToken, refreshToken, profile, done) =>  {
  console.log('aces_toen', accessToken);
  User.findOne({ githubId: profile.id }, async (err, user) => {
    if (err) {
        // tslint:disable-next-line: no-console
      console.log(err);  // handle errors!
    }
    if (!err && user !== null) {
      await user.updateOne({
        access_token_github:  accessToken,
      },                   { new: true });

      done(null, { ...user });
    } else {
      const newUser = new User({
        githubId: profile.id,
        name: profile.displayName || profile.username,
        email: null,
        github: profile.username,
        password: 'NOT_PASSWORD',
        access_token_github:  accessToken ,
      });
      newUser.save(err => {
        if (err) {
          console.log(err);  // handle errors!
        } else {
          done(null, newUser);
        }
      });
    }
  });
}));

// tslint:disable-next-line: ter-prefer-arrow-callback
passport.serializeUser((user, done) => {
  // placeholder for custom user serialization
  done(null, user);
});

passport.deserializeUser((user, done) =>  {
  done(null, user); // null is for errors
});

app.get('/auth/github',
        passport.authenticate('github'));

app.get('/auth/github/login', passport.authenticate('github', { failureRedirect: '/error' }),
        (req: any, res) => {
          res.redirect(`http://localhost:3000/github?access_token=${req.user.access_token_github}`);
        });

// Connect db
connect(db);

app.listen(PORT, () => {
  // tslint:disable-next-line: no-console
  console.log(`SERVER RUNNING PORT: ${PORT}`);
});
