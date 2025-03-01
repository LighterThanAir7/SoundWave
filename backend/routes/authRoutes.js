import { Router } from "express";
import {
  adminLogin, userLogin,
  createSuperAdmin, refreshToken, verifyToken
} from "../controllers/authController.js";
import {apiKeyAuthMiddleware} from "../middleware/apiKeyAuth.js";
import {jwtAuthMiddleware} from "../middleware/jwtAuth.js";

const router = Router();

// Public routes
router.post("/create-super-admin", apiKeyAuthMiddleware, createSuperAdmin);
router.post('/login', userLogin);
router.post('/admin/login', adminLogin);
router.post('/refresh', refreshToken);
router.get('/verify', verifyToken);


// Admin routes
const adminRouter = Router();
adminRouter.use(jwtAuthMiddleware);

// Routes....
router.use('/admin', adminRouter);

export default router;