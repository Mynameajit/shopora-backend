import { Router } from "express";
import { allUsers, getMyProfile } from "../Controllers/userController.js";
import { isAdmin, isAuthenticated } from "../middlewares/authMiddleware.js";

const router = Router()

router.get('/all',isAuthenticated,isAdmin, allUsers)
router.get('/me',isAuthenticated, getMyProfile)

export default router;