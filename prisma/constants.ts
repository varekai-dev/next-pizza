import { Ingredient, User } from '@prisma/client'
import { hashSync } from 'bcrypt'
import { ObjectId } from 'bson'

export const categoriesIds = {
    pizza: String(new ObjectId()),
    combo: String(new ObjectId()),
    appetizers: String(new ObjectId()),
    cocktails: String(new ObjectId()),
    coffee: String(new ObjectId()),
    drinks: String(new ObjectId()),
    desserts: String(new ObjectId()),
}

export const categories = [
    { name: 'Pizza', id: categoriesIds.pizza },
    { name: 'Combo', id: categoriesIds.combo },
    { name: 'Appetizers', id: categoriesIds.appetizers },
    { name: 'Cocktails', id: categoriesIds.cocktails },
    { name: 'Coffee', id: categoriesIds.coffee },
    { name: 'Drinks', id: categoriesIds.drinks },
    { name: 'Desserts', id: categoriesIds.desserts },
]

export const usersIds = {
    user: String(new ObjectId()),
    admin: String(new ObjectId()),
}

export const users: Omit<
    User,
    'provider' | 'providerId' | 'createdAt' | 'updatedAt'
>[] = [
    {
        id: usersIds.user,
        fullName: 'User Test',
        email: 's.saviuk@apiko.com',
        password: hashSync('111111', 10),
        verified: new Date(),
        role: 'USER',
        phone: '+38(000)-000-00-00',
    },
    {
        id: usersIds.admin,
        fullName: 'Admin Admin',
        email: 'serhijsav@gmail.com',
        password: hashSync('111111', 10),
        verified: new Date(),
        role: 'ADMIN',
        phone: '+38(000)-000-00-00',
    },
]

export const ingredientsIds = {
    cheeseCrust: String(new ObjectId()),
    creamyMozzarella: String(new ObjectId()),
    cheddarAndParmesanCheeses: String(new ObjectId()),
    spicyJalapenoPepper: String(new ObjectId()),
    tenderChicken: String(new ObjectId()),
    mushrooms: String(new ObjectId()),
    ham: String(new ObjectId()),
    spicyPepperoni: String(new ObjectId()),
    spicyChorizo: String(new ObjectId()),
    pickledCucumbers: String(new ObjectId()),
    freshTomatoes: String(new ObjectId()),
    redOnion: String(new ObjectId()),
    juicyPineapples: String(new ObjectId()),
    italianHerbs: String(new ObjectId()),
    sweetPepper: String(new ObjectId()),
    fetaCheeseCubes: String(new ObjectId()),
    meatballs: String(new ObjectId()),
}

