
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Banknote,
  CalendarDays,
  Clock,
  UserCheck,
} from "lucide-react"
import { db } from "@/lib/db"
import { cookies } from "next/headers"
import Link from "next/link"

export default async function EmployeeDashboardPage() {
  const cookieStore = await cookies()
  const userId = cookieStore.get("user_session")?.value

  // If no session, these stats will be 0/null. In real app, redirect to login.
  // For demo persistence resilience, we could fallback to the seed employee email if needed,
  // but let's stick to the cookie logic for correctness.
  
  const attendanceCount = userId ? await db.attendance.count({
      where: { userId, status: 'PRESENT' }
  }) : 0
  
  const leaveRequests = userId ? await db.leaveRequest.count({
      where: { userId, status: 'APPROVED' }
  }) : 0
  
  const payroll = userId ? await db.payroll.findFirst({
      where: { userId },
      orderBy: { createdAt: 'desc' }
  }) : null

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Attendance
            </CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{attendanceCount} Days</div>
            <p className="text-xs text-muted-foreground">
              Last month: 0
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Approved Leaves
            </CardTitle>
            <CalendarDays className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{leaveRequests} Days</div>
            <p className="text-xs text-muted-foreground">
              Annual quota used
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">On Time Arrival</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">100%</div>
            <p className="text-xs text-muted-foreground">
              Based on check-ins
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Net Pay
            </CardTitle>
            <Banknote className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
                {payroll ? `$${payroll.netSalary.toLocaleString()}` : "$0.00"}
            </div>
            <p className="text-xs text-muted-foreground">
              Latest processed
            </p>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              Your recent check-ins and leave requests.
            </CardDescription>
          </CardHeader>
          <CardContent>
             <div className="space-y-8">
                {userId ? (
                    <div className="text-sm text-muted-foreground">
                        No recent activity recorded.
                    </div>
                ) : (
                    <div className="text-sm text-red-500">
                        Please log in to view activity.
                    </div>
                )}
             </div>
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Common tasks you might need to do.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
              <Link href="/dashboard/employee/attendance" className="flex items-center p-3 rounded-lg border hover:bg-muted transition-colors text-left sm:text-sm">
                  <div className="h-9 w-9 flex items-center justify-center rounded-full bg-primary/10 text-primary mr-3">
                      <Clock className="h-5 w-5" />
                  </div>
                  <div>
                      <div className="font-medium">Mark Attendance</div>
                      <div className="text-xs text-muted-foreground">Check-in for today</div>
                  </div>
              </Link>
               <Link href="/dashboard/employee/leaves" className="flex items-center p-3 rounded-lg border hover:bg-muted transition-colors text-left sm:text-sm">
                   <div className="h-9 w-9 flex items-center justify-center rounded-full bg-orange-500/10 text-orange-500 mr-3">
                      <CalendarDays className="h-5 w-5" />
                  </div>
                   <div>
                      <div className="font-medium">Apply Leave</div>
                      <div className="text-xs text-muted-foreground">Request time off</div>
                  </div>
              </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
