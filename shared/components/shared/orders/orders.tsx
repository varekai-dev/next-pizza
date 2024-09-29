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
      <Accordion.Accordion type="single" collapsible className="flex flex-col gap-5 md:w-[550px] lg:w-[750px]">
        {isFetching || isLoading ? (
          <>
            {Array.from({ length: 5 }).map((_, index) => (
              <Skeleton key={index} className="mb-5 h-[85px]" />
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
                  <Accordion.AccordionTrigger className="sticky top-0 px-8">
                    <div className="flex w-full flex-wrap justify-between gap-2 sm:gap-0">
                      <div className="flex items-center gap-5">
                        <Title text={`Order #${orderNumber}`} className="hidden font-bold sm:block" />
                        <div className="text-[14px] text-gray-400 sm:text-[16px]">
                          {dayjs(order.createdAt).format('D MMMM YYYY,  HH:mm')}
                        </div>
                      </div>
                      <Tag status={order.status} className="mr-5 text-[14px]" />
                    </div>
                  </Accordion.AccordionTrigger>
                  <Accordion.AccordionContent>
                    <div className="scrollbar flex max-h-[510px] flex-col overflow-x-auto px-0 pt-4">
                      {orderItems?.map((item) => <SettingOrderItem key={item.id} item={item} />)}
                    </div>

                    <div className="pl-4 pt-6 text-[20px]">
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
