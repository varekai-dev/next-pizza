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
    <div className={cn('flex items-center justify-center flex-1 relative w-full', className)}>
      <span
        className={cn({
          'h-[500px] flex justify-center items-center': productPage,
          'h-[310px] flex justify-center items-center': isDrawer,
        })}
      >
        <Image
          quality={100}
          className={cn('relative left-2 top-2 transition-all z-10 duration-300', {
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
              'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border-dashed border-2 rounded-full border-gray-200 w-[450px] h-[450px]',
              {
                'w-[230px] h-[230px]': isDrawer,
              },
            )}
          />
          <div
            className={cn(
              'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border-dotted border-2 rounded-full border-gray-200 w-[370px] h-[370px]',
              {
                'w-[180px] h-[180px]': isDrawer,
              },
            )}
          />
        </>
      )}
    </div>
  )
}
