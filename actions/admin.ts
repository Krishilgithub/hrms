"use server"

import { db } from "@/lib/db"
import { z } from "zod"
import { revalidatePath } from "next/cache"
import { Role } from "@prisma/client"
import { sendEmail } from "@/lib/mail"
import { generatePassword } from "@/lib/utils"

export async function getAdminDashboardStats() {
    // 1. Total Employees & HR
    const totalEmployees = await db.user.count({ where: { role: 'EMPLOYEE' }})
    const hrCount = await db.user.count({ where: { role: 'HR' }})

    // 2. Pending Leaves
    const pendingLeaves = await db.leaveRequest.count({ where: { status: 'PENDING' }})

    // 3. Total Payroll (Current Month)
    const now = new Date()
    const currentMonth = now.toLocaleString('default', { month: 'long' })
    const currentYear = now.getFullYear()
    
    const payrolls = await db.payroll.findMany({
        where: { month: currentMonth, year: currentYear }
    })
    const totalPayroll = payrolls.reduce((acc: number, curr: any) => acc + curr.netSalary, 0)

    // 4. Recent Leave Requests
    const recentLeaves = await db.leaveRequest.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        include: { user: true }
    })

    // 5. Attendance (Today)
    const startOfDay = new Date(now.setHours(0,0,0,0))
    const endOfDay = new Date(now.setHours(23,59,59,999))
    
    // Total active employees for percentage
    const activeEmployees = totalEmployees + hrCount 
    
    const presentCount = await db.attendance.count({
        where: {
            date: {
                gte: startOfDay,
                lte: endOfDay
            },
            status: { in: ['PRESENT', 'LATE', 'HALF_DAY'] }
        }
    })

    const attendancePercentage = activeEmployees > 0 ? (presentCount / activeEmployees) * 100 : 0

    return {
        totalEmployees,
        hrCount,
        pendingLeaves,
        totalPayroll,
        recentLeaves,
        attendanceStats: {
            present: presentCount,
            total: activeEmployees,
            percentage: Math.round(attendancePercentage)
        }
    }
}

export async function getEmployees() {
    return await db.user.findMany({
        where: {
            role: { in: ['EMPLOYEE', 'HR'] }
        },
        include: {
            employeeProfile: true
        },
        orderBy: { createdAt: 'desc' }
    })
}

const createEmployeeSchema = z.object({
    name: z.string().min(2),
    email: z.string().email(),
    department: z.string().optional(),
    position: z.string().optional(),
})

