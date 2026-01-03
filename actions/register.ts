"use server"

import { db } from "@/lib/db"
import { z } from "zod"
import { cookies } from "next/headers"
import { sendEmail } from "@/lib/mail"
import { generateLoginId, generatePassword } from "@/lib/utils"

const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(10),
  password: z.string().min(6),
  companyName: z.string().min(2),
  companyLogo: z.string().optional(),
})

export async function register(values: z.infer<typeof registerSchema>) {
  try {
    const { email, password, name, companyName, companyLogo, phone } = values

    // Check if user exists
    const existingUser = await db.user.findUnique({
        where: { email }
    })

    if (existingUser) {
        return { error: "User already exists with this email." }
    }

    // Get the current year for joining date
    const joiningYear = new Date().getFullYear()

    // Get the count of users joined this year to generate serial number
    const usersThisYear = await db.employeeProfile.count({
        where: {
            joiningDate: {
                gte: new Date(`${joiningYear}-01-01`),
                lt: new Date(`${joiningYear + 1}-01-01`)
            }
        }
    })

    const serialNumber = usersThisYear + 1

    // Generate Login ID based on the format from the image
    const loginId = generateLoginId(companyName, name, joiningYear, serialNumber)

    // Create User with auto-generated loginId
    const user = await db.user.create({
        data: {
            name,
            email,
            phone,
            password: password, // Use provided password
            loginId, // Auto-generated login ID
            companyName,
            companyLogo,
            role: "ADMIN", // First user is admin (company owner)
            employeeProfile: {
                create: {
                    employeeId: loginId,
                    joiningDate: new Date(),
                    department: "Management",
                    position: "Admin",
                    phone: phone, // Also save phone in profile
                    company: companyName // Also save company in profile
                }
            }
        }
    })

    // Send Welcome Email with Login ID
    if (email) {
        await sendEmail(
            email,
            "Welcome to HRMS - Your Account Details",
            `<p>Hi ${name},</p>
             <p>Welcome to HRMS! Your account has been successfully created.</p>
             <p><strong>Your Login Credentials:</strong></p>
             <p><strong>Login ID:</strong> ${loginId}</p>
             <p><strong>Password:</strong> (The password you set during registration)</p>
             <p><strong>Note:</strong> Please save your Login ID securely.</p>
             <p><a href="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/login">Login Now</a></p>`
        )
    }

    return { 
        success: "Account created successfully! Check your email for your Login ID.",
        loginId,
        role: user.role
    }

  } catch (error) {
    console.error("Registration error:", error)
    return { error: "Registration failed. Please try again." }
  }
}
