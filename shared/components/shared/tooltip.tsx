import React from 'react'

import { TooltipContent, TooltipProvider, TooltipTrigger, TooltipUI } from '../ui/tooltip-ui'

interface Props {
  className?: string
  content: React.ReactNode
}

export const Tooltip: React.FC<React.PropsWithChildren<Props>> = ({ className, children, content }) => {
  return (
    <div className={className}>
      <TooltipProvider>
        <TooltipUI>
          <TooltipTrigger asChild>{children}</TooltipTrigger>
          <TooltipContent>{content}</TooltipContent>
        </TooltipUI>
      </TooltipProvider>
    </div>
  )
}
