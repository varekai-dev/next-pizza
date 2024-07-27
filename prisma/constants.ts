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
        price: 179,
        imageUrl:
            'https://cdn.dodostatic.net/static/Img/Ingredients/99f5cb91225b4875bd06a26d2e842106.png',
    },
    {
        id: 2,
        name: 'Creamy Mozzarella',
        price: 79,
        imageUrl:
            'https://cdn.dodostatic.net/static/Img/Ingredients/cdea869ef287426386ed634e6099a5ba.png',
    },
    {
        id: 3,
        name: 'Cheddar and Parmesan Cheeses',
        price: 79,
        imageUrl:
            'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA69C1FE796',
    },
    {
        id: 4,
        name: 'Spicy Jalapeño Pepper',
        price: 59,
        imageUrl:
            'https://cdn.dodostatic.net/static/Img/Ingredients/11ee95b6bfdf98fb88a113db92d7b3df.png',
    },
    {
        id: 5,
        name: 'Tender Chicken',
        price: 79,
        imageUrl:
            'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A39D824A82E11E9AFA5B328D35A',
    },
    {
        id: 6,
        name: 'Mushrooms',
        price: 59,
        imageUrl:
            'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA67259A324',
    },
    {
        id: 7,
        name: 'Ham',
        price: 79,
        imageUrl:
            'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A39D824A82E11E9AFA61B9A8D61',
    },
    {
        id: 8,
        name: 'Spicy Pepperoni',
        price: 79,
        imageUrl:
            'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA6258199C3',
    },
    {
        id: 9,
        name: 'Spicy Chorizo',
        price: 79,
        imageUrl:
            'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA62D5D6027',
    },
    {
        id: 10,
        name: 'Pickled Cucumbers',
        price: 59,
        imageUrl:
            'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A21DA51A81211E9EA89958D782B',
    },
    {
        id: 11,
        name: 'Fresh Tomatoes',
        price: 59,
        imageUrl:
            'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A39D824A82E11E9AFA7AC1A1D67',
    },
    {
        id: 12,
        name: 'Red Onion',
        price: 59,
        imageUrl:
            'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA60AE6464C',
    },
    {
        id: 13,
        name: 'Juicy Pineapples',
        price: 59,
        imageUrl:
            'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A21DA51A81211E9AFA6795BA2A0',
    },
    {
        id: 14,
        name: 'Italian Herbs',
        price: 39,
        imageUrl:
            'https://cdn.dodostatic.net/static/Img/Ingredients/370dac9ed21e4bffaf9bc2618d258734.png',
    },
    {
        id: 15,
        name: 'Sweet Pepper',
        price: 59,
        imageUrl:
            'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA63F774C1B',
    },
    {
        id: 16,
        name: 'Feta Cheese Cubes',
        price: 79,
        imageUrl:
            'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A39D824A82E11E9AFA6B0FFC349',
    },
    {
        id: 17,
        name: 'Meatballs',
        price: 79,
        imageUrl:
            'https://cdn.dodostatic.net/static/Img/Ingredients/b2f3a5d5afe44516a93cfc0d2ee60088.png',
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
