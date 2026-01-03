
import { db } from "@/lib/db"
import LeavesClient from "@/components/dashboard/hr/leaves-client"

export default async function HRLeavesPage() {
  const leaves = await db.leaveRequest.findMany({
      include: {
          user: {
              select: {
                  name: true
              }
          }
      },
      orderBy: {
          createdAt: 'desc'
      }
  })

  const formattedLeaves = leaves.map(leave => ({
      id: leave.id,
      employee: { name: leave.user.name },
      type: leave.type,
      startDate: leave.startDate,
      endDate: leave.endDate,
      reason: leave.reason,
      status: leave.status
  }))

  return <LeavesClient leaves={formattedLeaves} />
}
