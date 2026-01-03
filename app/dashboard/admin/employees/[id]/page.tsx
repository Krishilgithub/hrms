import { db } from "@/lib/db"
import { notFound } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Mail, Phone, Calendar, MapPin, Briefcase, DollarSign, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Separator } from "@/components/ui/separator"

export default async function EmployeeDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const employee = await db.user.findUnique({
    where: { id },
    include: {
      employeeProfile: true,
      attendance: {
        take: 10,
        orderBy: { date: 'desc' }
      },
      leaveRequests: {
        take: 5,
        orderBy: { createdAt: 'desc' }
      },
      payrolls: {
        take: 3,
        orderBy: { createdAt: 'desc' }
      }
    }
  })

  if (!employee) {
    notFound()
  }

  return (
    <div className="flex-1 space-y-6 p-8 pt-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/admin/employees">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Employee Details</h2>
            <p className="text-muted-foreground">
              View and manage employee information
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Link href={`/dashboard/admin/employees/${id}/edit`}>
            <Button variant="outline">Edit Employee</Button>
          </Link>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Profile Card */}
        <Card className="md:col-span-1">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4">
              <Avatar className="h-32 w-32">
                <AvatarImage src={employee.image || undefined} alt={employee.name || "Employee"} />
                <AvatarFallback className="text-4xl">
                  {employee.name?.charAt(0) || "E"}
                </AvatarFallback>
              </Avatar>
            </div>
            <CardTitle className="text-2xl">{employee.name}</CardTitle>
            <CardDescription>{employee.employeeProfile?.position || "Employee"}</CardDescription>
            <div className="mt-2">
              <Badge variant={employee.role === "ADMIN" ? "default" : employee.role === "HR" ? "secondary" : "outline"}>
                {employee.role}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground break-all">{employee.email}</span>
              </div>
              {employee.phone && (
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">{employee.phone}</span>
                </div>
              )}
              {employee.employeeProfile?.address && (
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">{employee.employeeProfile.address}</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Details Cards */}
        <div className="md:col-span-2 space-y-6">
          {/* Employment Details */}
          <Card>
            <CardHeader>
              <CardTitle>Employment Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Employee ID</p>
                  <p className="text-sm mt-1">{employee.employeeProfile?.employeeId || employee.loginId || "N/A"}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Department</p>
                  <p className="text-sm mt-1">{employee.employeeProfile?.department || "N/A"}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Position</p>
                  <p className="text-sm mt-1">{employee.employeeProfile?.position || "N/A"}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Joining Date</p>
                  <p className="text-sm mt-1">
                    {employee.employeeProfile?.joiningDate 
                      ? new Date(employee.employeeProfile.joiningDate).toLocaleDateString()
                      : "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Date of Birth</p>
                  <p className="text-sm mt-1">
                    {employee.employeeProfile?.dob 
                      ? new Date(employee.employeeProfile.dob).toLocaleDateString()
                      : "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Basic Salary</p>
                  <p className="text-sm mt-1 flex items-center gap-1">
                    <DollarSign className="h-3 w-3" />
                    {employee.employeeProfile?.basicSalary?.toLocaleString() || "N/A"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Attendance */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Attendance</CardTitle>
              <CardDescription>Last 10 attendance records</CardDescription>
            </CardHeader>
            <CardContent>
              {employee.attendance.length > 0 ? (
                <div className="space-y-2">
                  {employee.attendance.map((record) => (
                    <div key={record.id} className="flex items-center justify-between py-2 border-b last:border-0">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{new Date(record.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-sm text-muted-foreground">
                          {record.checkIn ? new Date(record.checkIn).toLocaleTimeString() : "N/A"} - 
                          {record.checkOut ? new Date(record.checkOut).toLocaleTimeString() : "N/A"}
                        </span>
                        <Badge variant={
                          record.status === "PRESENT" ? "default" :
                          record.status === "ABSENT" ? "destructive" :
                          record.status === "LATE" ? "secondary" : "outline"
                        }>
                          {record.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground text-center py-4">No attendance records found</p>
              )}
            </CardContent>
          </Card>

          {/* Recent Leave Requests */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Leave Requests</CardTitle>
              <CardDescription>Last 5 leave applications</CardDescription>
            </CardHeader>
            <CardContent>
              {employee.leaveRequests.length > 0 ? (
                <div className="space-y-2">
                  {employee.leaveRequests.map((leave) => (
                    <div key={leave.id} className="flex items-center justify-between py-2 border-b last:border-0">
                      <div>
                        <p className="text-sm font-medium">{leave.type} Leave</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(leave.startDate).toLocaleDateString()} - {new Date(leave.endDate).toLocaleDateString()}
                        </p>
                      </div>
                      <Badge variant={
                        leave.status === "APPROVED" ? "default" :
                        leave.status === "REJECTED" ? "destructive" : "secondary"
                      }>
                        {leave.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground text-center py-4">No leave requests found</p>
              )}
            </CardContent>
          </Card>

          {/* Recent Payroll */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Payroll</CardTitle>
              <CardDescription>Last 3 salary records</CardDescription>
            </CardHeader>
            <CardContent>
              {employee.payrolls.length > 0 ? (
                <div className="space-y-2">
                  {employee.payrolls.map((payroll) => (
                    <div key={payroll.id} className="flex items-center justify-between py-2 border-b last:border-0">
                      <div>
                        <p className="text-sm font-medium">{payroll.month} {payroll.year}</p>
                        <p className="text-xs text-muted-foreground">
                          Basic: ${payroll.basicSalary.toLocaleString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold">${payroll.netSalary.toLocaleString()}</p>
                        <Badge variant={
                          payroll.status === "PAID" ? "default" :
                          payroll.status === "PROCESSED" ? "secondary" : "outline"
                        }>
                          {payroll.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground text-center py-4">No payroll records found</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
