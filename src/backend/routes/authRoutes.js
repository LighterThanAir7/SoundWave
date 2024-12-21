import { Router } from "express";
import {
  adminLogin,
  createSuperAdmin, refreshToken, verifyToken
} from "../controllers/authController.js";
import {apiKeyAuthMiddleware} from "../middleware/apiKeyAuth.js";

const router = Router();

// Route definitions
router.post("/create-super-admin", apiKeyAuthMiddleware, createSuperAdmin);
router.post('/admin/login', adminLogin);
router.post('/refresh', refreshToken);

router.get('/verify', verifyToken);

export default router;