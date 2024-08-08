import { prisma } from './prisma-client'
import { Prisma } from '@prisma/client'

import { PizzaSize, PizzaType } from '@/shared/constants'

import { categories, ingredients, pizzas, products, productsIds, stories, storyItems,users } from './constants'

const randomDecimalNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min) * 10 + min * 10) / 10
}

const generateProductItem = ({
  productId,
  pizzaType,
  size,
}: {
  productId: string
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
      generateProductItem({
        productId: productsIds.omeletteWithHamAndMushrooms,
      }),
      generateProductItem({
        productId: productsIds.omeletteWithPepperoni,
      }),
      generateProductItem({ productId: productsIds.coffeeLatte }),
      generateProductItem({ productId: productsIds.denwichHamAndCheese }),
      generateProductItem({ productId: productsIds.chickenNuggets }),
      generateProductItem({
        productId: productsIds.bakedPotatoWithSauce,
      }),
      generateProductItem({ productId: productsIds.dodster }),
      generateProductItem({ productId: productsIds.spicyDodster }),
      generateProductItem({ productId: productsIds.bananaMilkshake }),
      generateProductItem({
        productId: productsIds.caramelAppleMilkshake,
      }),
      generateProductItem({ productId: productsIds.oreoCookieMilkshake }),
      generateProductItem({ productId: productsIds.classicMilkshake }),
      generateProductItem({ productId: productsIds.irishCappuccino }),
      generateProductItem({
        productId: productsIds.caramelCappuccinoCoffee,
      }),
      generateProductItem({ productId: productsIds.coconutLatteCoffee }),
      generateProductItem({ productId: productsIds.americanoCoffee }),
    ],
  })

  // await prisma.cart.createMany({
  //     data: [
  //         {
  //             userId: usersIds.user,
  //             totalAmount: 650,
  //             token: '1111',
  //         },
  //         {
  //             userId: usersIds.admin,
  //             totalAmount: 550,
  //             token: '2222',
  //         },
  //     ],
  // })

  // await prisma.cartItem.create({
  //     data: {
  //         productItemId: 1,
  //         cartId: 1,
  //         quantity: 2,
  //         ingredients: {
  //             connect: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }],
  //         },
  //     },
  // })

  await prisma.story.createMany({
    data: stories,
  })

  await prisma.storyItem.createMany({
    data: storyItems,
  })
}
async function down() {
  await prisma.user.deleteMany({})
  await prisma.product.deleteMany({})
  await prisma.ingredient.deleteMany({})
  await prisma.order.deleteMany({})
  await prisma.productItem.deleteMany({})
  await prisma.verificationCode.deleteMany({})
  await prisma.category.deleteMany({})
  await prisma.cart.deleteMany({})
  await prisma.cartItem.deleteMany({})
  await prisma.story.deleteMany({})
  await prisma.storyItem.deleteMany({})
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
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
