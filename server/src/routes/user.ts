import { Router } from 'express';
const router = Router();
import { updateUser, getUser, getUsers, deleteUser } from '../controllers/user.controller';

router.get('/all', getUsers)
router.put('/', updateUser);
router.get('/:id', getUser);
router.delete('/:id', deleteUser)

export default router;
