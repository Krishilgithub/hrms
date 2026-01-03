import { db } from "@/lib/db"
import { cookies } from "next/headers"
import AdminProfileClient from "@/components/dashboard/admin/admin-profile-client"

export default async function AdminProfilePage() {
    const cookieStore = await cookies()
    const userId = cookieStore.get("user_session")?.value

    if (!userId) return null

    const user = await db.user.findUnique({
        where: { id: userId },
        include: { employeeProfile: true }
    })

    if (!user) return null

    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Admin Profile</h2>
            </div>
            <AdminProfileClient user={user} />
        </div>
    )
}
