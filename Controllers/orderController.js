import mongoose from "mongoose";
import { catchAsyncError } from "../middlewares/catchasyncerror.js";
import Order from "../Models/orderModel.js";
import { Address, User } from "../Models/userModel.js";

export const createOrder = catchAsyncError(async (req, res) => {
  const { products, totalAmount, address, paymentMethod } = req.body;



  if (!products || products.length === 0) {
    return res.status(400).json({ success: false, message: "No products provided." });
  }

  if (!address) {
    return res.status(400).json({ success: false, message: "Address ID is required." });
  }

  const user = await User.findById(req.user._id);
  if (!user) {
    return res.status(404).json({ success: false, message: "User not found." });
  }

  // const matchId = new mongoose.Types.ObjectId(address);

  // const matched = user.addresses.find((a) => {
  //   console.log(
  //     a._id == matchId
  //   )
  // });



  const selectedAddress = user.addresses.id(address);

  if (!selectedAddress) {
    return res.status(404).json({ success: false, message: "Address not found." });
  }


  const order = await Order.create({
    user: req.user._id,
    address: selectedAddress,
    products,
    totalAmount,
    paymentMethod,
    paymentStatus: paymentMethod === "Online" ? "Success" : "Pending",
  });

  res.status(201).json({
    success: true,
    message: "Order Placed Successfully",
    order
  });
});



// get order
export const getUserOrders = catchAsyncError(async (req, res) => {
  const orders = await Order.find({ user: req.user._id })
    .populate("products.product") // This will populate product details
    .sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    orders
  });
});


// update order
export const updateOrder = catchAsyncError(async (req, res, next) => {
  const { _id } = req.params;
  const updateData = req.body;

  const updatedOrder = await Order.findByIdAndUpdate(_id, updateData, {
    new: true, // return updated document
    runValidators: true, // run schema validators
  });

  if (!updatedOrder) {
    return res.status(404).json({
      success: false,
      message: "Order not found",
    });
  }

  res.status(200).json({
    success: true,
    message: "Order updated successfully",
    data: updatedOrder,
  });
});



export const getOrderDetails = catchAsyncError(async (req, res) => {
  const id = req.params.id
  const order = await Order.findById(id)
    .populate("user", "name email")
    .populate("address")
    .populate("products.product");

  // console.log(order);  ` 

  if (!order) return res.status(404).json({ message: "Order not found" });
  res.json(order);
})