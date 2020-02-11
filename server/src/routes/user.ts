import { Router } from 'express';
const router = Router();
import { updateUser, getUser } from '../controllers/user.controller';

router.put('/', updateUser);
router.get('/:id', getUser);

export default router;
