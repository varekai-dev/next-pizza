import imageCompression from 'browser-image-compression'
import type { Options } from 'browser-image-compression'

export type CompressFileOptions = Options

export const compressFile = async (
    file: File,
    options: CompressFileOptions
) => {
    const defaultOptions: CompressFileOptions = {
        maxSizeMB: 2,
        maxWidthOrHeight: 800,
        initialQuality: 0.8,
        ...options,
    }
    return await imageCompression(file, defaultOptions)
}
