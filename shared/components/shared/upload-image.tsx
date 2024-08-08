'use client'

import React, { ChangeEvent } from 'react'
import toast from 'react-hot-toast'

import { compressFile } from '@/shared/lib'
import { CompressFileOptions } from '@/shared/lib/compress-file'

import { Button, Input } from '../ui'
import { CropModal } from './modals/crop-modal'

interface Props extends CompressFileOptions {
  className?: string
  aspect?: number
}

export const UploadImage: React.FC<Props> = ({ className, aspect, ...props }) => {
  const [loading, setLoading] = React.useState(false)
  const [file, setFile] = React.useState<File>()
  const [modifiedFile, setModifiedFile] = React.useState<File>()

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
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
    setFile(undefined)
  }

  const inputRef = React.useRef<HTMLInputElement>(null)

  const onClickUpload = () => {
    inputRef.current?.click()
  }
  return (
    <div className={className}>
      <div className="flex flex-col flex-start">
        <Input
          ref={inputRef}
          type="file"
          accept="image/jpeg, image/png image/webp"
          onChange={handleChange}
          className="hidden"
        />
        <Button className="w-[200px]" variant="secondary" loading={loading} onClick={onClickUpload}>
          Upload image
        </Button>
        <span> {modifiedFile && modifiedFile.name}</span>
      </div>
      {file && <CropModal file={file} aspect={aspect} onModalClose={onModalClose} onComplete={onComplete} />}
    </div>
  )
}
