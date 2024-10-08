'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { Route } from '@/@types'
import { useIsPageScrolling } from '@/shared/hooks'
import { cn } from '@/shared/lib/utils'
import { GetSearchParams } from '@/shared/services/categories'

import { Categories } from './categories'
import { Container } from './container'
import { MobileFilterButton } from './mobile-filter-button'
import { SortPopup } from './sort-popup'

interface Props {
  className?: string
  searchParams: GetSearchParams
}

export const TopBar: React.FC<Props> = ({ className, searchParams }) => {
  const { scrollY } = useIsPageScrolling()

  const show = scrollY > 150
  return (
    <div className={cn('sticky top-0 z-10 bg-white py-5 shadow-lg shadow-black/5', className)}>
      <Container className="relative flex items-center justify-between gap-5">
        <div className="flex items-center justify-center overflow-hidden md:gap-5">
          <div
            className={cn('hidden transition-all duration-300 md:block', {
              'md:translate-x-0': show,
              'md:animate-move-right md:translate-x-[35px]': !show,
            })}
          >
            <Link href={Route.HOME}>
              <Image src="/logo.png" width={35} height={35} alt="logo" />
            </Link>
          </div>

          <Categories
            searchParams={searchParams}
            className={cn('transition-all duration-300', {
              'md:translate-x-0': show,
              'md:-translate-x-[55px]': !show,
            })}
          />
        </div>

        <SortPopup searchParams={searchParams} className="hidden lg:flex" />
        <MobileFilterButton className="block lg:hidden" searchParams={searchParams} />
      </Container>
    </div>
  )
}
