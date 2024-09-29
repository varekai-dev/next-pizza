import React from 'react'
import Image from 'next/image'
import { X } from 'lucide-react'

import { cn } from '@/shared/lib'

import { DeleteWrapper } from './delete-button'

interface Props {
  className?: string
  srcUrl?: string
  height?: number
  width?: number
  actions?: React.ReactNode
  onDelete?: () => void
  isLoading?: boolean
  objectFit?: 'cover' | 'contain'
  empty?: boolean
  alt?: string
}

export const ImageCard: React.FC<Props> = ({
  className,
  srcUrl,
  height = 250,
  width = 200,
  actions,
  onDelete,
  isLoading,
  objectFit = 'contain',
  empty,
  alt = 'image',
}) => {
  const [loading, setLoading] = React.useState(true)
  return (
    <div
      style={{
        height,
        width,
        minWidth: width,
      }}
      className={cn('group relative overflow-hidden rounded-md', className)}
    >
      {srcUrl && <Image src={srcUrl} alt={alt} fill objectFit={objectFit} priority onLoad={() => setLoading(false)} />}
      {(actions || empty) && (
        <div
          className={cn(
            'absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center bg-gray-400/30 opacity-0 transition duration-300 group-hover:opacity-100',
            {
              'opacity-100': empty && !srcUrl,
            },
          )}
        >
          <div className="flex items-center justify-center">{actions}</div>
          {onDelete && (
            <DeleteWrapper className="absolute right-2 top-2 bg-red-400/80" onSubmit={onDelete}>
              <X className="z-10 cursor-pointer text-white" size={20} />
            </DeleteWrapper>
          )}
        </div>
      )}
      {(loading || !srcUrl || isLoading) && !empty && (
        <div className="absolute inset-0 animate-pulse rounded-md bg-gray-200" />
      )}
    </div>
  )
}
