"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Download, DollarSign, CalendarCheck, TrendingUp } from "lucide-react"
import { format } from "date-fns"

type PayrollViewerProps = {
    payrollRecords: {
        id: string
        month: string
        netSalary: number
        allowances: number
        deductions: number
        status: string
        paymentDate: Date | null
        createdAt: Date
    }[]
}

export function PayrollViewer({ payrollRecords }: PayrollViewerProps) {
  
  const latestRecord = payrollRecords[0]
  const latestSalary = latestRecord?.netSalary || 0
  const lastPaymentDate = latestRecord?.paymentDate 
    ? format(new Date(latestRecord.paymentDate), "MM/dd/yyyy")
    : (latestRecord?.createdAt ? format(new Date(latestRecord.createdAt), "MM/dd/yyyy") : "N/A")
  const taxDeductions = latestRecord?.deductions || 0
  const benefitBalance = latestRecord?.allowances || 0
  
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Payroll & Salary</h2>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Current Net Salary
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${latestSalary.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                +2.5% from last appraisal
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Last Payment Date
              </CardTitle>
              <CalendarCheck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{lastPaymentDate}</div>
              <p className="text-xs text-muted-foreground">
                Process processed on time
              </p>
            </CardContent>
          </Card>
           <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                 Tax Deductions
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${taxDeductions.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                For the current month
              </p>
            </CardContent>
          </Card>
           <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Benefit Balance
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${benefitBalance.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                 Health & Wellness allowance
              </p>
            </CardContent>
          </Card>
      </div>

      <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Salary History</CardTitle>
            <CardDescription>
              View your past salary slips and payment history.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {payrollRecords.length === 0 ? (
                <div className="text-center py-10 text-muted-foreground">No payroll records found.</div>
            ) : (
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Month</TableHead>
                            <TableHead>Date Processed</TableHead>
                            <TableHead>Gross Salary</TableHead>
                            <TableHead>Net Salary</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Payslip</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {payrollRecords.map((record) => (
                             <TableRow key={record.id}>
                                <TableCell className="font-medium">{record.month}</TableCell>
                                <TableCell>{format(new Date(record.createdAt), "MM/dd/yyyy")}</TableCell>
                                <TableCell>${(record.netSalary + 450).toLocaleString()}</TableCell>
                                <TableCell className="font-bold">${record.netSalary.toLocaleString()}</TableCell>
                                <TableCell>
                                    <Badge variant={record.status === 'PAID' ? 'default' : 'secondary'} className={record.status === 'PAID' ? 'bg-green-500' : ''}>
                                        {record.status}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-right">
                                    <Button variant="ghost" size="sm">
                                        <Download className="mr-2 h-4 w-4" /> Download
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )}
          </CardContent>
      </Card>
    </div>
  )
}
