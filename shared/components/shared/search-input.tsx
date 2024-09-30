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
      {focused && <div className="fixed inset-0 z-30 bg-black/50" />}
      <div ref={ref} className={cn('relative z-30 flex h-11 flex-1 justify-between rounded-2xl', className)}>
        <Search size={20} className="absolute left-3 translate-y-1/2 text-gray-500" />
        <input
          className="w-full rounded-2xl bg-gray-100 pl-11 outline-none"
          type="text"
          placeholder="Search ..."
          onFocus={() => setFocused(true)}
          onChange={(e) => setSearchQuery(e.target.value)}
          value={searchQuery}
        />
        {!!products.length && (
          <div
            className={cn(
              'invisible absolute top-12 z-30 w-full rounded-xl bg-white py-2 opacity-0 shadow-md transition-all duration-200',
              {
                ['visible top-12 opacity-100']: focused,
              },
            )}
          >
            {products.map((product) => (
              <Link
                onClick={onClickItem}
                key={product.id}
                className="flex w-full items-center gap-3 px-3 py-2 hover:bg-primary/10"
                href={`${Route.PRODUCT}/${product.id}`}
                scroll={false}
              >
                <Image className="size-8 rounded-sm" src={product.imageUrl} width={32} height={32} alt={product.name} />
                <span>{product.name}</span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  )
}
