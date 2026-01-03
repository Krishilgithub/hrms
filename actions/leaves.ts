"use server"

import { db } from "@/lib/db"
import { z } from "zod"
import { cookies } from "next/headers"
import { revalidatePath } from "next/cache"
import { sendEmail } from "@/lib/mail"

const leaveSchema = z.object({
  type: z.enum(["SICK", "CASUAL", "PRIVILEGE", "UNPAID"]),
  startDate: z.string(),
  endDate: z.string(),
  reason: z.string().min(5),
})

export async function applyLeave(values: z.infer<typeof leaveSchema>) {
    const cookieStore = await cookies()
    const userId = cookieStore.get("user_session")?.value
  
    if (!userId) {
      return { error: "Unauthorized" }
    }

    try {
        const { type, startDate, endDate, reason } = values
        
        // Calculate days
        const start = new Date(startDate)
        const end = new Date(endDate)
        const diffTime = Math.abs(end.getTime() - start.getTime())
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1 

        await db.leaveRequest.create({
            data: {
                userId,
                type,
                startDate: start,
                endDate: end,
                reason,
                status: "PENDING",
            }
        })

         // Notify Admin/HR (Optional, mocking for now)
         // In real app, find HR emails and send.

        revalidatePath("/dashboard/employee/leaves")
        return { success: "Leave application submitted successfully!" }
    } catch (error) {
        console.error(error)
        return { error: "Failed to submit leave request." }
    }
}

export async function getLeaves() {
    const cookieStore = await cookies()
    const userId = cookieStore.get("user_session")?.value
  
    if (!userId) {
      return []
    }

    return await db.leaveRequest.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' }
    })
}

export async function approveLeave(leaveId: string) {
    const cookieStore = await cookies()
    const userId = cookieStore.get("user_session")?.value
  
    if (!userId) {
      return { error: "Unauthorized" }
    }

    try {
        const leave = await db.leaveRequest.findUnique({
            where: { id: leaveId },
            include: { user: true }
        })

        if (!leave) {
            return { error: "Leave request not found" }
        }

        await db.leaveRequest.update({
            where: { id: leaveId },
            data: {
                status: "APPROVED",
                approvedBy: userId
            }
        })

        // Send email notification
        if (leave.user.email) {
            await sendEmail(
                leave.user.email,
                "Leave Request Approved",
                `<p>Hi ${leave.user.name},</p><p>Your leave request from ${new Date(leave.startDate).toLocaleDateString()} to ${new Date(leave.endDate).toLocaleDateString()} has been approved.</p>`
            )
        }

        revalidatePath("/dashboard/hr/leaves")
        return { success: "Leave approved successfully!" }
    } catch (error) {
        console.error(error)
        return { error: "Failed to approve leave request." }
    }
}

export async function rejectLeave(leaveId: string) {
    const cookieStore = await cookies()
    const userId = cookieStore.get("user_session")?.value
  
    if (!userId) {
      return { error: "Unauthorized" }
    }

    try {
        const leave = await db.leaveRequest.findUnique({
            where: { id: leaveId },
            include: { user: true }
        })

        if (!leave) {
            return { error: "Leave request not found" }
        }

        await db.leaveRequest.update({
            where: { id: leaveId },
            data: {
                status: "REJECTED",
                approvedBy: userId
            }
        })

        // Send email notification
        if (leave.user.email) {
            await sendEmail(
                leave.user.email,
                "Leave Request Rejected",
                `<p>Hi ${leave.user.name},</p><p>Your leave request from ${new Date(leave.startDate).toLocaleDateString()} to ${new Date(leave.endDate).toLocaleDateString()} has been rejected.</p>`
            )
        }

        revalidatePath("/dashboard/hr/leaves")
        return { success: "Leave rejected." }
    } catch (error) {
        console.error(error)
        return { error: "Failed to reject leave request." }
    }
}
