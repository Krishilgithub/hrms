import { getLeaves } from "@/actions/leaves"
import { LeaveManager } from "@/components/dashboard/leave-manager"

export default async function LeavesPage() {
    const leaves = await getLeaves()

    return <LeaveManager leaves={leaves} />
}
