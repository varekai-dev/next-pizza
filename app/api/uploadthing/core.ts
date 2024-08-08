import { getUserSession } from '@/shared/lib/get-user-session'
import { UserRole } from '@prisma/client'
import { createUploadthing, type FileRouter } from 'uploadthing/next'
import { UploadThingError, UTFiles } from 'uploadthing/server'
import imageCompression from 'browser-image-compression'

const f = createUploadthing()

const imageCompressionOptions = {
    maxSizeMB: 1,
    maxWidthOrHeight: 1920,
    useWebWorker: true,
}

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
    // Define as many FileRoutes as you like, each with a unique routeSlug
    imageUploader: f({ image: { maxFileSize: '32MB' } })
        // Set permissions and file types for this FileRoute
        .middleware(async ({ req }) => {
            // This code runs on your server before upload
            const user = await getUserSession()
            console.log('req', req.body)

            // If you throw, the user will not be able to upload
            if (!user || user?.role !== UserRole.ADMIN)
                throw new UploadThingError('Unauthorized')

            // Whatever is returned here is accessible in onUploadComplete as `metadata`
            return { userId: user.id }
        })
        .onUploadComplete(async ({ metadata, file }) => {
            // This code RUNS ON YOUR SERVER after upload
            console.log('Upload complete for userId:', metadata.userId)

            console.log('file url', file.url)

            // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
            return { uploadedBy: metadata.userId }
        }),
} satisfies FileRouter

export type OurFileRouter = typeof ourFileRouter
