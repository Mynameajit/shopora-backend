
import {Router} from "express"
import { createOrder, getOrderDetails, getUserOrders, updateOrder } from "../Controllers/orderController.js"
import { isAuthenticated } from "../middlewares/authMiddleware.js"

const router=Router()

router.post('/create',isAuthenticated,createOrder)
router.get("/my-order", isAuthenticated, getUserOrders);
router.post("/update/:_id", isAuthenticated, updateOrder);

router.get("/details/:id",isAuthenticated, getOrderDetails);

export default router



