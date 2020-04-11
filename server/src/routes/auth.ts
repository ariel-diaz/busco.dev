import { Router } from 'express';
const router = Router();
import { signIn, signInGithub, signUp, refreshToken } from '../controllers/auth.controller';
import passport from 'passport';

router.post('/signup', signUp)
.post('/signIn', signIn)
.post('/token', refreshToken)
.get('/github',
     passport.authenticate('github'))
.get('/github/login',
     passport.authenticate('github', { failureRedirect: '/error' }),
     signInGithub);

export default router;
