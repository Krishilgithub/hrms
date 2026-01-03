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
import { Check, DollarSign, X } from "lucide-react"
import { toast } from "sonner"

export default function AdminPayrollPage() {
    
  const handleProcess = () => {
      toast.success("Payroll processing started for selected employees.")
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Payroll Management</h2>
         <Button onClick={handleProcess}>
             <DollarSign className="mr-2 h-4 w-4" /> Process All Payroll
        </Button>
      </div>
      <Card>
          <CardHeader>
              <CardTitle>Oct 2023 Payroll</CardTitle>
              <CardDescription>Manage salaries and disbursements.</CardDescription>
          </CardHeader>
          <CardContent>
              <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Employee</TableHead>
                        <TableHead>Designation</TableHead>
                        <TableHead>Salary</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                     <TableRow>
                        <TableCell className="font-medium">Alice Johnson</TableCell>
                        <TableCell>Software Engineer</TableCell>
                        <TableCell>$5,200.00</TableCell>
                         <TableCell><Badge>Processed</Badge></TableCell>
                        <TableCell className="text-right">
                             <Button variant="ghost" size="sm">View Slip</Button>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className="font-medium">Bob Smith</TableCell>
                        <TableCell>Product Design</TableCell>
                        <TableCell>$4,800.00</TableCell>
                         <TableCell><Badge variant="outline">Pending</Badge></TableCell>
                        <TableCell className="text-right">
                             <Button variant="outline" size="sm">Process</Button>
                        </TableCell>
                    </TableRow>
                     <TableRow>
                        <TableCell className="font-medium">Charlie Brown</TableCell>
                        <TableCell>Marketing Lead</TableCell>
                        <TableCell>$6,000.00</TableCell>
                         <TableCell><Badge variant="outline">Pending</Badge></TableCell>
                        <TableCell className="text-right">
                             <Button variant="outline" size="sm">Process</Button>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
          </CardContent>
      </Card>
    </div>
  )
}
