import { InfoBlock } from '@/shared/components/shared'

export default function NotFoundPage() {
  return (
    <div className="mt-40 flex flex-col items-center justify-center">
      <InfoBlock
        title="Page not found"
        text="Please check the entered address for accuracy or try again later."
        imageUrl="/assets/images/not-found.png"
      />
        
    </div>
  )
}
