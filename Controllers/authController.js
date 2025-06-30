import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../Models/userModel.js';
import { generateToken } from '../utils/generateToken.js';
import { catchAsyncError } from '../middlewares/catchasyncerror.js';
import ErrorHandler from '../utils/errorHandler.js';
import sendToken from '../utils/sendToken.js';

// Register User
export const RegisterUser = catchAsyncError(async (req, res, next) => {


  const { name, email, password, role } = req.body;

  // Validate input
  if (!name || !email || !password) {
    return next(new ErrorHandler("Name, email, and password are required.", 400))

  }


  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({
      success: false,
      message: "Email already registered"
    });
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create user and save
  const newUser = new User({
    name,
    email,
    password: hashedPassword,
    role,
    addresses: []
  });

  const savedUser = await newUser.save();

  sendToken(savedUser, 201, res, "User registered successfully")

});


// Login User
export const LoginUser = catchAsyncError(async (req, res, next) => {


  const { email, password, role } = req.body;


  // Validate input
  if (!email || !password) return next(new ErrorHandler("Email or Password is Required ", 404))

  if (!role) return res.status(400).json({ success: false, message: "Please select a user role to proceed." })

  // Find user by email
  const user = await User.findOne({ email });
  if (!user) return next(new ErrorHandler("Invalid Email or password ", 404))

  // Check password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return next(new ErrorHandler("Invalid Email or password ", 404))

  //cake user orle
  if (role !== user.role) return next(new ErrorHandler("Selected role doesn't match your account.", 400));


  // Generate JWT token
  sendToken(user, 200, res, `Welcome to Shopora ${user.name} !`)


});

export const logout = catchAsyncError(async (req, res, next) => {
  res.cookie('token', null, {
    expires: new Date(Date.now()),
    httpOnly: true
  });
  res.status(200).json({
    success: true,
    message: "Logged Out Successfully"
  });
});

