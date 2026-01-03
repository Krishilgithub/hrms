"use server"

import { db } from "@/lib/db"
import { z } from "zod"
import { sendEmail } from "@/lib/mail"
import { revalidatePath } from "next/cache"

export async function createEmployee(data: { 
  name: string
  email: string
  role: string
  department: string
  companyName?: string
  password?: string
  employeeId?: string
}) {
  try {
    const { name, email, role, department, companyName = "Odoo India", password, employeeId: providedId } = data

    // Check if user already exists
    const existingUser = await db.user.findUnique({ where: { email } })
    if (existingUser) return { error: "User already exists with this email." }

    // Use provided or auto-generate employee ID
    let finalEmployeeId = providedId
    if (!finalEmployeeId) {
       const { generateEmployeeId } = await import('@/lib/employee-utils')
       finalEmployeeId = await generateEmployeeId(companyName, name)
    }

    // Use provided or auto-generate password
    let finalPassword = password
    if (!finalPassword) {
       const { generatePassword } = await import('@/lib/employee-utils')
       finalPassword = generatePassword(10)
    }
    
    // Create user with employee profile
    await db.user.create({
        data: {
            name,
            email,
            password: finalPassword, // In production, hash this
            role: role as "EMPLOYEE" | "HR" | "ADMIN",
            employeeProfile: {
                create: {
                    employeeId: finalEmployeeId,
                    joiningDate: new Date(),
                    department,
                    position: role === 'HR' ? "HR Staff" : (role === 'ADMIN' ? "Administrator" : "Employee"),
                    company: companyName
                }
            }
        }
    })

    // Send welcome email with credentials
    if (email) {
        await sendEmail(
            email,
            "Welcome to the Team - Your Account Credentials",
            `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2>Welcome to ${companyName}!</h2>
              <p>Hi ${name},</p>
              <p>Your employee account has been successfully created. Here are your login credentials:</p>
              <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
                <p><strong>Employee ID:</strong> ${finalEmployeeId}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Password:</strong> <code style="background: #fff; padding: 2px 6px;">${finalPassword}</code></p>
              </div>
              <p style="color: #e74c3c;"><strong>⚠️ Security Notice:</strong> Please change your password after your first login.</p>
              <p>You can log in at: <a href="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/login">Login Here</a></p>
              <p>Best regards,<br/>HR Team</p>
            </div>
            `
        )
    }

    revalidatePath("/dashboard/admin/employees")
    revalidatePath("/dashboard/hr/employees")
    return { 
      success: "Employee created successfully! Login credentials sent to email.",
      employeeId,
      tempPassword: generatedPassword // Return for display to HR/Admin
    }

  } catch (error) {
    console.error("Create employee error:", error)
    return { error: "Failed to create employee." }
  }
}


// Recruitment functions
export async function getJobPostings() {
  try {
    const jobs = await db.jobPosting.findMany({
      orderBy: { createdAt: 'desc' }
    })
    return jobs
  } catch (error) {
    console.error("Get job postings error:", error)
    return []
  }
}

export async function createJobPosting(data: { title: string, description: string, department: string, requirements: string }) {
  try {
    await db.jobPosting.create({
      data: {
        title: data.title,
        description: data.description,
        department: data.department,
        requirements: data.requirements,
        location: "Remote",
        type: "Full-time",
        status: 'OPEN'
      }
    })
    revalidatePath("/dashboard/hr/recruitment")
    return { success: "Job posting created successfully" }
  } catch (error) {
    console.error("Create job posting error:", error)
    return { error: "Failed to create job posting" }
  }
}

export async function getCandidates(jobId?: string) {
  try {
    const candidates = await db.candidate.findMany({
      where: jobId ? { jobPostingId: jobId } : undefined,
      include: { jobPosting: true },
      orderBy: { appliedDate: 'desc' }
    })
    return candidates
  } catch (error) {
    console.error("Get candidates error:", error)
    return []
  }
}

export async function updateCandidateStatus(id: string, status: string) {
  try {
    await db.candidate.update({
      where: { id },
      data: { status: status as any }
    })
    revalidatePath("/dashboard/hr/recruitment")
    return { success: "Candidate status updated" }
  } catch (error) {
    console.error("Update candidate status error:", error)
    return { error: "Failed to update candidate status" }
  }
}

