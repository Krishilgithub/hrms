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
      await db.attendance.create({
          data: {
              userId,
              date: now,
              checkIn: now,
              status: "PRESENT" 
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
        const checkInTime = new Date(record.checkIn!) // Should exist if record exists
        const hoursWorked = (now.getTime() - checkInTime.getTime()) / (1000 * 60 * 60)

        await db.attendance.update({
            where: { id: record.id },
            data: {
                checkOut: now,
                totalHours: hoursWorked // Store float hours
            }
        })

        revalidatePath("/dashboard/employee/attendance")
        return { success: "Checked out successfully!" }

    } catch (error) {
        return { error: "Failed to check out." }
    }
}
