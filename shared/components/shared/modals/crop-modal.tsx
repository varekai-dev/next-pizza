import React from 'react'
import { Root } from '@radix-ui/react-visually-hidden'

import { Dialog } from '@/shared/components/ui'

import { ImageCropper } from '../image-cropper'

interface Props {
  file: File
  aspect?: number
  onModalClose?: () => void
  onComplete?: (file: File) => void
}

export const CropModal: React.FC<Props> = ({ file, aspect, onModalClose, onComplete }) => {
  const [open, setOpen] = React.useState(!!file)

  React.useEffect(() => {
    if (file) {
      setOpen(true)
    }
  }, [file])

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen)
    onModalClose?.()
  }

  const handleComplete = (file: File) => {
    setOpen(false)
    onComplete?.(file)
  }

  if (!file) return null

  return (
    <Dialog.Dialog open={open} onOpenChange={handleOpenChange}>
      <Root>
        <Dialog.DialogTitle>Title</Dialog.DialogTitle>
      </Root>
      <Dialog.DialogContent className="min-h-[50vh] w-[1060px] max-w-[80vw] overflow-hidden bg-white p-0">
        <ImageCropper file={file} aspect={aspect} onComplete={handleComplete} />
      </Dialog.DialogContent>
    </Dialog.Dialog>
  )
}
