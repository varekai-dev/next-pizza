import { InfoBlock } from '@/shared/components/shared/info-block'

export default function UnauthorizedPage() {
  return (
    <div className="mt-40 flex flex-col items-center justify-center">
      <InfoBlock
        title="Access denied"
        text="You need to log in to access this page"
        imageUrl="/assets/images/lock.png"
      />
    </div>
  )
}
