import React from 'react'
import { X } from 'lucide-react'

interface Props {
  onClick?: VoidFunction
}

export const ClearButton: React.FC<Props> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer opacity-30 hover:opacity-100"
    >
      <X className="h-5 w-5" />
    </button>
  )
}
