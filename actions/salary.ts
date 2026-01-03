"use server"

import { db } from "@/lib/db"
import { revalidatePath } from "next/cache"

interface SalaryComponents {
  monthlyWage: number
  workingDaysPerWeek?: number
  breakTimeHours?: number
  basicPercent?: number
  hraPercent?: number
  standardAllowance?: number
  performanceBonusPercent?: number
  ltaPercent?: number
  pfPercent?: number
  professionalTax?: number
  employerPFPercent?: number
}

export async function calculateSalaryComponents(data: SalaryComponents) {
  const {
    monthlyWage,
    basicPercent = 50,
    hraPercent = 50,
    standardAllowance = 4167,
    performanceBonusPercent = 8.33,
    ltaPercent = 8.333,
    pfPercent = 12,
    professionalTax = 200,
    employerPFPercent = 12
  } = data

  // Calculate yearly wage
  const yearlyWage = monthlyWage * 12

  // Calculate Basic (% of wage)
  const basicAmount = (monthlyWage * basicPercent) / 100

  // Calculate HRA (% of basic)
  const hraAmount = (basicAmount * hraPercent) / 100

  // Calculate Performance Bonus (% of wage)
  const performanceBonusAmount = (monthlyWage * performanceBonusPercent) / 100

  // Calculate LTA (% of wage)
  const ltaAmount = (monthlyWage * ltaPercent) / 100

  // Calculate Fixed Allowance (remaining amount)
  const totalAllocated = basicAmount + hraAmount + standardAllowance + performanceBonusAmount + ltaAmount
  const fixedAllowance = Math.max(0, monthlyWage - totalAllocated)

  // Calculate Gross Salary
  const grossSalary = monthlyWage

  // Calculate PF (% of basic)
  const pfAmount = (basicAmount * pfPercent) / 100

  // Calculate Employer PF
  const employerPFAmount = (basicAmount * employerPFPercent) / 100

  // Calculate Total Deductions
  const totalDeductions = pfAmount + professionalTax

  // Calculate Net Salary
  const netSalary = grossSalary - totalDeductions

  return {
    yearlyWage,
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
  }
}

export async function updateEmployeeSalary(userId: string, salaryData: SalaryComponents) {
  try {
    const calculated = await calculateSalaryComponents(salaryData)

    await db.employeeProfile.update({
      where: { userId },
      data: {
        monthlyWage: salaryData.monthlyWage,
        yearlyWage: calculated.yearlyWage,
        workingDaysPerWeek: salaryData.workingDaysPerWeek || 5,
        breakTimeHours: salaryData.breakTimeHours || 1,
        
        basicPercent: salaryData.basicPercent || 50,
        basicAmount: calculated.basicAmount,
        
        hraPercent: salaryData.hraPercent || 50,
        hraAmount: calculated.hraAmount,
        
        standardAllowance: salaryData.standardAllowance || 4167,
        
        performanceBonusPercent: salaryData.performanceBonusPercent || 8.33,
        performanceBonusAmount: calculated.performanceBonusAmount,
        
        ltaPercent: salaryData.ltaPercent || 8.333,
        ltaAmount: calculated.ltaAmount,
        
        fixedAllowance: calculated.fixedAllowance,
        
        pfPercent: salaryData.pfPercent || 12,
        pfAmount: calculated.pfAmount,
        
        professionalTax: salaryData.professionalTax || 200,
        
        employerPFPercent: salaryData.employerPFPercent || 12,
        employerPFAmount: calculated.employerPFAmount,
        
        grossSalary: calculated.grossSalary,
        totalDeductions: calculated.totalDeductions,
        netSalary: calculated.netSalary,
        
        // Update old basicSalary field for compatibility
        basicSalary: calculated.netSalary,
      }
    })

    revalidatePath(`/dashboard/admin/employees/${userId}`)
    revalidatePath("/dashboard/admin/payroll")
    
    return { success: "Salary updated successfully", calculated }
  } catch (error) {
    console.error("Update salary error:", error)
    return { error: "Failed to update salary" }
  }
}
