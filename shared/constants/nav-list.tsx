import { CircleUser, Gauge, Truck } from 'lucide-react'

export const navList = [
    {
        name: 'Dashboard',
        href: '/settings/dashboard',
        isAdmin: true,
        icon: <Gauge size={18} />,
    },
    {
        name: 'Profile',
        href: '/settings/profile',
        isAdmin: false,
        icon: <CircleUser size={18} />,
    },
    {
        name: 'Orders',
        href: '/settings/orders',
        isAdmin: false,
        icon: <Truck size={18} />,
    },
]