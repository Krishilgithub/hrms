import { db } from "@/lib/db"
import AdminAttendanceView from "@/components/dashboard/admin/attendance-view"

export default async function AdminAttendancePage() {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    // Get today's attendance with user details
    const attendanceRecords = await db.attendance.findMany({
        where: {
            date: today
        },
        include: {
            user: {
                select: {
                    id: true,
                    name: true
                }
            }
        },
        orderBy: {
            checkIn: 'asc'
        }
    })

    const formattedRecords = attendanceRecords.map(record => ({
        id: record.id,
        userId: record.userId,
        employeeName: record.user.name || "Unknown",
        date: record.date,
        checkIn: record.checkIn,
        checkOut: record.checkOut,
        workHours: record.totalHours,
        extraHours: record.totalHours && record.totalHours > 8 ? record.totalHours - 8 : 0,
        status: record.status
    }))

    return <AdminAttendanceView attendanceRecords={formattedRecords} />
}
