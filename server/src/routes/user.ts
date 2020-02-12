import { Router } from 'express';
const router = Router();
import { updateUser, getUser, getUsers } from '../controllers/user.controller';

router.post('/all', getUsers)
router.put('/', updateUser);
router.get('/:id', getUser);

export default router;
