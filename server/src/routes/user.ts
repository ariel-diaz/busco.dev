import { Router } from 'express';
const router = Router();
import { updateUser, getUser, getUsers, deleteUser } from '../controllers/user.controller';

router.get('/all', getUsers)
    .put('/', updateUser)
    .get('/:id', getUser)
    .delete('/:id', deleteUser);

export default router;
