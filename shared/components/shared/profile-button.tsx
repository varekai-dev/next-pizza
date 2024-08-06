import { useSession, signIn } from 'next-auth/react'
import React from 'react'
import { Button, Skeleton } from '../ui'
import { CircleUser, User } from 'lucide-react'

interface Props {
    className?: string
    onClickSignIn?: () => void
}

export const ProfileButton: React.FC<Props> = ({
    className,
    onClickSignIn,
}) => {
    const { data: session } = useSession()
    const isLoading = session === undefined

    if (isLoading) {
        return <Skeleton className="h-[40px] w-[97px]" />
    }

    return (
        <div className={className}>
            {session ? (
                <Button variant="secondary" className="flex items-center gap-2">
                    <CircleUser size={18} />
                    Profile
                </Button>
            ) : (
                <Button
                    onClick={onClickSignIn}
                    variant="outline"
                    className="flex items-center gap-3"
                >
                    <User size={16} />
                    Login
                </Button>
            )}
        </div>
    )
}
