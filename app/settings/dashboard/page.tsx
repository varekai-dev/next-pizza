import { Title } from '@/shared/components/shared'
import { getUserSession } from '@/shared/lib/get-user-session'
import { UserRole } from '@prisma/client'
import { redirect } from 'next/navigation'

export default async function DashboardPage() {
    const session = await getUserSession()
    if (session?.role !== UserRole.ADMIN) {
        return redirect('/not-auth')
    }
    return (
        <div>
            <Title text="Dashboard" size="md" className="font-bold" />
        </div>
    )
}
