import React from 'react'
import Image from 'next/image'
import { redirect } from 'next/navigation'
import dayjs from 'dayjs'
import { OrderStatus, UserRole } from '@prisma/client'
import { ClipboardList, Pizza, ShoppingBag, Users, Wallet } from 'lucide-react'

import { prisma } from '@/prisma/prisma-client'
import { Tag, Title } from '@/shared/components/shared'
import { cn } from '@/shared/lib'
import { getUserSession } from '@/shared/lib/get-user-session'

const statusBarColor: Record<OrderStatus, string> = {
  [OrderStatus.SUCCEEDED]: 'bg-[#1bb486]',
  [OrderStatus.PENDING]: 'bg-[#e6c32e]',
  [OrderStatus.CANCELLED]: 'bg-[#ff544a]',
}

const statusLabel: Record<OrderStatus, string> = {
  [OrderStatus.SUCCEEDED]: 'Succeeded',
  [OrderStatus.PENDING]: 'Pending',
  [OrderStatus.CANCELLED]: 'Cancelled',
}

const formatMoney = (value: number) => `${value.toLocaleString('uk-UA')} ₴`

interface StatCardProps {
  title: string
  value: string | number
  description?: string
  icon: React.ReactNode
}

const StatCard: React.FC<StatCardProps> = ({ title, value, description, icon }) => (
  <div className="rounded-md bg-white p-5">
    <div className="mb-3 flex items-center justify-between text-gray-400">
      <span className="font-semibold">{title}</span>
      <span className="flex size-9 items-center justify-center rounded-md bg-secondary text-primary">{icon}</span>
    </div>
    <div className="text-[26px] font-bold">{value}</div>
    {description && <div className="mt-1 text-sm text-gray-400">{description}</div>}
  </div>
)

export default async function DashboardPage() {
  const session = await getUserSession()
  if (session?.role !== UserRole.ADMIN) {
    return redirect('/not-auth')
  }

  const [ordersByStatus, usersCount, productsCount, categoriesCount, topProducts, recentOrders] = await Promise.all([
    prisma.order.groupBy({
      by: ['status'],
      _count: { _all: true },
      _sum: { totalAmount: true },
    }),
    prisma.user.count(),
    prisma.product.count(),
    prisma.category.count(),
    prisma.product.findMany({
      where: { orderCount: { gt: 0 } },
      orderBy: { orderCount: 'desc' },
      take: 5,
      select: { id: true, name: true, imageUrl: true, orderCount: true, category: { select: { name: true } } },
    }),
    prisma.order.findMany({
      orderBy: { createdAt: 'desc' },
      take: 6,
      select: { id: true, fullName: true, totalAmount: true, status: true, createdAt: true },
    }),
  ])

  const statusStats = Object.values(OrderStatus).map((status) => {
    const group = ordersByStatus.find((item) => item.status === status)
    return { status, count: group?._count._all ?? 0, amount: group?._sum.totalAmount ?? 0 }
  })
  const ordersCount = statusStats.reduce((acc, item) => acc + item.count, 0)
  const succeeded = statusStats.find((item) => item.status === OrderStatus.SUCCEEDED)!
  const revenue = succeeded.amount
  const averageCheck = succeeded.count ? Math.round(revenue / succeeded.count) : 0
  const maxOrderCount = topProducts[0]?.orderCount ?? 0

  return (
    <div className="scrollbar w-full overflow-y-auto">
      <Title text="Dashboard" size="md" className="mb-5 font-bold" />

      <div className="mb-5 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Revenue"
          value={formatMoney(revenue)}
          description={`Average check ${formatMoney(averageCheck)}`}
          icon={<Wallet size={18} />}
        />
        <StatCard
          title="Orders"
          value={ordersCount}
          description={`${succeeded.count} succeeded`}
          icon={<ShoppingBag size={18} />}
        />
        <StatCard title="Users" value={usersCount} icon={<Users size={18} />} />
        <StatCard
          title="Products"
          value={productsCount}
          description={`${categoriesCount} categories`}
          icon={<Pizza size={18} />}
        />
      </div>

      <div className="mb-5 grid grid-cols-1 gap-5 xl:grid-cols-2">
        <div className="rounded-md bg-white p-5">
          <Title text="Orders by status" size="xs" className="mb-4 font-bold" />
          <div className="mb-5 flex h-3 overflow-hidden rounded-full bg-gray-100">
            {statusStats.map(
              ({ status, count }) =>
                count > 0 && (
                  <div
                    key={status}
                    className={statusBarColor[status]}
                    style={{ width: `${(count / ordersCount) * 100}%` }}
                  />
                ),
            )}
          </div>
          <ul className="flex flex-col gap-3">
            {statusStats.map(({ status, count, amount }) => (
              <li key={status} className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className={cn('size-3 rounded-full', statusBarColor[status])} />
                  <span className="font-semibold">{statusLabel[status]}</span>
                </div>
                <div className="text-right">
                  <span className="font-bold">{count}</span>
                  <span className="ml-2 text-sm text-gray-400">
                    {ordersCount ? Math.round((count / ordersCount) * 100) : 0}% · {formatMoney(amount)}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-md bg-white p-5">
          <Title text="Top products" size="xs" className="mb-4 font-bold" />
          {topProducts.length ? (
            <ul className="flex flex-col gap-4">
              {topProducts.map((product) => (
                <li key={product.id} className="flex items-center gap-3">
                  <Image src={product.imageUrl} alt={product.name} width={40} height={40} />
                  <div className="min-w-0 flex-1">
                    <div className="mb-1 flex justify-between gap-2">
                      <span className="truncate font-semibold">{product.name}</span>
                      <span className="shrink-0 font-bold">{product.orderCount}</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-gray-100">
                      <div
                        className="h-full rounded-full bg-primary"
                        style={{ width: `${(product.orderCount / maxOrderCount) * 100}%` }}
                      />
                    </div>
                    <div className="mt-1 text-xs text-gray-400">{product.category.name}</div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-400">No orders yet</p>
          )}
        </div>
      </div>

      <div className="rounded-md bg-white p-5">
        <Title text="Recent orders" size="xs" className="mb-4 font-bold" />
        {recentOrders.length ? (
          <ul>
            {recentOrders.map((order) => (
              <li
                key={order.id}
                className="flex flex-col gap-2 border-b border-gray-100 py-3 last:border-b-0 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <div className="font-semibold">{order.fullName}</div>
                  <div className="text-sm text-gray-400">{dayjs(order.createdAt).format('D MMMM YYYY, HH:mm')}</div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-bold">{formatMoney(order.totalAmount)}</span>
                  <Tag status={order.status} className="px-4 py-1 text-sm" />
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="flex items-center gap-2 text-gray-400">
            <ClipboardList size={18} /> No orders yet
          </p>
        )}
      </div>
    </div>
  )
}
