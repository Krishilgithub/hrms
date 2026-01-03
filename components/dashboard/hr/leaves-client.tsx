"use client"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Check, X } from "lucide-react"
import { toast } from "sonner"
import { approveLeave, rejectLeave } from "@/actions/leaves"
import { useRouter } from "next/navigation"

type LeaveRequest = {
    id: string
    employee: { name: string | null }
    type: "SICK" | "CASUAL" | "PRIVILEGE" | "UNPAID"
    startDate: Date
    endDate: Date
    reason: string
    status: "PENDING" | "APPROVED" | "REJECTED"
}

interface LeavesClientProps {
    leaves: LeaveRequest[]
}

export default function LeavesClient({ leaves }: LeavesClientProps) {
    const router = useRouter()
    
  const handleApprove = async (id: string) => {
      const res = await approveLeave(id)
      if (res.error) {
          toast.error(res.error)
      } else {
          toast.success(`Leave request approved.`)
          router.refresh()
      }
  }
  
   const handleReject = async (id: string) => {
       const res = await rejectLeave(id)
       if (res.error) {
           toast.error(res.error)
       } else {
           toast.error(`Leave request rejected.`)
           router.refresh()
       }
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Leave Management</h2>
      </div>
      <Card>
          <CardHeader>
              <CardTitle>Leave Requests</CardTitle>
              <CardDescription>Approve or reject employee leave applications.</CardDescription>
          </CardHeader>
          <CardContent>
              <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Employee</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Dates</TableHead>
                        <TableHead>Reason</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {leaves.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={6} className="text-center text-muted-foreground">
                                No leave requests
                            </TableCell>
                        </TableRow>
                    ) : (
                        leaves.map((leave) => (
                             <TableRow key={leave.id}>
                                <TableCell className="font-medium">{leave.employee.name || "Unknown"}</TableCell>
                                <TableCell>{leave.type}</TableCell>
                                <TableCell>
                                    {new Date(leave.startDate).toLocaleDateString()} - {new Date(leave.endDate).toLocaleDateString()}
                                </TableCell>
                                <TableCell className="max-w-[200px] truncate">{leave.reason}</TableCell>
                                 <TableCell>
                                     <Badge variant={leave.status === 'APPROVED' ? 'default' : leave.status === 'PENDING' ? 'secondary' : 'destructive'}>
                                         {leave.status}
                                     </Badge>
                                 </TableCell>
                                <TableCell className="text-right">
                                    {leave.status === 'PENDING' && (
                                        <div className="flex justify-end gap-2">
                                            <Button size="icon" variant="outline" className="h-8 w-8 text-green-600 hover:text-green-700 hover:bg-green-50" onClick={() => handleApprove(leave.id)}>
                                                <Check className="h-4 w-4" />
                                            </Button>
                                            <Button size="icon" variant="outline" className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50" onClick={() => handleReject(leave.id)}>
                                                <X className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
          </CardContent>
      </Card>
    </div>
  )
}
