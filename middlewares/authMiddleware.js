import jwt from 'jsonwebtoken';
import { User } from '../Models/userModel.js';
import { catchAsyncError } from './catchasyncerror.js';
import ErrorHandler from '../utils/errorHandler.js';

// ✅ Middleware to check if user is logged in
export const isAuthenticated = catchAsyncError(async (req, res, next) => {

  const { token } = req.cookies;

  if (!token) {
    return next(new ErrorHandler("Not logged in", 401));
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const user = await User.findById(decoded._id);
  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }


  req.user = user;
  next();
});

// ✅ Middleware to check if user is admin
export const isAdmin = catchAsyncError(async (req, res, next) => {
  if (req.user.role !== 'admin') {
    return next(new ErrorHandler("Unauthorized access: Admins only", 403));
  }
  next();
});
