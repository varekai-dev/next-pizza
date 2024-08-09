'use client'
import React from 'react'
import { useClickAway, useDebounce } from 'react-use'
import Image from 'next/image'
import Link from 'next/link'
import { Product } from '@prisma/client'
import { Search } from 'lucide-react'

import { Route } from '@/@types'
import { cn } from '@/shared/lib/utils'
import { Api } from '@/shared/services/api-client'

interface Props {
  className?: string
}

export const SearchInput: React.FC<Props> = ({ className }) => {
  const [searchQuery, setSearchQuery] = React.useState('')
  const [products, setProducts] = React.useState<Product[]>([])
  const [focused, setFocused] = React.useState(false)
  const ref = React.useRef<HTMLInputElement>(null)

  useClickAway(ref, () => {
    setFocused(false)
  })

  useDebounce(
    async () => {
      try {
        if (searchQuery) {
          const items = await Api.products.search(searchQuery)
          setProducts(items)
        } else {
          setProducts([])
        }
      } catch (e) {
        console.log(e)
      }
    },
    300,
    [searchQuery],
  )

  const onClickItem = () => {
    setFocused(false)
    setSearchQuery('')
    setProducts([])
  }
  return (
    <>
      {focused && <div className="fixed top-0 left-0 bottom-0 right-0 bg-black/50 z-30" />}
      <div ref={ref} className={cn('flex rounded-2xl flex-1 justify-between relative h-11 z-30', className)}>
        <Search size={20} className="absolute top-1/2 translate-y-[-50%] left-3 text-gray-500" />
        <input
          className="rounded-2xl bg-gray-100 pl-11 w-full outline-none"
          type="text"
          placeholder="Search ..."
          onFocus={() => setFocused(true)}
          onChange={(e) => setSearchQuery(e.target.value)}
          value={searchQuery}
        />
        {!!products.length && (
          <div
            className={cn(
              'absolute w-full bg-white rounded-xl py-2 top-12 shadow-md transition-all duration-200 invisible opacity-0 z-30',
              {
                ['visible opacity-100 top-12']: focused,
              },
            )}
          >
            {products.map((product) => (
              <Link
                onClick={onClickItem}
                key={product.id}
                className="flex items-center gap-3 w-full px-3 py-2 hover:bg-primary/10"
                href={`${Route.PRODUCT}/${product.id}`}
                scroll={false}
              >
                <Image
                  className="rounded-sm h-8 w-8"
                  src={product.imageUrl}
                  width={32}
                  height={32}
                  alt={product.name}
                />
                <span>{product.name}</span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  )
}
