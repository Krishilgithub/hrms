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
import { Check, X, Loader2 } from "lucide-react"
import { toast } from "sonner"
import { updateLeaveStatus } from "@/actions/admin"
import { format } from "date-fns"
import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

type LeaveRequest = {
    id: string
    type: string
    startDate: string | Date
    endDate: string | Date
    reason: string
    status: string
    user: {
        name: string | null
        email: string
        image: string | null
    }
}

export function LeaveRequestsClient({ leaves }: { leaves: any[] }) {
  const [loadingId, setLoadingId] = useState<string | null>(null)

  const handleAction = async (id: string, status: "APPROVED" | "REJECTED") => {
      setLoadingId(id)
      const res = await updateLeaveStatus(id, status)
      setLoadingId(null)

      if (res.error) {
          toast.error(res.error)
      } else {
          toast.success(res.success)
      }
  }

  return (
      <Card>
          <CardHeader>
              <CardTitle>All Leave Requests</CardTitle>
              <CardDescription>Review and take action on employee leave requests.</CardDescription>
          </CardHeader>
          <CardContent>
              {leaves.length === 0 ? (
                  <div className="text-center py-10 text-muted-foreground">No leave requests found.</div>
              ) : (
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
                        {leaves.map((leave) => (
                             <TableRow key={leave.id}>
                                <TableCell className="flex items-center gap-2">
                                     <Avatar className="h-8 w-8">
                                        <AvatarImage src={leave.user.image || undefined} />
                                        <AvatarFallback>{leave.user.name?.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <div className="flex flex-col">
                                        <span className="font-medium">{leave.user.name}</span>
                                        <span className="text-xs text-muted-foreground">{leave.user.email}</span>
                                    </div>
                                </TableCell>
                                <TableCell className="capitalize">{leave.type.toLowerCase().replace("_", " ")}</TableCell>
                                <TableCell>
                                    {format(new Date(leave.startDate), "MMM d")} - {format(new Date(leave.endDate), "MMM d, yyyy")}
                                </TableCell>
                                <TableCell className="max-w-[200px] truncate">{leave.reason}</TableCell>
                                 <TableCell>
                                     <Badge variant={
                                         leave.status === 'APPROVED' ? 'default' : 
                                         leave.status === 'REJECTED' ? 'destructive' : 'secondary'
                                     } className={
                                         leave.status === 'APPROVED' ? 'bg-green-600' : 
                                         leave.status === 'REJECTED' ? 'bg-red-600' : ''
                                     }>
                                         {leave.status}
                                     </Badge>
                                 </TableCell>
                                <TableCell className="text-right">
                                    {leave.status === 'PENDING' && (
                                        <div className="flex justify-end gap-2">
                                            <Button 
                                                size="icon" 
                                                variant="outline" 
                                                className="h-8 w-8 text-green-600 hover:text-green-700 hover:bg-green-50" 
                                                onClick={() => handleAction(leave.id, "APPROVED")}
                                                disabled={loadingId === leave.id}
                                            >
                                                {loadingId === leave.id ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />}
                                            </Button>
                                            <Button 
                                                size="icon" 
                                                variant="outline" 
                                                className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50" 
                                                onClick={() => handleAction(leave.id, "REJECTED")}
                                                disabled={loadingId === leave.id}
                                            >
                                                {loadingId === leave.id ? <Loader2 className="h-4 w-4 animate-spin" /> : <X className="h-4 w-4" />}
                                            </Button>
                                        </div>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
              )}
          </CardContent>
      </Card>
  )
}
