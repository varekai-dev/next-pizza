'use client'

import React from 'react'
import { Cropper } from 'react-cropper'
import type { ReactCropperElement } from 'react-cropper'
import { Button } from '../ui'
import 'cropperjs/dist/cropper.css'

interface Props {
    className?: string
    file: File
    aspect?: number
    onComplete?: (file: File) => void
}

export const ImageCropper: React.FC<Props> = ({
    className,
    file,
    aspect = 4 / 3,
    onComplete,
}) => {
    const cropperRef = React.createRef<ReactCropperElement>()

    const getCropData = () => {
        if (typeof cropperRef.current?.cropper !== 'undefined') {
            const blog = cropperRef.current?.cropper
                .getCroppedCanvas()
                .toBlob(blob => {
                    if (blob) {
                        const croppedFile = new File([blob], file.name, {
                            type: file.type,
                        })

                        onComplete?.(croppedFile)
                    }
                }, file.type)

            // onComplete?.()
        }
    }

    return (
        <>
            <Cropper
                ref={cropperRef}
                className="w-full max-h-[800px]"
                initialAspectRatio={aspect}
                src={URL.createObjectURL(file)}
                viewMode={1}
                minCropBoxHeight={10}
                minCropBoxWidth={10}
                background={false}
                responsive={true}
                autoCropArea={1}
                checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
                guides={false}
            />
            <Button
                onClick={getCropData}
                className="z-10 absolute bottom-5 right-5"
            >
                Save
            </Button>
        </>
    )
}
