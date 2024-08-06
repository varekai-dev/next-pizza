import { InfoBlock } from '@/shared/components/shared/info-block'

export default function UnauthorizedPage() {
    return (
        <div className="flex flex-col items-center justify-center mt-40">
            <InfoBlock
                title="Access denied"
                text="You need to log in to access this page"
                imageUrl="/assets/images/lock.png"
            />
        </div>
    )
}