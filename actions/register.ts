"use server"

import { db } from "@/lib/db"
import { z } from "zod"
import { cookies } from "next/headers"
import { sendEmail } from "@/lib/mail"

const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6), // In real app: Hash this!
  role: z.enum(["EMPLOYEE", "HR", "ADMIN"]),
  employeeId: z.string().min(1),
})

export async function register(values: z.infer<typeof registerSchema>) {
  try {
    const { email, password, name, role, employeeId } = values

    // Check if user exists
    const existingUser = await db.user.findUnique({
        where: { email }
    })

    if (existingUser) {
        return { error: "User already exists with this email." }
    }
    
    // Check if employee ID exists (if role is employee/hr)
    if (role !== 'ADMIN') {
         const existingEmpId = await db.employeeProfile.findUnique({
             where: { employeeId }
         })
         if (existingEmpId) {
             return { error: "Employee ID already assigned." }
         }
    }

    // Create User
    const user = await db.user.create({
        data: {
            name,
            email,
            password, // Plain text for demo as per seed.ts
            role: role as "EMPLOYEE" | "HR" | "ADMIN",
            employeeProfile: role !== 'ADMIN' ? {
                create: {
                    employeeId,
                    joiningDate: new Date(),
                    // Default values
                    department: "Unassigned",
                    position:  role === 'HR' ? "HR Manager" : "Employee"
                }
            } : undefined
        }
    })



    // Auto-login (Create session)
    const cookieStore = await cookies()
    cookieStore.set("user_session", user.id, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24 * 7, // 1 week
        path: "/",
    })

    // Send Welcome Email
    if (email) {
        await sendEmail(
            email,
            "Welcome to Dayflow HRMS",
            `<p>Hi ${name},</p>
             <p>Welcome to Dayflow! Your account has been successfully created.</p>
             <p><strong>Please log in and complete your profile details and upload necessary documents (Resume, ID Proof) to finish onboarding.</strong></p>
             <p><a href="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/dashboard/employee/profile">Go to Profile</a></p>`
        )
    }

    return { 
        success: "Account created successfully!",
        role: user.role
    }

  } catch (error) {
    console.error("Registration error:", error)
    return { error: "Registration failed. Please try again." }
  }
}
