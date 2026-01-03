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
import { Coins, Download, FileCheck } from "lucide-react"

export default function HRPayrollPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Payroll Processing</h2>
        <div className="flex items-center space-x-2">
          <Button>
            <Coins className="mr-2 h-4 w-4" />
            Process October Payroll
          </Button>
        </div>
      </div>
      
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
            <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Payroll Cost</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="text-3xl font-bold">$125,400</div>
                <p className="text-xs text-muted-foreground mt-1">Projected for October 2023</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Processed</CardTitle>
            </CardHeader>
             <CardContent>
                <div className="text-3xl font-bold">45 / 142</div>
                <p className="text-xs text-muted-foreground mt-1">Employees paid</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Pending Review</CardTitle>
            </CardHeader>
             <CardContent>
                <div className="text-3xl font-bold text-orange-600">5</div>
                <p className="text-xs text-muted-foreground mt-1">Discrepancies flagged</p>
            </CardContent>
        </Card>
      </div>

      <Card>
          <CardHeader>
            <CardTitle>Payroll Batch - October 2023</CardTitle>
            <CardDescription>
              Review and approve salary disbursements.
            </CardDescription>
          </CardHeader>
          <CardContent>
             <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Employee</TableHead>
                        <TableHead>Department</TableHead>
                        <TableHead>Basic Salary</TableHead>
                        <TableHead>Allowances</TableHead>
                        <TableHead>Deductions</TableHead>
                        <TableHead>Net Pay</TableHead>
                         <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableCell className="font-medium">John Doe</TableCell>
                        <TableCell>Engineering</TableCell>
                        <TableCell>$8,000</TableCell>
                        <TableCell>$1,200</TableCell>
                         <TableCell className="text-red-500">-$400</TableCell>
                        <TableCell className="font-bold">$8,800</TableCell>
                        <TableCell><Badge variant="secondary" className="bg-green-100 text-green-700">Processed</Badge></TableCell>
                        <TableCell className="text-right"><Button variant="ghost" size="sm"><Download className="h-4 w-4"/></Button></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className="font-medium">Jane Smith</TableCell>
                        <TableCell>Management</TableCell>
                        <TableCell>$9,500</TableCell>
                        <TableCell>$1,500</TableCell>
                         <TableCell className="text-red-500">-$500</TableCell>
                        <TableCell className="font-bold">$10,500</TableCell>
                         <TableCell><Badge variant="secondary" className="bg-green-100 text-green-700">Processed</Badge></TableCell>
                        <TableCell className="text-right"><Button variant="ghost" size="sm"><Download className="h-4 w-4"/></Button></TableCell>
                    </TableRow>
                     <TableRow>
                        <TableCell className="font-medium">Alice Johnson</TableCell>
                        <TableCell>HR</TableCell>
                        <TableCell>$6,000</TableCell>
                        <TableCell>$800</TableCell>
                         <TableCell className="text-red-500">-$200</TableCell>
                        <TableCell className="font-bold">$6,600</TableCell>
                         <TableCell><Badge variant="outline" className="text-orange-600 border-orange-200">Pending</Badge></TableCell>
                        <TableCell className="text-right"><Button variant="ghost" size="sm"><FileCheck className="h-4 w-4"/></Button></TableCell>
                    </TableRow>
                </TableBody>
            </Table>
          </CardContent>
      </Card>
    </div>
  )
}