export async function createEmployee(values: z.infer<typeof createEmployeeSchema>) {
    try {
        const { name, email, department, position } = values
        
        // Auto-generate a secure password
        const password = generatePassword()
        
        const existingUser = await db.user.findUnique({ where: { email } })
        if (existingUser) return { error: "User with this email already exists" }

        const user = await db.user.create({
            data: {
                name,
                email,
                password, // Plain text for demo
                role: "EMPLOYEE", // Admin can only create employees
                image: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`,
                employeeProfile: {
                    create: {
                        department,
                        position,
                        employeeId: `EMP-${Math.floor(1000 + Math.random() * 9000)}` 
                    }
                }
            }
        })

        // Send welcome email with login credentials
        await sendEmail(
            email,
            "Welcome to HRMS - Your Login Credentials",
            `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #333;">Welcome to HRMS, ${name}!</h2>
                <p>Your employee account has been created by the administrator.</p>
                
                <div style="background-color: #f5f5f5; padding: 20px; border-radius: 5px; margin: 20px 0;">
                    <h3 style="margin-top: 0; color: #555;">Your Login Credentials:</h3>
                    <p style="margin: 10px 0;"><strong>Email:</strong> ${email}</p>
                    <p style="margin: 10px 0;"><strong>Password:</strong> ${password}</p>
                    ${department ? `<p style="margin: 10px 0;"><strong>Department:</strong> ${department}</p>` : ''}
                    ${position ? `<p style="margin: 10px 0;"><strong>Position:</strong> ${position}</p>` : ''}
                </div>
                
                <p style="color: #666;">Please keep your credentials secure. You can change your password after logging in.</p>
                
                <div style="margin-top: 30px;">
                    <a href="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/login" 
                       style="background-color: #7c3aed; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block;">
                        Login to Your Account
                    </a>
                </div>
                
                <p style="color: #999; font-size: 12px; margin-top: 30px;">
                    If you have any questions, please contact your administrator.
                </p>
            </div>`
        )

        revalidatePath("/dashboard/admin/employees")
        return { success: "Employee created successfully! Login credentials sent to their email.", user }
    } catch (error) {
        console.error(error)
        return { error: "Failed to create employee" }
    }
}

export async function getAllLeaves() {
    return await db.leaveRequest.findMany({
        include: {
            user: true
        },
        orderBy: { createdAt: 'desc' }
    })
}

export async function updateLeaveStatus(leaveId: string, status: "APPROVED" | "REJECTED") {
    try {
        await db.leaveRequest.update({
            where: { id: leaveId },
            data: { status }
        })
        revalidatePath("/dashboard/admin/leaves")
        revalidatePath("/dashboard/admin") 
        return { success: `Leave request ${status.toLowerCase()} successfully.` }
    } catch (error) {
        return { error: "Failed to update leave status." }
    }
}

export async function getDailyAttendance() {
    const now = new Date()
    const startOfDay = new Date(now.setHours(0,0,0,0))
    const endOfDay = new Date(now.setHours(23,59,59,999))

    // Get all employees to map absent/present
    const employees = await db.user.findMany({
        where: { role: 'EMPLOYEE' }
    })

    const attendanceRecords = await db.attendance.findMany({
        where: {
            date: {
                gte: startOfDay,
                lte: endOfDay
            }
        },
        include: {
            user: true
        }
    })

    // Calculate stats
    const presentCount = attendanceRecords.filter((a: any) => a.status === 'PRESENT' || a.status === 'LATE').length
    const lateCount = attendanceRecords.filter((a: any) => a.status === 'LATE').length
    // "On Leave" would require querying leave requests for today (implied absent but with reason)
    // For now, let's just count total - present as absent/on-leave
    const absentCount = employees.length - presentCount

    return {
        records: attendanceRecords,
        stats: {
            present: presentCount,
            late: lateCount,
            absent: absentCount,
            total: employees.length
        }
    }
}

export async function getAllPayrolls() {
    return await db.payroll.findMany({
        include: {
            user: true
        },
        orderBy: { createdAt: 'desc' }
    })
}

export async function generatePayroll() {
    const now = new Date()
    const currentMonth = now.toLocaleString('default', { month: 'long' })
    const currentYear = now.getFullYear()

    try {
        const employees = await db.user.findMany({
            where: { role: 'EMPLOYEE' },
            include: { employeeProfile: true }
        })

        let processedCount = 0

        for (const employee of employees) {
             const existing = await db.payroll.findFirst({
                 where: {
                     userId: employee.id,
                     month: currentMonth,
                     year: currentYear
                 }
             })

             if (!existing) {
                 const basicSalary = employee.employeeProfile?.basicSalary || 50000
                 const allowances = 1200 // Fixed for demo
                 const deductions = 500  // Fixed for demo
                 const netSalary = basicSalary + allowances - deductions

                 await db.payroll.create({
                     data: {
                         userId: employee.id,
                         month: currentMonth,
                         year: currentYear,
                         basicSalary,
                         allowances,
                         deductions,
                         netSalary,
                         status: 'PROCESSED',
                         paymentDate: new Date()
                     }
                 })
                 processedCount++
             }
        }

        revalidatePath("/dashboard/admin/payroll")
        revalidatePath("/dashboard/admin")
        
        if (processedCount === 0) {
            return { message: "Payroll for this month already processed for all employees." }
        }
        
        return { success: `Payroll processed successfully for ${processedCount} employees.` }
    } catch (error) {
        console.error(error)
        return { error: "Failed to generate payroll." }
    }
}

const updateEmployeeSchema = z.object({
    name: z.string().min(2),
    email: z.string().email(),
    phone: z.string().optional(),
    address: z.string().optional(),
    department: z.string().optional(),
    position: z.string().optional(),
    basicSalary: z.string(),
    dob: z.string().optional(),
})

export async function updateEmployee(employeeId: string, values: z.infer<typeof updateEmployeeSchema>) {
    try {
        const { name, email, phone, address, department, position, basicSalary, dob } = values
        
        // Check if email is being changed and if it already exists
        const existingUser = await db.user.findFirst({
            where: { 
                email,
                NOT: { id: employeeId }
            }
        })
        if (existingUser) return { error: "Email already exists for another user" }

        const basicSalaryFloat = parseFloat(basicSalary)
        if (isNaN(basicSalaryFloat) || basicSalaryFloat < 0) {
            return { error: "Invalid basic salary" }
        }

        // Get current employee data to check if salary changed
        const currentEmployee = await db.user.findUnique({
            where: { id: employeeId },
            include: { employeeProfile: true }
        })

        if (!currentEmployee) {
            return { error: "Employee not found" }
        }

        const salaryChanged = currentEmployee.employeeProfile?.basicSalary !== basicSalaryFloat

        // Update user and profile
        await db.user.update({
            where: { id: employeeId },
            data: {
                name,
                email,
                phone,
                employeeProfile: {
                    upsert: {
                        create: {
                            phone,
                            address,
                            department,
                            position,
                            basicSalary: basicSalaryFloat,
                            dob: dob ? new Date(dob) : null,
                            employeeId: `EMP-${Math.floor(1000 + Math.random() * 9000)}`
                        },
                        update: {
                            phone,
                            address,
                            department,
                            position,
                            basicSalary: basicSalaryFloat,
                            dob: dob ? new Date(dob) : null,
                        }
                    }
                }
            }
        })

        // If salary changed, generate/update payroll for current month
        if (salaryChanged) {
            const now = new Date()
            const currentMonth = now.toLocaleString('default', { month: 'long' })
            const currentYear = now.getFullYear()

            const allowances = 1200 // Fixed for demo
            const deductions = 500  // Fixed for demo
            const netSalary = basicSalaryFloat + allowances - deductions

            // Check if payroll exists for current month
            const existingPayroll = await db.payroll.findFirst({
                where: {
                    userId: employeeId,
                    month: currentMonth,
                    year: currentYear
                }
            })

            if (existingPayroll) {
                // Update existing payroll
                await db.payroll.update({
                    where: { id: existingPayroll.id },
                    data: {
                        basicSalary: basicSalaryFloat,
                        allowances,
                        deductions,
                        netSalary,
                        status: 'PROCESSED',
                    }
                })
            } else {
                // Create new payroll
                await db.payroll.create({
                    data: {
                        userId: employeeId,
                        month: currentMonth,
                        year: currentYear,
                        basicSalary: basicSalaryFloat,
                        allowances,
                        deductions,
                        netSalary,
                        status: 'PROCESSED',
                    }
                })
            }
        }

        revalidatePath(`/dashboard/admin/employees/${employeeId}`)
        revalidatePath(`/dashboard/admin/employees/${employeeId}/edit`)
        revalidatePath("/dashboard/admin/employees")
        revalidatePath("/dashboard/admin/payroll")
        
        return { 
            success: salaryChanged 
                ? "Employee updated successfully! Payroll has been automatically generated for the current month." 
                : "Employee updated successfully!" 
        }
    } catch (error) {
        console.error(error)
        return { error: "Failed to update employee" }
    }
}
