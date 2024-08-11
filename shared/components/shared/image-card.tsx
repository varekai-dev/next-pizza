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
      className={cn('relative rounded-md overflow-hidden group', className)}
    >
      {srcUrl && <Image src={srcUrl} alt={alt} fill objectFit={objectFit} priority onLoad={() => setLoading(false)} />}
      {(actions || empty) && (
        <div
          className={cn(
            'absolute transition duration-300 top-0 left-0 right-0 bottom-0 bg-gray-400/30  justify-center items-center flex opacity-0 group-hover:opacity-100',
            {
              'opacity-100': empty && !srcUrl,
            },
          )}
        >
          <div className="flex items-center justify-center">{actions}</div>
          {onDelete && (
            <DeleteWrapper className="absolute top-2 right-2 bg-red-400/80" onSubmit={onDelete}>
              <X className=" cursor-pointer text-white z-10" size={20} />
            </DeleteWrapper>
          )}
        </div>
      )}
      {(loading || !srcUrl || isLoading) && !empty && (
        <div className="absolute bg-gray-200 rounded-md animate-pulse top-0 left-0 right-0 bottom-0" />
      )}
    </div>
  )
}
