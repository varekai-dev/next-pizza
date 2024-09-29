import React, { PropsWithChildren } from 'react'

import { useOnMouseHold } from '@/shared/hooks'
import { cn } from '@/shared/lib'

interface Props {
  className?: string
  onSubmit?: () => void
}

export const DeleteWrapper: React.FC<PropsWithChildren<Props>> = ({ className, onSubmit, children }) => {
  const { buttonPressDown, buttonPressUp, isPressed, isFinished, progressInPercent } = useOnMouseHold({
    intervalMs: 20,
    targetMs: 300,
  })
  React.useEffect(() => {
    if (isFinished) {
      onSubmit?.()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFinished])
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      onMouseDown={buttonPressDown}
      onMouseUp={buttonPressUp}
      onTouchStart={buttonPressDown}
      onTouchEnd={buttonPressUp}
      className={cn(
        'group relative flex h-8 w-8 cursor-pointer items-center justify-center overflow-hidden rounded-full hover:bg-red-400/80',
        className,
      )}
    >
      {children}
      <div
        className={cn(`absolute bottom-0 left-0 right-0`, {
          [`bg-red-500/90 h-[${progressInPercent}%]`]: isPressed || isFinished,
        })}
      />
    </div>
  )
}
