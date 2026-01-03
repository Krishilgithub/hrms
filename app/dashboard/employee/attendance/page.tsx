import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { db } from "@/lib/db"
import { cookies } from "next/headers"
import { AttendanceTimer } from "@/components/dashboard/attendance-timer"
import { AttendanceCalendar } from "@/components/dashboard/attendance-calendar"
import { getMonthlyAttendance, getAttendanceSummary } from "@/actions/attendance"

export default async function AttendancePage() {
  const cookieStore = await cookies()
  const userId = cookieStore.get("user_session")?.value

  if (!userId) {
      return <div className="p-8">Please log in to view attendance.</div>
  }

  // Get current month data
  const now = new Date()
  const currentMonth = now.getMonth() + 1
  const currentYear = now.getFullYear()

  const monthlyAttendance = await getMonthlyAttendance(userId, currentMonth, currentYear)
  const summary = await getAttendanceSummary(userId, currentMonth, currentYear)

  // Check for today's record
  const today = new Date()
  today.setHours(0,0,0,0)
  
  const todayRecord = await db.attendance.findFirst({
      where: {
          userId,
          date: {
              gte: today
          }
      }
  })

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Attendance</h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* Check-in/Check-out Timer */}
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Today's Attendance</CardTitle>
            <CardDescription>
             Mark your attendance for today
            </CardDescription>
          </CardHeader>
          <CardContent>
            <AttendanceTimer record={todayRecord} />
          </CardContent>
        </Card>

        {/* Today's Stats */}
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>This Month Statistics</CardTitle>
            <CardDescription>
              Your attendance summary for {new Date(currentYear, currentMonth - 1).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Working Days</p>
              <p className="text-2xl font-bold">{summary.workingDays}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Present</p>
              <p className="text-2xl font-bold text-green-600">{summary.presentDays}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">On Leave</p>
              <p className="text-2xl font-bold text-yellow-600">{summary.leaveDays}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Absent</p>
              <p className="text-2xl font-bold text-red-600">{summary.absentDays}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Monthly Calendar */}
      <AttendanceCalendar attendance={monthlyAttendance} summary={summary} />
    </div>
  )
}
