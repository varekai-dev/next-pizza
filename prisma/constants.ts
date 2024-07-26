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
        imageUrl:
            'https://media.dodostatic.net/image/r:233x233/11EE7D61304FAF5A98A6958F2BB2D260.webp',
        categoryId: 1,
        ingredients: {
            connect: ingredients.slice(0, 5),
        },
    },
    {
        name: 'Cheese',
        imageUrl:
            'https://media.dodostatic.net/image/r:233x233/11EE7D610CF7E265B7C72BE5AE757CA7.webp',
        categoryId: 1,
        ingredients: {
            connect: ingredients.slice(5, 10),
        },
    },
    {
        name: 'Chorizo Fresh',
        imageUrl:
            'https://media.dodostatic.net/image/r:584x584/11EE7D61706D472F9A5D71EB94149304.webp',
        categoryId: 1,
        ingredients: {
            connect: ingredients.slice(10, 40),
        },
    },
]

export const products = [
    {
        name: 'Omelette with Ham and Mushrooms',
        imageUrl:
            'https://media.dodostatic.net/image/r:292x292/11EE7970321044479C1D1085457A36EB.webp',
        categoryId: 2,
    },
    {
        name: 'Omelette with Pepperoni',
        imageUrl:
            'https://media.dodostatic.net/image/r:292x292/11EE94ECF33B0C46BA410DEC1B1DD6F8.webp',
        categoryId: 2,
    },
    {
        name: 'Coffee Latte',
        imageUrl:
            'https://media.dodostatic.net/image/r:292x292/11EE7D61B0C26A3F85D97A78FEEE00AD.webp',
        categoryId: 2,
    },
    {
        name: 'Denwich Ham and Cheese',
        imageUrl:
            'https://media.dodostatic.net/image/r:292x292/11EE796FF0059B799A17F57A9E64C725.webp',
        categoryId: 3,
    },
    {
        name: 'Chicken Nuggets',
        imageUrl:
            'https://media.dodostatic.net/image/r:292x292/11EE7D618B5C7EC29350069AE9532C6E.webp',
        categoryId: 3,
    },
    {
        name: 'Baked Potato with Sauce 🌱',
        imageUrl:
            'https://media.dodostatic.net/image/r:292x292/11EED646A9CD324C962C6BEA78124F19.webp',
        categoryId: 3,
    },
    {
        name: 'Dodster',
        imageUrl:
            'https://media.dodostatic.net/image/r:292x292/11EE796F96D11392A2F6DD73599921B9.webp',
        categoryId: 3,
    },
    {
        name: 'Spicy Dodster 🌶️🌶️',
        imageUrl:
            'https://media.dodostatic.net/image/r:292x292/11EE796FD3B594068F7A752DF8161D04.webp',
        categoryId: 3,
    },
    {
        name: 'Banana Milkshake',
        imageUrl:
            'https://media.dodostatic.net/image/r:292x292/11EEE20B8772A72A9B60CFB20012C185.webp',
        categoryId: 4,
    },
    {
        name: 'Caramel Apple Milkshake',
        imageUrl:
            'https://media.dodostatic.net/image/r:292x292/11EE79702E2A22E693D96133906FB1B8.webp',
        categoryId: 4,
    },
    {
        name: 'Oreo Cookie Milkshake',
        imageUrl:
            'https://media.dodostatic.net/image/r:292x292/11EE796FA1F50F8F8111A399E4C1A1E3.webp',
        categoryId: 4,
    },
    {
        name: 'Classic Milkshake 👶',
        imageUrl:
            'https://media.dodostatic.net/image/r:292x292/11EE796F93FB126693F96CB1D3E403FB.webp',
        categoryId: 4,
    },
    {
        name: 'Irish Cappuccino',
        imageUrl:
            'https://media.dodostatic.net/image/r:292x292/11EE7D61999EBDA59C10E216430A6093.webp',
        categoryId: 5,
    },
    {
        name: 'Caramel Cappuccino Coffee',
        imageUrl:
            'https://media.dodostatic.net/image/r:292x292/11EE7D61AED6B6D4BFDAD4E58D76CF56.webp',
        categoryId: 5,
    },
    {
        name: 'Coconut Latte Coffee',
        imageUrl:
            'https://media.dodostatic.net/image/r:292x292/11EE7D61B19FA07090EE88B0ED347F42.webp',
        categoryId: 5,
    },
    {
        name: 'Americano Coffee',
        imageUrl:
            'https://media.dodostatic.net/image/r:292x292/11EE7D61B044583596548A59078BBD33.webp',
        categoryId: 5,
    },
    {
        name: 'Coffee Latte',
        imageUrl:
            'https://media.dodostatic.net/image/r:292x292/11EE7D61B0C26A3F85D97A78FEEE00AD.webp',
        categoryId: 5,
    },
]
