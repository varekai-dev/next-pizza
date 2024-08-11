import { CircleUser, ClipboardList, Gauge, Instagram, Pizza, ShoppingBasket, Truck } from 'lucide-react'

import { Route } from '@/@types'

export const navList = [
  {
    name: 'Dashboard',
    href: Route.DASHBOARD,
    isAdmin: true,
    icon: <Gauge size={18} />,
  },
  {
    name: 'Products',
    href: Route.PRODUCTS,
    isAdmin: true,
    icon: <Pizza size={18} />,
  },
  {
    name: 'Categories',
    href: Route.CATEGORIES,
    isAdmin: true,
    icon: <ClipboardList size={18} />,
  },
  {
    name: 'Ingredients',
    href: Route.INGREDIENTS,
    isAdmin: true,
    icon: <ShoppingBasket size={18} />,
  },
  {
    name: 'Stories',
    href: Route.STORIES,
    isAdmin: true,
    icon: <Instagram size={18} />,
  },
  {
    name: 'Profile',
    href: Route.PROFILE,
    isAdmin: false,
    icon: <CircleUser size={18} />,
  },
  {
    name: 'Orders',
    href: Route.ORDERS,
    isAdmin: false,
    icon: <Truck size={18} />,
  },
]
