import mongoose from "mongoose";


const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your name"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Please enter your email"],
    trim: true,
    lowercase: true,
  },
  message: {
    type: String,
    required: [true, "Please enter your message"],
    maxlength: 1000,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

export const Contact = mongoose.model("Contact", contactSchema);
