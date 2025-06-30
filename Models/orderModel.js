



import mongoose from "mongoose";


const addressSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  mobileNumber: { type: String, required: true },
  houseNo: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  pinCode: { type: String, required: true },
  landMark: { type: String }
}, { _id: false });



const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  address: addressSchema,
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
      },
      quantity: {
        type: Number,
        required: true
      }
    }
  ],
  totalAmount: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ["Processing", "Shipped", "Delivered", "Cancelled"],
    default: "Processing"
  },
  paymentMethod: {
    type: String,
    enum: ["Cash on Delivery", "Online"],
    default: "Cash on Delivery"
  },
  paymentStatus: {
    type: String,
    enum: ["Success", "Failed", "Pending"],
    default: function () {
      return this.paymentMethod === "Online" ? "Success" : "Pending";
    },
  },

}, { timestamps: true });

const Order = mongoose.model("Order", orderSchema);

export default Order;



