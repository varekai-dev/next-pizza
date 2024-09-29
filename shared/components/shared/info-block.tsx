import React from 'react'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

import { Route } from '@/@types'
import { cn } from '@/shared/lib/utils'

import { Button } from '../ui/button'
import { Title } from './title'

interface Props {
  title: string
  text: string
  className?: string
  imageUrl?: string
}

export const InfoBlock: React.FC<Props> = ({ className, title, text, imageUrl }) => {
  return (
    <div className={cn(className, 'flex w-[840px] items-center justify-between gap-12')}>
      <div className="flex flex-col">
        <div className="w-[445px]">
          <Title size="lg" text={title} className="font-extrabold" />
          <p className="text-lg text-gray-400">{text}</p>
        </div>

        <div className="mt-11 flex gap-5">
          <Link href={Route.HOME}>
            <Button variant="outline" className="gap-2">
              <ArrowLeft />
              To main
            </Button>
          </Link>
          <a href="">
            <Button variant="outline" className="border-gray-400 text-gray-500 hover:bg-gray-50">
              Refresh
            </Button>
          </a>
        </div>
      </div>

      <img src={imageUrl} alt={title} width={300} />
    </div>
  )
}
