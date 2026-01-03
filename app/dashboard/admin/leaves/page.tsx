import { getAllLeaves } from "@/actions/admin"
import { LeaveRequestsClient } from "@/components/dashboard/admin/leave-requests-client"

export default async function AdminLeavesPage() {
    const leaves = await getAllLeaves()

    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Leave Requests</h2>
            </div>
            <LeaveRequestsClient leaves={leaves} />
        </div>
    )
}
