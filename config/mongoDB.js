import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const ConnectedDB = async () => {
    const URI = process.env.MONGO_URI;

    try {
        if (!URI) throw new Error('Mongo URI is not defined in environment variables.');
      await mongoose.connect(URI); 
        console.log('MongoDB connected successfully.');
    } catch (error) {
        console.error('MongoDB connection failed:', error.message);
    }
};

export default ConnectedDB;