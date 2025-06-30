

import { Router } from 'express'
import { createProduct, deleteProduct, getProductById, getProducts, searchProducts, updateProducts } from '../Controllers/ProductController.js';


const router = Router();


// POST create product
router.post('/create', createProduct)

// GET all products
router.get('/all', getProducts)

// GET search products
router.get('/search', searchProducts)

// GET product by ID
router.get('/details/:id', getProductById)

// PUT update product
router.put('/update/:id', updateProducts);

// DELETE product
router.delete('/delete/:id', deleteProduct);




export default router;