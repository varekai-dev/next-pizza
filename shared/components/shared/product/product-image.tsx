'use client'

import React from 'react'
import Image from 'next/image'

import { cn } from '@/shared/lib/utils'

interface Props {
  className?: string
  src: string
  alt: string
  size?: number
  productPage?: boolean
  isDrawer?: boolean
}

export const ProductImage: React.FC<Props> = ({ className, src, alt, size, productPage, isDrawer }) => {
  const adaptiveSize = (() => {
    switch (size) {
      case 20:
        return isDrawer ? 150 : 300
      case 30:
        return isDrawer ? 200 : 400
      case 40:
        return isDrawer ? 250 : 500
      default:
        return isDrawer ? 200 : 350
    }
  })()
  return (
    <div className={cn('relative flex w-full flex-1 items-center justify-center', className)}>
      <span
        className={cn({
          'flex h-[500px] items-center justify-center': productPage,
          'flex h-[310px] items-center justify-center': isDrawer,
        })}
      >
        <Image
          quality={100}
          className={cn('relative left-2 top-2 z-10 transition-all duration-300', {
            'left-1 top-1': isDrawer,
          })}
          width={adaptiveSize}
          height={adaptiveSize}
          src={src}
          alt={alt}
        />
      </span>
      {size && (
        <>
          <div
            className={cn(
              'absolute left-1/2 top-1/2 h-[450px] w-[450px] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-dashed border-gray-200',
              {
                'h-[230px] w-[230px]': isDrawer,
              },
            )}
          />
          <div
            className={cn(
              'absolute left-1/2 top-1/2 h-[370px] w-[370px] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-dotted border-gray-200',
              {
                'h-[180px] w-[180px]': isDrawer,
              },
            )}
          />
        </>
      )}
    </div>
  )
}
