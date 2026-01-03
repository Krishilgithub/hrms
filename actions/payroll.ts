"use server"

import { db } from "@/lib/db"
import { cookies } from "next/headers"

export async function getPayroll() {
    const cookieStore = await cookies()
    const userId = cookieStore.get("user_session")?.value
  
    if (!userId) {
      return []
    }

    return await db.payroll.findMany({
        where: { userId },
        orderBy: { month: 'desc' }
    })
}
