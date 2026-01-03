"use client"

import { useState } from "react"
import { generatePayroll } from "@/actions/admin"
import { Button } from "@/components/ui/button"
import { Loader2, DollarSign } from "lucide-react"
import { toast } from "sonner"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function ProcessPayrollCard() {
    const [isLoading, setIsLoading] = useState(false)

    const handleProcess = async () => {
        setIsLoading(true)
        const res = await generatePayroll()
        setIsLoading(false)

        if (res.error) {
            toast.error(res.error)
        } else if (res.message) {
            toast.info(res.message)
        } else {
            toast.success(res.success)
        }
    }

    const currentMonth = new Date().toLocaleString('default', { month: 'long', year: 'numeric' })

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="flex flex-col space-y-1.5">
                     <CardTitle>Process Payroll</CardTitle>
                     <CardDescription>Generate salary slips for {currentMonth}</CardDescription>
                </div>
                <Button onClick={handleProcess} disabled={isLoading}>
                    {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <DollarSign className="mr-2 h-4 w-4" />}
                    Run Payroll
                </Button>
            </CardHeader>
        </Card>
    )
}
