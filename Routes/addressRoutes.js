import express from 'express';
import { addAddress,  deleteAddress, updateAddress } from '../Controllers/addressController.js';
import { isAuthenticated } from '../middlewares/authMiddleware.js';

const router = express.Router();

// 👇 Example: POST /api/address/:userId
router.post('/add', isAuthenticated, addAddress);
router.put('/update', isAuthenticated, updateAddress);
router.post("/delete", isAuthenticated, deleteAddress); 


export default router;