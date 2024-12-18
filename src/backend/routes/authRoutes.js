import { Router } from "express";
import {
  createSuperAdmin
} from "../controllers/authController.js";
import {apiKeyAuthMiddleware} from "../middleware/apiKeyAuth.js";

const router = Router();

// Route definitions
router.post("/create-super-admin", apiKeyAuthMiddleware, createSuperAdmin);

export default router;