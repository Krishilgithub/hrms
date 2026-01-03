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

const leaves = [
    {
        id: 1,
        employee: "Alice Johnson",
        type: "Sick Leave",
        dates: "Oct 24 - Oct 25",
        reason: "Viral Fever",
        status: "Pending",
    },
     {
        id: 2,
        employee: "Charlie Brown",
        type: "Privilege Leave",
        dates: "Dec 20 - Dec 30",
        reason: "Winter Vacation",
        status: "Pending",
    },
    {
         id: 3,
        employee: "David Wilson",
        type: "Casual Leave",
        dates: "Nov 05",
        reason: "Personal Work",
        status: "Approved",
    }
]

export default function HRLeavesPage() {
    
  const handleApprove = (id: number) => {
      toast.success(`Leave request #${id} approved.`)
  }
  
   const handleReject = (id: number) => {
      toast.error(`Leave request #${id} rejected.`)
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
                    {leaves.map((leave) => (
                         <TableRow key={leave.id}>
                            <TableCell className="font-medium">{leave.employee}</TableCell>
                            <TableCell>{leave.type}</TableCell>
                            <TableCell>{leave.dates}</TableCell>
                            <TableCell className="max-w-[200px] truncate">{leave.reason}</TableCell>
                             <TableCell>
                                 <Badge variant={leave.status === 'Approved' ? 'default' : leave.status === 'Pending' ? 'secondary' : 'destructive'}>
                                     {leave.status}
                                 </Badge>
                             </TableCell>
                            <TableCell className="text-right">
                                {leave.status === 'Pending' && (
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
                    ))}
                </TableBody>
            </Table>
          </CardContent>
      </Card>
    </div>
  )
}
