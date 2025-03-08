import { Router } from 'express';
import { getUsers, getUserById, registerUser, updateUser } from '../controllers/userController.js';
import { jwtAuthMiddleware } from "../middleware/jwtAuth.js";

const router = Router();

router.post('/users/register', registerUser);


// Admin Routes
const adminRouter = Router();
adminRouter.use(jwtAuthMiddleware);

adminRouter.get('/users', getUsers);
adminRouter.get('/users/:id', getUserById);
adminRouter.put('/users/:id', updateUser);

router.use('/admin', adminRouter);

export default router;