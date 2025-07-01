
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';

import { errorMiddleware } from './utils/error.js';
import ConnectedDB from './config/mongoDB.js';
import addressRoutes from './Routes/addressRoutes.js';
import authRoute from './Routes/authRoute.js';
import productRouter from './Routes/ProductRoute.js';
import userRouter from './Routes/userRoute.js';
import orderRouter from './Routes/orderRoute.js';
import paymentRoute from './Routes/paymentRoutes.js';
import contactRoute from './Routes/contactRoutes.js';
import { saveProduct } from './seed/seeds.js';

// Initialize app
const app = express();

// Environment variables
dotenv.config()
// connected DB
await ConnectedDB();

// await saveProduct()
// Middleware
app.use(cors({
    origin: [
        "http://localhost:5173",
        "https://shopora-six.vercel.app"      // ✅ Deployed
    ],
    credentials: true
}));
app.use(express.json())
app.use(cookieParser());

app.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: "Welcome to shopOra Api"
    })
})
// Use the route
app.use('/api/auth', authRoute)
app.use('/api/address', addressRoutes);
app.use('/api/product', productRouter)
app.use('/api/user', userRouter)
app.use('/api/order', orderRouter)
app.use('/api/payment', paymentRoute)
app.use('/api/contact', contactRoute)





app.use(errorMiddleware)
// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})


