import { db } from "@/lib/db"
import { cookies } from "next/headers"
import EmployeeAttendanceView from "@/components/dashboard/employee/attendance-view"

export default async function EmployeeAttendancePage() {
    const cookieStore = await cookies()
    const userId = cookieStore.get("user_session")?.value

    if (!userId) {
        return <div>Please log in to view attendance</div>
    }

    const user = await db.user.findUnique({
        where: { id: userId },
        select: { name: true }
    })

    // Get current month's attendance
    const now = new Date()
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0)

    const attendanceRecords = await db.attendance.findMany({
        where: {
            userId,
            date: {
                gte: startOfMonth,
                lte: endOfMonth
            }
        },
        orderBy: {
            date: 'desc'
        }
    })

    const formattedRecords = attendanceRecords.map(record => ({
        id: record.id,
        date: record.date,
        checkIn: record.checkIn,
        checkOut: record.checkOut,
        workHours: record.totalHours,
        extraHours: record.totalHours && record.totalHours > 8 ? record.totalHours - 8 : 0,
        status: record.status
    }))

    // Calculate stats
    const stats = {
        daysPresent: attendanceRecords.filter(r => r.status === 'PRESENT' || r.status === 'LATE').length,
        latenessCount: attendanceRecords.filter(r => r.status === 'LATE').length,
        totalWorkingDays: 22 // This could be calculated based on month
    }

    return (
        <EmployeeAttendanceView 
            attendanceRecords={formattedRecords}
            userName={user?.name || "Employee"}
            stats={stats}
        />
    )
}
