'use client'

import React from 'react'
import type { ReactCropperElement } from 'react-cropper'
import { Cropper } from 'react-cropper'

import { cn } from '@/shared/lib'

import { Button } from '../ui'

import 'cropperjs/dist/cropper.css'

interface Props {
  className?: string
  file: File
  aspect?: number
  onComplete?: (file: File) => void
}

export const ImageCropper: React.FC<Props> = ({ className, file, aspect = 4 / 3, onComplete }) => {
  const cropperRef = React.createRef<ReactCropperElement>()

  const getCropData = () => {
    if (typeof cropperRef.current?.cropper !== 'undefined') {
      cropperRef.current?.cropper.getCroppedCanvas().toBlob((blob) => {
        if (blob) {
          const croppedFile = new File([blob], file.name, {
            type: file.type,
          })

          onComplete?.(croppedFile)
        }
      }, file.type)
    }
  }

  return (
    <>
      <Cropper
        dragMode="none"
        ref={cropperRef}
        className={cn('max-h-[800px] w-full', className)}
        initialAspectRatio={aspect}
        src={URL.createObjectURL(file)}
        viewMode={1}
        minCropBoxHeight={10}
        minCropBoxWidth={10}
        background={true}
        responsive={true}
        autoCropArea={1}
        allowFullScreen={false}
        checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
        guides={false}
        cropBoxResizable={true}
      />
      <Button onClick={getCropData} className="absolute bottom-5 right-5 z-10">
        Save
      </Button>
    </>
  )
}
