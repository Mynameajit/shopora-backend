// generate product 

import { faker } from "@faker-js/faker";

// Generate 50 fake products based on schema
export const products = Array.from({ length: 50 }, () => ({
  name: faker.commerce.productName(),
  price: parseFloat(faker.commerce.price({ min: 100, max: 10000 })),
  description: faker.commerce.productDescription(),
  image: faker.image.url(), // or faker.image.imageUrl() for older versions
  category: faker.commerce.department(),
  stock: faker.number.int({ min: 10, max: 100 }),
}));

