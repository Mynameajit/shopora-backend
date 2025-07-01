// generate product 

import { faker } from "@faker-js/faker";
import Product from "../Models/productModel.js";

// Generate 50 fake products based on schema
export const products = Array.from({ length: 50 }, () => ({
  name: faker.commerce.productName(),
  price: parseFloat(faker.commerce.price({ min: 100, max: 10000 })),
  description: faker.commerce.productDescription(),
  image: faker.image.url(), // or faker.image.imageUrl() for older versions
  category: faker.commerce.department(),
  stock: faker.number.int({ min: 10, max: 100 }),
}));

export const saveProduct = async () => {

  try {
    const product = await Product.insertMany([
      {

        "name": "Wireless Headphones",
        "price": 1499,
        "description": "Experience immersive sound with noise cancellation.",
        "image": "https://m.media-amazon.com/images/I/517lSvEVVsL.jpg",
        "category": "electronics",
        "stock": 100
      },
      {

        "name": "Smartwatch",
        "price": 2999,
        "description": "Track your fitness, heart rate and stay connected on the go.",
        "image": "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcQ-T8nfWI1wKI_v_pj_UckbWp4S1e5fUqPiyl5Wt9Zs8cFZCV5jwaltIRFG7-EZCoNy1dQJ6FP5Vxbk3Vn8GPLjxQI3XvDHzETwqwA7lBoe",
        "category": "electronics",
        "stock": 100
      },
      {

        "name": "Bluetooth Speaker",
        "price": 999,
        "description": "Compact and powerful sound with deep bass.",
        "image": "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcT4RXcR5OoHoQeaA0keX6kP-8RCZX2aoz8Sp8ozWA8uEIu-K7JjbAvLuKHs1CB5HEhRZwFwJe5VHvIyNR42BFQ8hWThbEbMqIAkW8UGCHdlhhzroGLh9UXaJA",
        "category": "electronics",
        "stock": 100
      },
      {

        "name": "Running Shoes",
        "price": 1799,
        "description": "Comfortable and stylish running shoes for all terrains.",
        "image": "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQkFQ4yl5xHTqweSbQ1LicKnZsSO1ugQDLPm5WJEwCNby-O5jFV56NVGN0c3OFJUwkYSWOCj909Sh3a4cFRHxshdLdjrahB29s1sPphNrY--PPGxteJGfCY",
        "category": "fashion",
        "stock": 100
      },
      {

        "name": "Designer T-shirt",
        "price": 599,
        "description": "Trendy and breathable cotton t-shirt.",
        "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPV9p3HhLiXm73Baohc1q_OjSLI9-JEvVhJA&s",
        "category": "fashion",
        "stock": 100
      },
      {

        "name": "Backpack",
        "price": 899,
        "description": "Durable and spacious backpack for everyday use.",
        "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWaEy7NVSPZxqUt1qJlSFisDCfOEkwD9l0xA&s",
        "category": "accessories",
        "stock": 100
      },
      {

        "name": "Sunglasses",
        "price": 499,
        "description": "Stylish UV protection for your eyes.",
        "image": "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcTZ9_b22iL_5CCLLu4Am4S8WTBKm6916Eh6PbUrtJsVjH3T5YIfWSOkIfcS7eFQ5Pb-yUtKejRD8RYW5-Tn_QzSPKPX8NLo",
        "category": "accessories",
        "stock": 100
      },
      {

        "name": "Laptop Stand",
        "price": 1199,
        "description": "Ergonomic and adjustable laptop stand.",
        "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdLvbVvOiiX-8zuN2L8He7MjIDgj6ly7fnXg&s",
        "category": "electronics",
        "stock": 100
      },
      {

        "name": "LED Table Lamp",
        "price": 699,
        "description": "Sleek and stylish lamp with adjustable brightness.",
        "image": "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcTmHm3Y32J239W2CwEOD76fQIWaqVEGwQqMjAFbD3AK61fcmjUP9DVQoHuRowSWRd_YbBb_w8DhqH6BAqmem4q_ESyP3ViHf0S9Bgm-Jo0",
        "category": "home",
        "stock": 100
      }
    ])
    console.log("Product Saved", product)
  } catch (error) {
    console.log("Not save : ", error)
  }
}