import { Router } from 'express';
const router = Router();
import { signIn, signUp, refreshToken } from '../controllers/auth.controller';

router.post('/signup', signUp)
.post('/signIn', signIn)
.post('/token', refreshToken);

export default router;