export const ingredients: Omit<Ingredient, 'createdAt' | 'updatedAt'>[] = [
    {
        id: ingredientsIds.cheeseCrust,
        name: 'Cheese Crust',
        price: 29,
        imageUrl: '/assets/ingredients/cheese-crust.png',
        productIds: [],
        cartItemIds: [],
    },
    {
        id: ingredientsIds.creamyMozzarella,
        name: 'Creamy Mozzarella',
        price: 19,
        imageUrl: '/assets/ingredients/creamy-mozzarella.png',
        productIds: [],
        cartItemIds: [],
    },
    {
        id: ingredientsIds.cheddarAndParmesanCheeses,
        name: 'Cheddar and Parmesan Cheeses',
        price: 29,
        imageUrl: '/assets/ingredients/cheddar-and-parmesan-cheeses.png',
        productIds: [],
        cartItemIds: [],
    },
    {
        id: ingredientsIds.spicyJalapenoPepper,
        name: 'Spicy Jalapeño Pepper',
        price: 19,
        imageUrl: '/assets/ingredients/spicy-jalapeno-pepper.png',
        productIds: [],
        cartItemIds: [],
    },
    {
        id: ingredientsIds.tenderChicken,
        name: 'Tender Chicken',
        price: 39,
        imageUrl: '/assets/ingredients/tender-chicken.png',
        productIds: [],
        cartItemIds: [],
    },
    {
        id: ingredientsIds.mushrooms,
        name: 'Mushrooms',
        price: 19,
        imageUrl: '/assets/ingredients/mushrooms.png',
        productIds: [],
        cartItemIds: [],
    },
    {
        id: ingredientsIds.ham,
        name: 'Ham',
        price: 39,
        imageUrl: '/assets/ingredients/ham.png',
        productIds: [],
        cartItemIds: [],
    },
    {
        id: ingredientsIds.spicyPepperoni,
        name: 'Spicy Pepperoni',
        price: 19,
        imageUrl: '/assets/ingredients/cheese-crust.png',
        productIds: [],
        cartItemIds: [],
    },
    {
        id: ingredientsIds.spicyChorizo,
        name: 'Spicy Chorizo',
        price: 19,
        imageUrl: '/assets/ingredients/spicy-pepperoni.png',
        productIds: [],
        cartItemIds: [],
    },
    {
        id: ingredientsIds.pickledCucumbers,
        name: 'Pickled Cucumbers',
        price: 19,
        imageUrl: '/assets/ingredients/pickled-cucumbers.png',
        productIds: [],
        cartItemIds: [],
    },
    {
        id: ingredientsIds.freshTomatoes,
        name: 'Fresh Tomatoes',
        price: 19,
        imageUrl: '/assets/ingredients/fresh-tomatoes.png',
        productIds: [],
        cartItemIds: [],
    },
    {
        id: ingredientsIds.redOnion,
        name: 'Red Onion',
        price: 19,
        imageUrl: '/assets/ingredients/red-onion.png',
        productIds: [],
        cartItemIds: [],
    },
    {
        id: ingredientsIds.juicyPineapples,
        name: 'Juicy Pineapples',
        price: 39,
        imageUrl: '/assets/ingredients/juicy-pineapples.png',
        productIds: [],
        cartItemIds: [],
    },
    {
        id: ingredientsIds.italianHerbs,
        name: 'Italian Herbs',
        price: 19,
        imageUrl: '/assets/ingredients/italian-herbs.png',
        productIds: [],
        cartItemIds: [],
    },
    {
        id: ingredientsIds.sweetPepper,
        name: 'Sweet Pepper',
        price: 19,
        imageUrl: '/assets/ingredients/sweet-pepper.png',
        productIds: [],
        cartItemIds: [],
    },
    {
        id: ingredientsIds.fetaCheeseCubes,
        name: 'Feta Cheese Cubes',
        price: 29,
        imageUrl: '/assets/ingredients/feta-cheese-cubes.png',
        productIds: [],
        cartItemIds: [],
    },
    {
        id: ingredientsIds.meatballs,
        name: 'Meatballs',
        price: 39,
        imageUrl: '/assets/ingredients/meatballs.png',
        productIds: [],
        cartItemIds: [],
    },
]

export const pizzas = [
    {
        name: 'Pepperoni Fresh',
        imageUrl: '/assets/products/pizza/peperoni-fresh.webp',
        categoryId: categoriesIds.pizza,
        ingredients: {
            connect: Object.values(ingredientsIds)
                .slice(0, 5)
                .map(id => ({ id })),
        },
    },
    {
        name: 'Cheese',
        imageUrl: '/assets/products/pizza/cheese.webp',
        categoryId: categoriesIds.pizza,
        ingredients: {
            connect: Object.values(ingredientsIds)
                .slice(5, 10)
                .map(id => ({ id })),
        },
    },
    {
        name: 'Chorizo Fresh',
        imageUrl: '/assets/products/pizza/chorizo-fresh.webp',
        categoryId: categoriesIds.pizza,
        ingredients: {
            connect: Object.values(ingredientsIds)
                .slice(10, 40)
                .map(id => ({ id })),
        },
    },
]

export const productsIds = {
    omeletteWithHamAndMushrooms: String(new ObjectId()),
    omeletteWithPepperoni: String(new ObjectId()),
    coffeeLatte: String(new ObjectId()),
    denwichHamAndCheese: String(new ObjectId()),
    chickenNuggets: String(new ObjectId()),
    bakedPotatoWithSauce: String(new ObjectId()),
    dodster: String(new ObjectId()),
    spicyDodster: String(new ObjectId()),
    bananaMilkshake: String(new ObjectId()),
    caramelAppleMilkshake: String(new ObjectId()),
    oreoCookieMilkshake: String(new ObjectId()),
    classicMilkshake: String(new ObjectId()),
    irishCappuccino: String(new ObjectId()),
    caramelCappuccinoCoffee: String(new ObjectId()),
    coconutLatteCoffee: String(new ObjectId()),
    americanoCoffee: String(new ObjectId()),
}

