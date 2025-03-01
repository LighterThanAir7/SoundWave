import { Router } from 'express';
import { getUsers, registerUser } from '../controllers/userController.js';

const router = Router();

router.post('/register', registerUser);
router.get('/', getUsers);

export default router;