import mongoose from "mongoose";

// product schema 
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is Required"]
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
},{ timestamps: true });


const Product = mongoose.model('Product', productSchema)

export default Product



