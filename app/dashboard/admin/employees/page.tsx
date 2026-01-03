import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { db } from "@/lib/db"
import { EmployeeGrid } from "@/components/dashboard/employee-grid"
import { Plus } from "lucide-react"
import Link from "next/link"

export default async function AdminEmployeesPage() {
  // Fetch all employees with their today's attendance
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const employees = await db.user.findMany({
    where: {
      role: { not: "ADMIN" }
    },
    include: {
      employeeProfile: {
        select: {
          position: true,
          department: true
        }
      }
    },
    orderBy: {
      name: 'asc'
    }
  })

  // Fetch today's attendance for all employees
  const todayAttendance = await db.attendance.findMany({
    where: {
      date: { gte: today }
    },
    select: {
      userId: true,
      status: true,
      checkIn: true
    }
  })

  // Create a map of attendance by userId
  const attendanceMap = new Map()
  todayAttendance.forEach(att => {
    attendanceMap.set(att.userId, att)
  })

  // Fetch approved leaves for today
  const todayLeaves = await db.leaveRequest.findMany({
    where: {
      status: 'APPROVED',
      startDate: { lte: today },
      endDate: { gte: today }
    },
    select: {
      userId: true
    }
  })

  const leaveUserIds = new Set(todayLeaves.map(l => l.userId))

  // Combine employees with their attendance status
  const employeesWithStatus = employees.map(emp => ({
    ...emp,
    name: emp.name || "Unknown",
    todayAttendance: leaveUserIds.has(emp.id) 
      ? { status: 'ON_LEAVE', checkIn: null }
      : attendanceMap.get(emp.id)
  }))

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Employees</h2>
          <p className="text-muted-foreground">
            Manage your organization's employees
          </p>
        </div>
        <Button asChild>
          <Link href="/dashboard/admin/employees/new">
            <Plus className="mr-2 h-4 w-4" />
            NEW
          </Link>
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Total Employees</CardDescription>
            <CardTitle className="text-4xl">{employees.length}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Present Today</CardDescription>
            <CardTitle className="text-4xl text-green-600">
              {todayAttendance.filter(a => a.status === 'PRESENT').length}
            </CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>On Leave</CardDescription>
            <CardTitle className="text-4xl text-yellow-600">
              {leaveUserIds.size}
            </CardTitle>
          </CardHeader>
        </Card>
      </div>

      <EmployeeGrid employees={employeesWithStatus} />
    </div>
  )
}
