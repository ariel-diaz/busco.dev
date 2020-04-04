import { Router } from 'express';
import { getCities, getSkills } from '../controllers/profile.controller';
const router = Router();

router.get('/cities', getCities)
    .get('/skills', getSkills);

export default router;
