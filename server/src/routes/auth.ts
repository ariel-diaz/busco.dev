import { Router } from 'express';
const router = Router();
import { signIn, signUp } from '../controllers/auth.controller';

router
    .post('/signup', signUp)
    .post('/signIn', signIn);


export default router;
