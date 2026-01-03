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

    revalidatePath("/dashboard/hr/employees")
    return { success: "Employee created successfully!" }

  } catch (error) {
    console.error("Create employee error:", error)
    return { error: "Failed to create employee." }
  }
}