export const products = [
    {
        id: productsIds.omeletteWithHamAndMushrooms,
        name: 'Omelette with Ham and Mushrooms',
        imageUrl: '/assets/products/combo/omelette-with-ham-and-mushrooms.webp',
        categoryId: categoriesIds.combo,
    },
    {
        id: productsIds.omeletteWithPepperoni,
        name: 'Omelette with Pepperoni',
        imageUrl: '/assets/products/combo/omelette-with-pepperoni.webp',
        categoryId: categoriesIds.combo,
    },
    {
        id: productsIds.coffeeLatte,
        name: 'Coffee Latte',
        imageUrl: '/assets/products/coffee/coffee-latte.webp',
        categoryId: categoriesIds.coffee,
    },
    {
        id: productsIds.denwichHamAndCheese,
        name: 'Denwich Ham and Cheese',
        imageUrl: '/assets/products/appetizers/denwich-ham-and-cheese.webp',
        categoryId: categoriesIds.appetizers,
    },
    {
        id: productsIds.chickenNuggets,
        name: 'Chicken Nuggets',
        imageUrl: '/assets/products/appetizers/chicken-nuggets.webp',
        categoryId: categoriesIds.appetizers,
    },
    {
        id: productsIds.bakedPotatoWithSauce,
        name: 'Baked Potato with Sauce 🌱',
        imageUrl: '/assets/products/appetizers/baked-potato-with-sauce.webp',
        categoryId: categoriesIds.appetizers,
    },
    {
        id: productsIds.dodster,
        name: 'Dodster',
        imageUrl: '/assets/products/appetizers/dodster.webp',
        categoryId: categoriesIds.appetizers,
    },
    {
        id: productsIds.spicyDodster,
        name: 'Spicy Dodster 🌶️🌶️',
        imageUrl: '/assets/products/appetizers/spicy-dodster.webp',
        categoryId: categoriesIds.appetizers,
    },
    {
        id: productsIds.bananaMilkshake,
        name: 'Banana Milkshake',
        imageUrl: '/assets/products/cocktails/banana-milkshake.webp',
        categoryId: categoriesIds.cocktails,
    },
    {
        id: productsIds.caramelAppleMilkshake,
        name: 'Caramel Apple Milkshake',
        imageUrl: '/assets/products/cocktails/caramel-apple-milkshake.webp',
        categoryId: categoriesIds.cocktails,
    },
    {
        id: productsIds.oreoCookieMilkshake,
        name: 'Oreo Cookie Milkshake',
        imageUrl: '/assets/products/cocktails/oreo-cookie-milkshake.webp',
        categoryId: categoriesIds.cocktails,
    },
    {
        id: productsIds.classicMilkshake,
        name: 'Classic Milkshake 👶',
        imageUrl: '/assets/products/cocktails/classic-milkshake.webp',
        categoryId: categoriesIds.cocktails,
    },
    {
        id: productsIds.irishCappuccino,
        name: 'Irish Cappuccino',
        imageUrl: '/assets/products/drinks/irish-cappuccino.webp',
        categoryId: categoriesIds.drinks,
    },
    {
        id: productsIds.caramelCappuccinoCoffee,
        name: 'Caramel Cappuccino Coffee',
        imageUrl: '/assets/products/drinks/caramel-cappuccino-coffee.webp',
        categoryId: categoriesIds.drinks,
    },
    {
        id: productsIds.coconutLatteCoffee,
        name: 'Coconut Latte Coffee',
        imageUrl: '/assets/products/drinks/coconut-latte-coffee.webp',
        categoryId: categoriesIds.drinks,
    },
    {
        id: productsIds.americanoCoffee,
        name: 'Americano Coffee',
        imageUrl: '/assets/products/coffee/americano-coffee.webp',
        categoryId: categoriesIds.coffee,
    },
]

export const storiesIds = {
    1: String(new ObjectId()),
    2: String(new ObjectId()),
    3: String(new ObjectId()),
    4: String(new ObjectId()),
    5: String(new ObjectId()),
    6: String(new ObjectId()),
}

export const stories = [
    {
        previewImageUrl: '/assets/stories/11.jpg',
        id: storiesIds[1],
    },
    {
        previewImageUrl: '/assets/stories/21.jpg',
        id: storiesIds[2],
    },
]

export const storyItems = [
    {
        storyId: storiesIds[1],
        sourceUrl: '/assets/stories/11.jpg',
    },
    {
        storyId: storiesIds[1],
        sourceUrl: '/assets/stories/12.jpg',
    },
    {
        storyId: storiesIds[1],
        sourceUrl: '/assets/stories/13.jpg',
    },
    {
        storyId: storiesIds[2],
        sourceUrl: '/assets/stories/21.jpg',
    },
    {
        storyId: storiesIds[2],
        sourceUrl: '/assets/stories/22.jpg',
    },
    {
        storyId: storiesIds[2],
        sourceUrl: '/assets/stories/23.jpg',
    },
    {
        storyId: storiesIds[2],
        sourceUrl: '/assets/stories/24.jpg',
    },
]