// Payroll functions
export async function getHRPayrollRecords() {
  try {
    const payrolls = await db.payroll.findMany({
      include: { user: true },
      orderBy:{ createdAt: 'desc' }
    })
    return payrolls
  } catch (error) {
    console.error("Get payroll records error:", error)
    return []
  }
}

export async function generateHRPayroll() {
  try {
    const currentMonth = String(new Date().getMonth() + 1)
    const currentYear = new Date().getFullYear()

    const existing = await db.payroll.findFirst({
      where: { month: currentMonth, year: currentYear }
    })

    if (existing) {
      return { error: "Payroll already generated for this month" }
    }

    const employees = await db.user.findMany({
      where: { role: 'EMPLOYEE' },
      include: { employeeProfile: true }
    })

    // Helper function to calculate working days in a month (excluding weekends)
    const getWorkingDays = (month: number, year: number) => {
      const totalDaysInMonth = new Date(year, month, 0).getDate()
      let workingDays = 0
      for (let day = 1; day <= totalDaysInMonth; day++) {
        const date = new Date(year, month - 1, day)
        const dayOfWeek = date.getDay()
        if (dayOfWeek !== 0 && dayOfWeek !== 6) { // Not Sunday or Saturday
          workingDays++
        }
      }
      return workingDays
    }

    const totalWorkingDays = getWorkingDays(parseInt(currentMonth), currentYear)

    for (const employee of employees) {
      const basicSalary = employee.employeeProfile?.basicSalary || 50000

      // Get attendance records for the month
      const startDate = new Date(currentYear, parseInt(currentMonth) - 1, 1)
      const endDate = new Date(currentYear, parseInt(currentMonth), 0)
      endDate.setHours(23, 59, 59, 999)

      const attendance = await db.attendance.findMany({
        where: {
          userId: employee.id,
          date: { gte: startDate, lte: endDate }
        }
      })

      const presentDays = attendance.filter((a: any) => a.status === 'PRESENT').length

      // Get approved leaves for the month
      const leaves = await db.leaveRequest.findMany({
        where: {
          userId: employee.id,
          status: 'APPROVED',
          startDate: { lte: endDate },
          endDate: { gte: startDate }
        }
      })

      let paidLeaveDays = 0
      let unpaidLeaveDays = 0

      leaves.forEach((leave: any) => {
        const start = new Date(Math.max(leave.startDate.getTime(), startDate.getTime()))
        const end = new Date(Math.min(leave.endDate.getTime(), endDate.getTime()))
        const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1
        
        if (leave.isPaid) {
          paidLeaveDays += days
        } else {
          unpaidLeaveDays += days
        }
      })

      // Calculate absent days (working days not present and not on leave)
      const accountedDays = presentDays + paidLeaveDays + unpaidLeaveDays
      const absentDays = Math.max(0, totalWorkingDays - accountedDays)

      // Calculate payable days (present + paid leaves only)
      const payableDays = presentDays + paidLeaveDays

      // Calculate salary
      const dailyRate = basicSalary / totalWorkingDays
      const earnedBasicSalary = dailyRate * payableDays
      const allowances = 5000
      const deductions = 2000
      const netSalary = earnedBasicSalary + allowances - deductions

      await db.payroll.create({
        data: {
          userId: employee.id,
          month: currentMonth,
          year: currentYear,
          basicSalary: basicSalary,
          netSalary: Math.round(netSalary * 100) / 100,
          allowances: allowances,
          deductions: deductions,
          status: "PROCESSED",
          // Attendance-based fields
          totalWorkingDays,
          paidLeaveDays,
          unpaidLeaveDays,
          absentDays,
          presentDays,
          payableDays,
          dailyRate: Math.round(dailyRate * 100) / 100
        }
      })
    }

    revalidatePath("/dashboard/hr/payroll")
    revalidatePath("/dashboard/admin/payroll")
    return { success: "Payroll generated successfully with attendance-based calculation" }
  } catch (error) {
    console.error("Generate payroll error:", error)
    return { error: "Failed to generate payroll" }
  }
}
