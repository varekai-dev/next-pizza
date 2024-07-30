import { Prisma } from '@prisma/client'
import { categories, users, ingredients, pizzas, products } from './constants'
import { prisma } from './prisma-client'
import { PizzaSize, PizzaType } from '@/shared/constants'

const randomDecimalNumber = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min) * 10 + min * 10) / 10
}

const generateProductItem = ({
    productId,
    pizzaType,
    size,
}: {
    productId: number
    pizzaType?: PizzaType
    size?: PizzaSize
}) => {
    return {
        productId,
        price: randomDecimalNumber(190, 600),
        pizzaType,
        size,
    } as Prisma.ProductItemUncheckedCreateInput
}

async function up() {
    await prisma.user.createMany({
        data: users,
    })

    await prisma.category.createMany({
        data: categories,
    })

    await prisma.ingredient.createMany({
        data: ingredients,
    })

    await prisma.product.createMany({
        data: products,
    })

    const [pizza1, pizza2, pizza3] = await Promise.all([
        prisma.product.create({ data: pizzas[0] }),
        prisma.product.create({ data: pizzas[1] }),
        prisma.product.create({ data: pizzas[2] }),
    ])

    await prisma.productItem.createMany({
        data: [
            // Pizza1
            generateProductItem({
                productId: pizza1.id,
                pizzaType: 1,
                size: 20,
            }),
            generateProductItem({
                productId: pizza1.id,
                pizzaType: 2,
                size: 30,
            }),
            generateProductItem({
                productId: pizza1.id,
                pizzaType: 2,
                size: 40,
            }),

            // Pizza2
            generateProductItem({
                productId: pizza2.id,
                pizzaType: 1,
                size: 20,
            }),
            generateProductItem({
                productId: pizza2.id,
                pizzaType: 1,
                size: 30,
            }),
            generateProductItem({
                productId: pizza2.id,
                pizzaType: 1,
                size: 40,
            }),
            generateProductItem({
                productId: pizza2.id,
                pizzaType: 2,
                size: 20,
            }),
            generateProductItem({
                productId: pizza2.id,
                pizzaType: 2,
                size: 30,
            }),
            generateProductItem({
                productId: pizza2.id,
                pizzaType: 2,
                size: 40,
            }),

            // Pizza3
            generateProductItem({
                productId: pizza3.id,
                pizzaType: 1,
                size: 20,
            }),
            generateProductItem({
                productId: pizza3.id,
                pizzaType: 2,
                size: 30,
            }),
            generateProductItem({
                productId: pizza3.id,
                pizzaType: 2,
                size: 40,
            }),

            // // Other
            generateProductItem({ productId: 1 }),
            generateProductItem({ productId: 2 }),
            generateProductItem({ productId: 3 }),
            generateProductItem({ productId: 4 }),
            generateProductItem({ productId: 5 }),
            generateProductItem({ productId: 6 }),
            generateProductItem({ productId: 7 }),
            generateProductItem({ productId: 8 }),
            generateProductItem({ productId: 9 }),
            generateProductItem({ productId: 10 }),
            generateProductItem({ productId: 11 }),
            generateProductItem({ productId: 12 }),
            generateProductItem({ productId: 13 }),
            generateProductItem({ productId: 14 }),
            generateProductItem({ productId: 15 }),
            generateProductItem({ productId: 16 }),
            generateProductItem({ productId: 17 }),
        ],
    })

    await prisma.cart.createMany({
        data: [
            {
                userId: 1,
                totalAmount: 650,
                token: '1111',
            },
            {
                userId: 2,
                totalAmount: 550,
                token: '2222',
            },
        ],
    })

    await prisma.cartItem.create({
        data: {
            productItemId: 1,
            cartId: 1,
            quantity: 2,
            ingredients: {
                connect: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }],
            },
        },
    })
}
async function down() {
    await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE;`
    await prisma.$executeRaw`TRUNCATE TABLE "Product" RESTART IDENTITY CASCADE;`
    await prisma.$executeRaw`TRUNCATE TABLE "Ingredient" RESTART IDENTITY CASCADE;`
    await prisma.$executeRaw`TRUNCATE TABLE "Order" RESTART IDENTITY CASCADE;`
    await prisma.$executeRaw`TRUNCATE TABLE "ProductItem" RESTART IDENTITY CASCADE;`
    await prisma.$executeRaw`TRUNCATE TABLE "VerificationCode" RESTART IDENTITY CASCADE;`
    await prisma.$executeRaw`TRUNCATE TABLE "Category" RESTART IDENTITY CASCADE;`
    await prisma.$executeRaw`TRUNCATE TABLE "Cart" RESTART IDENTITY CASCADE;`
    await prisma.$executeRaw`TRUNCATE TABLE "CartItem" RESTART IDENTITY CASCADE;`
}

async function main() {
    try {
        await down()
        await up()
    } catch (e) {
        console.error(e)
    }
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async e => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
