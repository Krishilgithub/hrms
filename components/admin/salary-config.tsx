"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"

interface SalaryConfigProps {
  userId: string
  initialData?: any
}

export function SalaryConfig({ userId, initialData }: SalaryConfigProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  
  // Wage Configuration
  const [monthlyWage, setMonthlyWage] = useState(initialData?.monthlyWage || 50000)
  const [workingDaysPerWeek, setWorkingDaysPerWeek] = useState(initialData?.workingDaysPerWeek || 5)
  const [breakTimeHours, setBreakTimeHours] = useState(initialData?.breakTimeHours || 1)
  
  // Component Percentages
  const [basicPercent, setBasicPercent] = useState(initialData?.basicPercent || 50)
  const [hraPercent, setHraPercent] = useState(initialData?.hraPercent || 50)
  const [standardAllowance, setStandardAllowance] = useState(initialData?.standardAllowance || 4167)
  const [performanceBonusPercent, setPerformanceBonusPercent] = useState(initialData?.performanceBonusPercent || 8.33)
  const [ltaPercent, setLtaPercent] = useState(initialData?.ltaPercent || 8.333)
  const [pfPercent, setPfPercent] = useState(initialData?.pfPercent || 12)
  const [professionalTax, setProfessionalTax] = useState(initialData?.professionalTax || 200)
  const [employerPFPercent, setEmployerPFPercent] = useState(initialData?.employerPFPercent || 12)
  
  // Calculated values
  const [calculated, setCalculated] = useState({
    yearlyWage: 0,
    basicAmount: 0,
    hraAmount: 0,
    performanceBonusAmount: 0,
    ltaAmount: 0,
    fixedAllowance: 0,
    grossSalary: 0,
    pfAmount: 0,
    employerPFAmount: 0,
    totalDeductions: 0,
    netSalary: 0,
  })

  // Auto-calculate when values change
  useEffect(() => {
    const yearlyWage = monthlyWage * 12
    const basicAmount = (monthlyWage * basicPercent) / 100
    const hraAmount = (basicAmount * hraPercent) / 100
    const performanceBonusAmount = (monthlyWage * performanceBonusPercent) / 100
    const ltaAmount = (monthlyWage * ltaPercent) / 100
    
    const totalAllocated = basicAmount + hraAmount + standardAllowance + performanceBonusAmount + ltaAmount
    const fixedAllowance = Math.max(0, monthlyWage - totalAllocated)
    
    const grossSalary = monthlyWage
    const pfAmount = (basicAmount * pfPercent) / 100
    const employerPFAmount = (basicAmount * employerPFPercent) / 100
    const totalDeductions = pfAmount + professionalTax
    const netSalary = grossSalary - totalDeductions

    setCalculated({
      yearlyWage: Math.round(yearlyWage),
      basicAmount: Math.round(basicAmount * 100) / 100,
      hraAmount: Math.round(hraAmount * 100) / 100,
      performanceBonusAmount: Math.round(performanceBonusAmount * 100) / 100,
      ltaAmount: Math.round(ltaAmount * 100) / 100,
      fixedAllowance: Math.round(fixedAllowance * 100) / 100,
      grossSalary: Math.round(grossSalary * 100) / 100,
      pfAmount: Math.round(pfAmount * 100) / 100,
      employerPFAmount: Math.round(employerPFAmount * 100) / 100,
      totalDeductions: Math.round(totalDeductions * 100) / 100,
      netSalary: Math.round(netSalary * 100) / 100,
    })
  }, [monthlyWage, basicPercent, hraPercent, standardAllowance, performanceBonusPercent, ltaPercent, pfPercent, professionalTax, employerPFPercent])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)

    try {
      const { updateEmployeeSalary } = await import('@/actions/salary')
      const result = await updateEmployeeSalary(userId, {
        monthlyWage,
        workingDaysPerWeek,
        breakTimeHours,
        basicPercent,
        hraPercent,
        standardAllowance,
        performanceBonusPercent,
        ltaPercent,
        pfPercent,
        professionalTax,
        employerPFPercent,
      })

      if (result.error) {
        toast.error(result.error)
      } else {
        toast.success(result.success || "Salary configuration updated")
        router.refresh()
      }
    } catch (error) {
      toast.error("Failed to update salary")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Wage Configuration */}
      <Card>
        <CardHeader>
          <CardTitle>Wage Configuration</CardTitle>
          <CardDescription>Set base wage and working schedule</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Monthly Wage (₹)</Label>
            <Input
              type="number"
              value={monthlyWage}
              onChange={(e) => setMonthlyWage(Number(e.target.value))}
              min="0"
              step="100"
            />
            <p className="text-xs text-muted-foreground">/month</p>
          </div>
          
          <div className="space-y-2">
            <Label>Yearly Wage (₹)</Label>
            <Input
              type="number"
              value={calculated.yearlyWage}
              disabled
              className="bg-muted"
            />
            <p className="text-xs text-muted-foreground">/yearly</p>
          </div>
          
          <div className="space-y-2">
            <Label>Working Days Per Week</Label>
            <Input
              type="number"
              value={workingDaysPerWeek}
              onChange={(e) => setWorkingDaysPerWeek(Number(e.target.value))}
              min="1"
              max="7"
            />
          </div>
          
          <div className="space-y-2">
            <Label>Break Time (hours/day)</Label>
            <Input
              type="number"
              value={breakTimeHours}
              onChange={(e) => setBreakTimeHours(Number(e.target.value))}
              min="0"
              max="8"
              step="0.5"
            />
          </div>
        </CardContent>
      </Card>

      {/* Salary Components */}
      <Card>
        <CardHeader>
          <CardTitle>Salary Components</CardTitle>
          <CardDescription>Configure salary structure and allowances</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Basic Salary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            <div className="space-y-2">
              <Label>Basic Salary</Label>
              <div className="flex gap-2">
                <Input
                  type="number"
                  value={basicPercent}
                  onChange={(e) => setBasicPercent(Number(e.target.value))}
                  min="0"
                  max="100"
                  step="0.1"
                />
                <span className="text-sm text-muted-foreground mt-2">%</span>
              </div>
              <p className="text-xs text-muted-foreground">% of wage</p>
            </div>
            <div className="space-y-2">
              <Label>Amount</Label>
              <Input
                value={`₹${calculated.basicAmount.toLocaleString()}`}
                disabled
                className="bg-muted font-medium"
              />
            </div>
          </div>

          {/* HRA */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            <div className="space-y-2">
              <Label>House Rent Allowance (HRA)</Label>
              <div className="flex gap-2">
                <Input
                  type="number"
                  value={hraPercent}
                  onChange={(e) => setHraPercent(Number(e.target.value))}
                  min="0"
                  max="100"
                  step="0.1"
                />
                <span className="text-sm text-muted-foreground mt-2">%</span>
              </div>
              <p className="text-xs text-muted-foreground">% of basic</p>
            </div>
            <div className="space-y-2">
              <Label>Amount</Label>
              <Input
                value={`₹${calculated.hraAmount.toLocaleString()}`}
                disabled
                className="bg-muted font-medium"
              />
            </div>
          </div>

          {/* Standard Allowance */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            <div className="space-y-2">
              <Label>Standard Allowance</Label>
              <Input
                type="number"
                value={standardAllowance}
                onChange={(e) => setStandardAllowance(Number(e.target.value))}
                min="0"
                step="1"
              />
              <p className="text-xs text-muted-foreground">Fixed amount</p>
            </div>
            <div className="space-y-2">
              <Label>Amount</Label>
              <Input
                value={`₹${standardAllowance.toLocaleString()}`}
                disabled
                className="bg-muted font-medium"
              />
            </div>
          </div>

          {/* Performance Bonus */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            <div className="space-y-2">
              <Label>Performance Bonus</Label>
              <div className="flex gap-2">
                <Input
                  type="number"
                  value={performanceBonusPercent}
                  onChange={(e) => setPerformanceBonusPercent(Number(e.target.value))}
                  min="0"
                  max="100"
                  step="0.01"
                />
                <span className="text-sm text-muted-foreground mt-2">%</span>
              </div>
              <p className="text-xs text-muted-foreground">% of wage</p>
            </div>
            <div className="space-y-2">
              <Label>Amount</Label>
              <Input
                value={`₹${calculated.performanceBonusAmount.toLocaleString()}`}
                disabled
                className="bg-muted font-medium"
              />
            </div>
          </div>

          {/* LTA */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            <div className="space-y-2">
              <Label>Leave Travel Allowance (LTA)</Label>
              <div className="flex gap-2">
                <Input
                  type="number"
                  value={ltaPercent}
                  onChange={(e) => setLtaPercent(Number(e.target.value))}
                  min="0"
                  max="100"
                  step="0.001"
                />
                <span className="text-sm text-muted-foreground mt-2">%</span>
              </div>
              <p className="text-xs text-muted-foreground">% of wage</p>
            </div>
            <div className="space-y-2">
              <Label>Amount</Label>
              <Input
                value={`₹${calculated.ltaAmount.toLocaleString()}`}
                disabled
                className="bg-muted font-medium"
              />
            </div>
          </div>

          {/* Fixed Allowance */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            <div className="space-y-2">
              <Label>Fixed Allowance</Label>
              <p className="text-xs text-muted-foreground">Auto-calculated (Wage - All Components)</p>
            </div>
            <div className="space-y-2">
              <Label>Amount</Label>
              <Input
                value={`₹${calculated.fixedAllowance.toLocaleString()}`}
                disabled
                className="bg-muted font-medium"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Deductions */}
      <Card>
        <CardHeader>
          <CardTitle>Tax Deductions</CardTitle>
          <CardDescription>Configure PF and Professional Tax</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* PF */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            <div className="space-y-2">
              <Label>Provident Fund (PF)</Label>
              <div className="flex gap-2">
                <Input
                  type="number"
                  value={pfPercent}
                  onChange={(e) => setPfPercent(Number(e.target.value))}
                  min="0"
                  max="100"
                  step="0.1"
                />
                <span className="text-sm text-muted-foreground mt-2">%</span>
              </div>
              <p className="text-xs text-muted-foreground">% of basic</p>
            </div>
            <div className="space-y-2">
              <Label>Employee Contribution</Label>
              <Input
                value={`₹${calculated.pfAmount.toLocaleString()}`}
                disabled
                className="bg-muted font-medium"
              />
            </div>
            <div className="space-y-2">
              <Label>Employer Contribution</Label>
              <Input
                value={`₹${calculated.employerPFAmount.toLocaleString()}`}
                disabled
                className="bg-muted font-medium"
              />
            </div>
          </div>

          {/* Professional Tax */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            <div className="space-y-2">
              <Label>Professional Tax</Label>
              <Input
                type="number"
                value={professionalTax}
                onChange={(e) => setProfessionalTax(Number(e.target.value))}
                min="0"
                step="1"
              />
              <p className="text-xs text-muted-foreground">Fixed amount</p>
            </div>
            <div className="space-y-2">
              <Label>Amount</Label>
              <Input
                value={`₹${professionalTax.toLocaleString()}`}
                disabled
                className="bg-muted font-medium"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Summary */}
      <Card className="border-2 border-primary">
        <CardHeader>
          <CardTitle>Salary Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between text-lg">
            <span className="font-medium">Gross Salary:</span>
            <span className="font-bold">₹{calculated.grossSalary.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-red-600">
            <span className="font-medium">Total Deductions:</span>
            <span className="font-bold">-₹{calculated.totalDeductions.toLocaleString()}</span>
          </div>
          <div className="border-t pt-4 flex justify-between text-xl">
            <span className="font-bold">Net Salary:</span>
            <span className="font-bold text-green-600">₹{calculated.netSalary.toLocaleString()}</span>
          </div>
        </CardContent>
      </Card>

      <Button type="submit" className="w-full" disabled={loading}>
        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Save Salary Configuration
      </Button>
    </form>
  )
}
