<<<<<<< HEAD
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { db } from "@/lib/db"
import { EmployeeGrid } from "@/components/dashboard/employee-grid"
import { Plus } from "lucide-react"
import Link from "next/link"
=======
import { getEmployees } from "@/actions/admin"
import { AddEmployeeDialog } from "@/components/dashboard/admin/add-employee-dialog"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"
import Link from "next/link"
import { Button } from "@/components/ui/button"
>>>>>>> origin/feature/auth-and-employee-updates

export default async function AdminEmployeesPage() {
  // Fetch all employees with their today's attendance
  const today = new Date()
  today.setHours(0, 0, 0, 0)

<<<<<<< HEAD
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
=======
    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Employees</h2>
                <div className="flex items-center space-x-2">
                    <AddEmployeeDialog />
                </div>
            </div>
            
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Role</TableHead>
                            <TableHead>Department</TableHead>
                            <TableHead>Position</TableHead>
                            <TableHead>Joined</TableHead>
                            <TableHead className="text-right">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {employees.map((employee: any) => (
                            <TableRow key={employee.id}>
                                <TableCell className="flex items-center gap-2">
                                     <Avatar className="h-8 w-8">
                                        <AvatarImage src={employee.image || undefined} />
                                        <AvatarFallback>{employee.name?.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <div className="flex flex-col">
                                        <span className="font-medium">{employee.name}</span>
                                        <span className="text-xs text-muted-foreground">{employee.email}</span>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <Badge variant="outline">{employee.role}</Badge>
                                </TableCell>
                                <TableCell>{employee.employeeProfile?.department || "-"}</TableCell>
                                <TableCell>{employee.employeeProfile?.position || "-"}</TableCell>
                                <TableCell>{format(new Date(employee.createdAt), "MMM d, yyyy")}</TableCell>
                                <TableCell className="text-right">
                                    <Link href={`/dashboard/admin/employees/${employee.id}`}>
                                        <Button variant="secondary" size="sm">View</Button>
                                    </Link>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
>>>>>>> origin/feature/auth-and-employee-updates
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
