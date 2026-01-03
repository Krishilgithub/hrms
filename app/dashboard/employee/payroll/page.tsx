"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Download } from "lucide-react"

export default function PayrollPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Payroll</h2>
        <Button variant="outline">
            <Download className="mr-2 h-4 w-4" /> Download Latest Slip
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
              <CardHeader>
                  <CardTitle className="text-sm font-medium text-muted-foreground">Basic Salary</CardTitle>
                  <div className="text-2xl font-bold">$3,500.00</div>
              </CardHeader>
          </Card>
          <Card>
              <CardHeader>
                  <CardTitle className="text-sm font-medium text-muted-foreground">HRA</CardTitle>
                  <div className="text-2xl font-bold">$1,200.00</div>
              </CardHeader>
          </Card>
          <Card>
               <CardHeader>
                  <CardTitle className="text-sm font-medium text-muted-foreground">Allowances</CardTitle>
                  <div className="text-2xl font-bold">$800.00</div>
              </CardHeader>
          </Card>
      </div>

      <Card>
          <CardHeader>
              <CardTitle>Salary Slip - October 2023</CardTitle>
              <CardDescription>Breakdown of your earnings and deductions.</CardDescription>
          </CardHeader>
          <CardContent>
              <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-4">
                        <h4 className="font-semibold">Earnings</h4>
                        <div className="flex justify-between text-sm">
                            <span>Basic Salary</span>
                            <span>$3,500.00</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span>Housing Rent Allowance</span>
                            <span>$1,200.00</span>
                        </div>
                         <div className="flex justify-between text-sm">
                            <span>Special Allowance</span>
                            <span>$800.00</span>
                        </div>
                         <div className="flex justify-between text-sm">
                            <span>Performance Bonus</span>
                            <span>$500.00</span>
                        </div>
                    </div>
                    <div className="space-y-4">
                         <h4 className="font-semibold">Deductions</h4>
                         <div className="flex justify-between text-sm">
                            <span>Provident Fund</span>
                            <span>$250.00</span>
                        </div>
                         <div className="flex justify-between text-sm">
                            <span>Income Tax</span>
                            <span>$350.00</span>
                        </div>
                         <div className="flex justify-between text-sm">
                            <span>Professional Tax</span>
                            <span>$200.00</span>
                        </div>
                    </div>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                      <div className="font-bold text-lg">Net Salary</div>
                      <div className="font-bold text-lg text-green-600">$5,200.00</div>
                  </div>
              </div>
          </CardContent>
      </Card>

      <Card>
          <CardHeader>
              <CardTitle>Payment History</CardTitle>
          </CardHeader>
          <CardContent>
               <div className="space-y-4">
                 {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                        <div>
                            <p className="font-medium">September 2023</p>
                            <p className="text-sm text-muted-foreground">Paid on Oct 1, 2023</p>
                        </div>
                        <div className="text-right">
                             <div className="font-bold">$5,200.00</div>
                             <Button variant="link" size="sm" className="h-auto p-0 text-muted-foreground">Download PDF</Button>
                        </div>
                    </div>
                 ))}
               </div>
          </CardContent>
      </Card>
    </div>
  )
}
