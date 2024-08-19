'use client'

import React from 'react'
import dayjs from 'dayjs'

import { SettingOrderItem, Tag, Title } from '@/shared/components/shared'
import { Accordion, Skeleton } from '@/shared/components/ui'
import { useGetOrders, useRole } from '@/shared/hooks'
import { getIngredientsCost } from '@/shared/lib'
import { CartItemDTO } from '@/shared/services/dto/cart.dto'

interface Props {
  className?: string
}

export const Orders: React.FC<Props> = ({ className }) => {
  const { orders, isFetching } = useGetOrders()
  const { isLoading } = useRole()

  return (
    <div className={className}>
      <Accordion.Accordion type="single" collapsible className="lg:w-[750px] md:w-[550px] flex flex-col gap-5">
        {isFetching || isLoading ? (
          <>
            {Array.from({ length: 5 }).map((_, index) => (
              <Skeleton key={index} className="h-[85px] mb-5" />
            ))}
          </>
        ) : (
          <>
            {orders?.map((order, index) => {
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
          </>
        )}
      </Accordion.Accordion>
    </div>
  )
}
