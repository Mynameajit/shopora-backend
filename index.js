
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';

import { errorMiddleware } from './utils/error.js';
import ConnectedDB from './config/mongoDB.js';
import addressRoutes from './Routes/addressRoutes.js';
import userRoute from './Routes/authRoute.js';
import productRouter from './Routes/ProductRoute.js';
import userRouter from './Routes/userRoute.js';
import orderRouter from './Routes/orderRoute.js';
import paymentRoute from './Routes/paymentRoutes.js';
import contactRoute from './Routes/contactRoutes.js';

// Initialize app
const app = express();

// Environment variables
dotenv.config()

// Middleware
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}))
app.use(express.json())
app.use(cookieParser());
// Use the route
app.use('/api/auth', userRoute)
app.use('/api/address', addressRoutes);
app.use('/api/product', productRouter)
app.use('/api/user', userRouter)
app.use('/api/order', orderRouter)
app.use('/api/payment', paymentRoute)
app.use('/api/contact', contactRoute)


// connected DB
ConnectedDB()


app.use(errorMiddleware)
// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})


