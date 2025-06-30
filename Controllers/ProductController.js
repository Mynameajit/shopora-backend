//

import mongoose from "mongoose";
import Product from "../Models/productModel.js";
import { products } from "../seed/seeds.js";
import { catchAsyncError } from "../middlewares/catchasyncerror.js";
import ErrorHandler from "../utils/errorHandler.js";


// create product 
export const createProduct = catchAsyncError(async (req, res, next) => {

    const { name, price, description, image, category, stock } = req.body || {}

    if (!name || !price || !description || !image || !category || !stock) return next(new ErrorHandler("All felid are required", 404))

   const createdProducts = await Product.insertMany(req.body);
  res.status(201).json({ success: true, products: createdProducts });

    res.status(200).json({
        success: true,
        message: " Product Save Successfully",
        product
    })

})

// get all products
export const getProducts = catchAsyncError(async (req, res, next) => {

    const products = await Product.find({})
    if (!products) return next(new ErrorHandler("Product not Exist,Add first", 404))

    res.status(200).json({
        success: true,
        message: "All Products fetched Successfully",
        products
    })

})



//search products 
export const searchProducts = catchAsyncError(async (req, res) => {
    const searchQuery = req.query.search;

    const keyword = searchQuery
        ? {
            $or: [
                { name: { $regex: searchQuery, $options: "i" } },
                { category: { $regex: searchQuery, $options: "i" } },
                { description: { $regex: searchQuery, $options: "i" } }
            ]
        }
        : {};

    const products = await Product.find(keyword);

    res.status(200).json({
        success: true,
        products,
    });
});



// get product by id 
export const getProductById = catchAsyncError(async (req, res, next) => {

    const { id } = req.params;
    if (!id) return next(new ErrorHandler("please provide product id", 404))

    const product = await Product.findById(id);
    if (!product) return next(new ErrorHandler("Product not found", 400))

    res.status(200).json({
        success: true,
        message: "Product Fetched Successfully",
        product

    })

})



//update products
export const updateProducts = catchAsyncError(async (req, res, next) => {
    const { id } = req.params
    const updateProducts = req.body

    if (!id) return next(new ErrorHandler("please provide product id", 404))
    const product = await Product.findByIdAndUpdate(id, updateProducts, {
        new: true, runValidators: true
    })
    if (!product) return next(new ErrorHandler("Product not found"))
    res.status(200).json({ success: true, data: product });


})





//delate products
export const deleteProduct = catchAsyncError(async (req, res) => {
    const { id } = req.params

    if (!id) return next(new ErrorHandler("please provide product id", 404))
    const product = await Product.findByIdAndDelete(id);

    if (!product) return next(new ErrorHandler("Product not found", 400))
    res.status(200).json({ success: true, message: 'Product deleted' });

})

