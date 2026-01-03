"use server"

import { db } from "@/lib/db"
import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"
import { sendEmail } from "@/lib/mail"

export async function checkIn() {
  const cookieStore = await cookies()
  const userId = cookieStore.get("user_session")?.value

  if (!userId) {
    return { error: "Unauthorized" }
  }

  try {
      // Check if already checked in today
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      
      const existing = await db.attendance.findFirst({
          where: {
              userId,
              date: {
                  gte: today
              }
          }
      })

      if (existing) {
          return { error: "Already checked in or attendance record exists for today." }
      }

      const now = new Date()
      // Check if employee is late (assuming workday starts at 9 AM)
      const workStartTime = new Date(now)
      workStartTime.setHours(9, 0, 0, 0)
      const isLate = now > workStartTime
      const lateBy = isLate ? Math.floor((now.getTime() - workStartTime.getTime()) / (1000 * 60)) : 0

      await db.attendance.create({
          data: {
              userId,
              date: now,
              checkIn: now,
              status: "PRESENT",
              isLate,
              lateBy: lateBy > 0 ? lateBy : null
          }
      })
      
      revalidatePath("/dashboard/employee/attendance")
      return { success: "Checked in successfully!" }

  } catch (error) {
      return { error: "Failed to check in." }
  }
}

export async function checkOut() {
    const cookieStore = await cookies()
    const userId = cookieStore.get("user_session")?.value
  
    if (!userId) {
      return { error: "Unauthorized" }
    }

    try {
        const today = new Date()
        today.setHours(0, 0, 0, 0)
        
        const record = await db.attendance.findFirst({
            where: {
                userId,
                date: {
                    gte: today
                }
            }
        })

        if (!record) {
            return { error: "No check-in record found for today." }
        }

        if (record.checkOut) {
             return { error: "Already checked out today." }
        }

        const now = new Date()
        const checkInTime = new Date(record.checkIn!)
        const hoursWorked = (now.getTime() - checkInTime.getTime()) / (1000 * 60 * 60)
        
        // Calculate break duration if exists
        let breakDurationMinutes = 0
        if (record.breakStart && record.breakEnd) {
          breakDurationMinutes = (new Date(record.breakEnd).getTime() - new Date(record.breakStart).getTime()) / (1000 * 60)
        }

        await db.attendance.update({
            where: { id: record.id },
            data: {
                checkOut: now,
                totalHours: hoursWorked
            }
        })

        revalidatePath("/dashboard/employee/attendance")
        return { success: "Checked out successfully!" }

    } catch (error) {
        return { error: "Failed to check out." }
    }
}

export async function startBreak() {
  const cookieStore = await cookies()
  const userId = cookieStore.get("user_session")?.value

  if (!userId) {
    return { error: "Unauthorized" }
  }

  try {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    
    const record = await db.attendance.findFirst({
      where: {
        userId,
        date: { gte: today }
      }
    })

    if (!record) {
      return { error: "Please check in first" }
    }

    if (record.breakStart) {
      return { error: "Break already started" }
    }

    await db.attendance.update({
      where: { id: record.id },
      data: { breakStart: new Date() }
    })

    revalidatePath("/dashboard/employee/attendance")
    return { success: "Break started" }
  } catch (error) {
    return { error: "Failed to start break" }
  }
}

export async function endBreak() {
  const cookieStore = await cookies()
  const userId = cookieStore.get("user_session")?.value

  if (!userId) {
    return { error: "Unauthorized" }
  }

  try {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    
    const record = await db.attendance.findFirst({
      where: {
        userId,
        date: { gte: today }
      }
    })

    if (!record || !record.breakStart) {
      return { error: "No active break found" }
    }

    if (record.breakEnd) {
      return { error: "Break already ended" }
    }

    const now = new Date()
    const breakDuration = (now.getTime() - new Date(record.breakStart).getTime()) / (1000 * 60)

    await db.attendance.update({
      where: { id: record.id },
      data: {
        breakEnd: now,
        breakDuration
      }
    })

    revalidatePath("/dashboard/employee/attendance")
    return { success: "Break ended" }
  } catch (error) {
    return { error: "Failed to end break" }
  }
}

export async function getMonthlyAttendance(userId: string, month: number, year: number) {
  try {
    // Get first and last day of the month
    const startDate = new Date(year, month - 1, 1)
    const endDate = new Date(year, month, 0)
    endDate.setHours(23, 59, 59, 999)

    const attendance = await db.attendance.findMany({
      where: {
        userId,
        date: {
          gte: startDate,
          lte: endDate
        }
      },
      orderBy: {
        date: 'asc'
      }
    })

    return attendance
  } catch (error) {
    console.error("Get monthly attendance error:", error)
    return []
  }
}

export async function getCurrentDayAttendance() {
  const cookieStore = await cookies()
  const userId = cookieStore.get("user_session")?.value

  if (!userId) {
    return { error: "Unauthorized" }
  }

  try {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const attendance = await db.attendance.findMany({
      where: {
        date: { gte: today }
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            employeeProfile: {
              select: {
                department: true,
                position: true
              }
            }
          }
        }
      },
      orderBy: {
        checkIn: 'asc'
      }
    })

    return { attendance }
  } catch (error) {
    console.error("Get current day attendance error:", error)
    return { error: "Failed to fetch attendance" }
  }
}

export async function getAttendanceSummary(userId: string, month: number, year: number) {
  try {
    const attendance = await getMonthlyAttendance(userId, month, year)
    
    const presentDays = attendance.filter((a: any) => a.status === 'PRESENT').length
    const lateDays = attendance.filter((a: any) => a.isLate).length
    const totalHours = attendance.reduce((sum: number, a: any) => sum + (a.totalHours || 0), 0)
    const avgHours = presentDays > 0 ? totalHours / presentDays : 0

    // Get leave days for the month
    const startDate = new Date(year, month - 1, 1)
    const endDate = new Date(year, month, 0)
    
    const leaves = await db.leaveRequest.findMany({
      where: {
        userId,
        status: 'APPROVED',
        startDate: { lte: endDate },
        endDate: { gte: startDate }
      }
    })

    const leaveDays = leaves.reduce((total: number, leave: any) => {
      const start = new Date(Math.max(leave.startDate.getTime(), startDate.getTime()))
      const end = new Date(Math.min(leave.endDate.getTime(), endDate.getTime()))
      const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1
      return total + days
    }, 0)

    // Calculate working days (excluding weekends)
    const totalDaysInMonth = new Date(year, month, 0).getDate()
    let workingDays = 0
    for (let day = 1; day <= totalDaysInMonth; day++) {
      const date = new Date(year, month - 1, day)
      const dayOfWeek = date.getDay()
      if (dayOfWeek !== 0 && dayOfWeek !== 6) { // Not Sunday or Saturday
        workingDays++
      }
    }

    const absentDays = workingDays - presentDays - leaveDays

    return {
      presentDays,
      lateDays,
      totalHours: Math.round(totalHours * 100) / 100,
      avgHours: Math.round(avgHours * 100) / 100,
      leaveDays,
      absentDays: Math.max(0, absentDays),
      workingDays
    }
  } catch (error) {
    console.error("Get attendance summary error:", error)
    return {
      presentDays: 0,
      lateDays: 0,
      totalHours: 0,
      avgHours: 0,
      leaveDays: 0,
      absentDays: 0,
      workingDays: 0
    }
  }
}
