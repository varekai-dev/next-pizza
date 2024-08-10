import { redirect } from 'next/navigation'
import dayjs from 'dayjs'

import { prisma } from '@/prisma/prisma-client'
import { SettingOrderItem, Tag, Title } from '@/shared/components/shared'
import { Accordion } from '@/shared/components/ui'
import { getIngredientsCost } from '@/shared/lib'
import { getUserSession } from '@/shared/lib/get-user-session'
import { CartItemDTO } from '@/shared/services/dto/cart.dto'

export default async function OrdersPage() {
  const session = await getUserSession()
  if (!session) {
    return redirect('/not-auth')
  }
  const orders = await prisma.order.findMany({
    orderBy: {
      updatedAt: 'desc',
    },
    where: {
      userId: session.id,
    },
  })

  return (
    <div className="w-full overflow-x-auto scrollbar">
      <Title text="Orders" size="md" className="font-bold mb-5" />
      <Accordion.Accordion type="single" collapsible className="lg:w-[750px] md:w-[550px] flex flex-col gap-5">
        {orders.map((order, index) => {
          const orderNumber = orders.length - index
          const orderItems: CartItemDTO[] = order.items ? JSON.parse(order.items as string) : []

          const totalPrice = orderItems.reduce((acc, item) => {
            return acc + item.productItem.price + getIngredientsCost(item)
          }, 0)
          return (
            <Accordion.AccordionItem key={order.id} value={order.id} className="px-0">
              <Accordion.AccordionTrigger className="px-8 sticky top-0">
                <div className="flex justify-between w-full flex-wrap sm:gap-0 gap-2">
                  <div className="flex gap-5 items-center">
                    <Title text={`Order #${orderNumber}`} className="font-bold sm:block hidden" />
                    <div className="text-gray-400 sm:text-[16px] text-[14px]">
                      {dayjs(order.createdAt).format('D MMMM YYYY,  HH:mm')}
                    </div>
                  </div>
                  <Tag status={order.status} className="mr-5 text-[14px]" />
                </div>
              </Accordion.AccordionTrigger>
              <Accordion.AccordionContent>
                <div className="flex flex-col pt-4 px-0 max-h-[510px] overflow-x-auto scrollbar">
                  {orderItems?.map((item) => <SettingOrderItem key={item.id} item={item} />)}
                </div>

                <div className="pt-6 pl-4 text-[20px]">
                  Total: <b>{totalPrice} ₴</b>
                </div>
              </Accordion.AccordionContent>
            </Accordion.AccordionItem>
          )
        })}
      </Accordion.Accordion>
    </div>
  )
}
