import express from 'express';
import { LoginUser, logout, RegisterUser } from '../Controllers/authController.js';


const router = express.Router();

router.post('/register', RegisterUser);
router.post('/login', LoginUser);
router.post('/logout', logout);

export default router;