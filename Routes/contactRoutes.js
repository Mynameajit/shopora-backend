 
import { Router } from "express";
import { isAuthenticated } from "../middlewares/authMiddleware.js";
import { createContact } from "../Controllers/contactController.js";


const router=Router()

router.post('/create',isAuthenticated,createContact)



export default router;






