'use client'

import React from 'react'
import toast from 'react-hot-toast'

import { compressFile } from '@/shared/lib'
import { CompressFileOptions } from '@/shared/lib/compress-file'

import { Input } from '../ui'
import { CropModal } from './modals/crop-modal'

interface Props extends CompressFileOptions {
  className?: string
  aspect?: number
  onCropImage: (file: File) => void
  isLoading?: boolean
  showFileName?: boolean
  children: React.ReactElement
}

export const CropImage: React.FC<Props> = ({
  className,
  aspect,
  onCropImage,
  isLoading,
  showFileName,
  children,
  ...props
}) => {
  const [loading, setLoading] = React.useState(false)
  const [file, setFile] = React.useState<File>()
  const [modifiedFile, setModifiedFile] = React.useState<File>()

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setLoading(true)
      const inputFile = e.target.files?.[0]

      if (inputFile) {
        const compressedFile = await compressFile(inputFile, props)
        setFile(compressedFile)
      }
      return null
    } catch (error) {
      console.error('error [COMPRESS_FILE]: ', error)
      toast.error('Error compressing file')
    } finally {
      setLoading(false)
    }
  }

  const onModalClose = () => {
    setFile(undefined)
  }

  const onComplete = (file: File) => {
    setModifiedFile(file)
    onCropImage(file)
    setFile(undefined)
  }

  const inputRef = React.useRef<HTMLInputElement>(null)

  const onClickUpload = () => {
    inputRef.current?.click()
  }
  return (
    <div className={className}>
      <div className="flex flex-col justify-start">
        <Input
          ref={inputRef}
          type="file"
          accept="image/jpeg, image/png, image/webp"
          onChange={handleChange}
          className="hidden"
        />
        {React.cloneElement(children, { onClick: onClickUpload, loading: loading || isLoading })}
        {showFileName && !!modifiedFile && <span> {modifiedFile.name}</span>}
      </div>
      {file && <CropModal file={file} aspect={aspect} onModalClose={onModalClose} onComplete={onComplete} />}
    </div>
  )
}
