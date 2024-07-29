import { Ingredient, User } from '@prisma/client'
import { hashSync } from 'bcrypt'

export const categories = [
    { name: 'Pizza' },
    { name: 'Combo' },
    { name: 'Appetizers' },
    { name: 'Cocktails' },
    { name: 'Coffee' },
    { name: 'Drinks' },
    { name: 'Desserts' },
]

export const users: Omit<
    User,
    'provider' | 'providerId' | 'createdAt' | 'updatedAt' | 'id'
>[] = [
    {
        fullName: 'User Test',
        email: 's.saviuk@apiko.com',
        password: hashSync('111111', 10),
        verified: new Date(),
        role: 'USER',
    },
    {
        fullName: 'Admin Admin',
        email: 'serhijsav@gmail.com',
        password: hashSync('111111', 10),
        verified: new Date(),
        role: 'ADMIN',
    },
]

export const ingredients: Omit<Ingredient, 'createdAt' | 'updatedAt'>[] = [
    {
        id: 1,
        name: 'Cheese Crust',
        price: 29,
        imageUrl: '/assets/ingredients/cheese-crust.png',
    },
    {
        id: 2,
        name: 'Creamy Mozzarella',
        price: 19,
        imageUrl: '/assets/ingredients/creamy-mozzarella.png',
    },
    {
        id: 3,
        name: 'Cheddar and Parmesan Cheeses',
        price: 29,
        imageUrl: '/assets/ingredients/cheddar-and-parmesan-cheeses.png',
    },
    {
        id: 4,
        name: 'Spicy Jalapeño Pepper',
        price: 19,
        imageUrl: '/assets/ingredients/spicy-jalapeno-pepper.png',
    },
    {
        id: 5,
        name: 'Tender Chicken',
        price: 39,
        imageUrl: '/assets/ingredients/tender-chicken.png',
    },
    {
        id: 6,
        name: 'Mushrooms',
        price: 19,
        imageUrl: '/assets/ingredients/mushrooms.png',
    },
    {
        id: 7,
        name: 'Ham',
        price: 39,
        imageUrl: '/assets/ingredients/ham.png',
    },
    {
        id: 8,
        name: 'Spicy Pepperoni',
        price: 19,
        imageUrl: '/assets/ingredients/cheese-crust.png',
    },
    {
        id: 9,
        name: 'Spicy Chorizo',
        price: 19,
        imageUrl: '/assets/ingredients/spicy-pepperoni.png',
    },
    {
        id: 10,
        name: 'Pickled Cucumbers',
        price: 19,
        imageUrl: '/assets/ingredients/pickled-cucumbers.png',
    },
    {
        id: 11,
        name: 'Fresh Tomatoes',
        price: 19,
        imageUrl: '/assets/ingredients/fresh-tomatoes.png',
    },
    {
        id: 12,
        name: 'Red Onion',
        price: 19,
        imageUrl: '/assets/ingredients/red-onion.png',
    },
    {
        id: 13,
        name: 'Juicy Pineapples',
        price: 39,
        imageUrl: '/assets/ingredients/juicy-pineapples.png',
    },
    {
        id: 14,
        name: 'Italian Herbs',
        price: 19,
        imageUrl: '/assets/ingredients/italian-herbs.png',
    },
    {
        id: 15,
        name: 'Sweet Pepper',
        price: 19,
        imageUrl: '/assets/ingredients/sweet-pepper.png',
    },
    {
        id: 16,
        name: 'Feta Cheese Cubes',
        price: 29,
        imageUrl: '/assets/ingredients/feta-cheese-cubes.png',
    },
    {
        id: 17,
        name: 'Meatballs',
        price: 39,
        imageUrl: '/assets/ingredients/meatballs.png',
    },
]

export const pizzas = [
    {
        name: 'Pepperoni Fresh',
        imageUrl: '/assets/products/pizza/peperoni-fresh.webp',
        categoryId: 1,
        ingredients: {
            connect: ingredients.slice(0, 5),
        },
    },
    {
        name: 'Cheese',
        imageUrl: '/assets/products/pizza/cheese.webp',
        categoryId: 1,
        ingredients: {
            connect: ingredients.slice(5, 10),
        },
    },
    {
        name: 'Chorizo Fresh',
        imageUrl: '/assets/products/pizza/chorizo-fresh.webp',
        categoryId: 1,
        ingredients: {
            connect: ingredients.slice(10, 40),
        },
    },
]

export const products = [
    {
        name: 'Omelette with Ham and Mushrooms',
        imageUrl: '/assets/products/combo/omelette-with-ham-and-mushrooms.webp',
        categoryId: 2,
    },
    {
        name: 'Omelette with Pepperoni',
        imageUrl: '/assets/products/combo/omelette-with-pepperoni.webp',
        categoryId: 2,
    },
    {
        name: 'Coffee Latte',
        imageUrl: '/assets/products/coffee/coffee-latte.webp',
        categoryId: 5,
    },
    {
        name: 'Denwich Ham and Cheese',
        imageUrl: '/assets/products/appetizers/denwich-ham-and-cheese.webp',
        categoryId: 3,
    },
    {
        name: 'Chicken Nuggets',
        imageUrl: '/assets/products/appetizers/chicken-nuggets.webp',
        categoryId: 3,
    },
    {
        name: 'Baked Potato with Sauce 🌱',
        imageUrl: '/assets/products/appetizers/baked-potato-with-sauce.webp',
        categoryId: 3,
    },
    {
        name: 'Dodster',
        imageUrl: '/assets/products/appetizers/dodster.webp',
        categoryId: 3,
    },
    {
        name: 'Spicy Dodster 🌶️🌶️',
        imageUrl: '/assets/products/appetizers/spicy-dodster.webp',
        categoryId: 3,
    },
    {
        name: 'Banana Milkshake',
        imageUrl: '/assets/products/cocktails/banana-milkshake.webp',
        categoryId: 4,
    },
    {
        name: 'Caramel Apple Milkshake',
        imageUrl: '/assets/products/cocktails/caramel-apple-milkshake.webp',
        categoryId: 4,
    },
    {
        name: 'Oreo Cookie Milkshake',
        imageUrl: '/assets/products/cocktails/oreo-cookie-milkshake.webp',
        categoryId: 4,
    },
    {
        name: 'Classic Milkshake 👶',
        imageUrl: '/assets/products/cocktails/classic-milkshake.webp',
        categoryId: 4,
    },
    {
        name: 'Irish Cappuccino',
        imageUrl: '/assets/products/drinks/irish-cappuccino.webp',
        categoryId: 6,
    },
    {
        name: 'Caramel Cappuccino Coffee',
        imageUrl: '/assets/products/drinks/caramel-cappuccino-coffee.webp',
        categoryId: 6,
    },
    {
        name: 'Coconut Latte Coffee',
        imageUrl: '/assets/products/drinks/coconut-latte-coffee.webp',
        categoryId: 6,
    },
    {
        name: 'Americano Coffee',
        imageUrl: '/assets/products/coffee/americano-coffee.webp',
        categoryId: 5,
    },
]
