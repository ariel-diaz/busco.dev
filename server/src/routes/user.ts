import { Router } from 'express';
const router = Router();
import {
  updateUser,
  getUser,
  getUsers,
  deleteUser,
} from '../controllers/user.controller';
import { TokenValidation } from '../libs/verifyToken';

router.use(TokenValidation);

router
  .get('/all', getUsers)
  .put('/', updateUser)
  .get('/:id', getUser)
  .delete('/:id', deleteUser);

export default router;
