"use server"

import { db } from "@/lib/db"
import { z } from "zod"
import { sendEmail } from "@/lib/mail"
import { revalidatePath } from "next/cache"

const createEmployeeSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
  role: z.enum(["EMPLOYEE", "HR", "ADMIN"]),
  employeeId: z.string().min(1),
  department: z.string().min(1),
})

export async function createEmployee(values: z.infer<typeof createEmployeeSchema>) {
  try {
    const { email, password, name, role, employeeId, department } = values

    const existingUser = await db.user.findUnique({ where: { email } })
    if (existingUser) return { error: "User already exists with this email." }
    
    const existingEmpId = await db.employeeProfile.findUnique({ where: { employeeId } })
    if (existingEmpId) return { error: "Employee ID already assigned." }

    // Create User
    await db.user.create({
        data: {
            name,
            email,
            password, // In real app, hash this
            role: role as "EMPLOYEE" | "HR" | "ADMIN",
            employeeProfile: {
                create: {
                    employeeId,
                    joiningDate: new Date(),
                    department,
                    position: role === 'HR' ? "HR Staff" : "Employee"
                }
            }
        }
    })

    if (email) {
        await sendEmail(
            email,
            "Welcome to the Team",
            `<p>Hi ${name},</p><p>Your account has been created. Login with password: ${password}</p>`
        )
    }

    return { success: "Employee created successfully!" }

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
      where: jobId ? { jobId } : undefined,
      include: { job: true },
      orderBy: { appliedAt: 'desc' }
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
      data: { status }
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
    const currentMonth = new Date().getMonth() + 1
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

    for (const employee of employees) {
      await db.payroll.create({
        data: {
          userId: employee.id,
          month: currentMonth,
          year: currentYear,
          netSalary: employee.employeeProfile?.basicSalary || 50000,
          allowances: 5000,
          deductions: 2000,
          status: "PROCESSED"
        }
      })
    }

    revalidatePath("/dashboard/hr/payroll")
    return { success: "Payroll generated successfully" }
  } catch (error) {
    console.error("Generate payroll error:", error)
    return { error: "Failed to generate payroll" }
  }
}
