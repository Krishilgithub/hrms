import { db } from "@/lib/db"
import { notFound } from "next/navigation"
<<<<<<< HEAD
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Mail, Phone, MapPin, Building, User, Calendar } from "lucide-react"
import Link from "next/link"
import { format } from "date-fns"
import { SalaryConfig } from "@/components/admin/salary-config"

export default async function EmployeeDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  
  const employee = await db.user.findUnique({
    where: { id },
    include: {
      employeeProfile: true
=======
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
>>>>>>> origin/feature/auth-and-employee-updates
    }
  })

  if (!employee) {
    notFound()
  }

  return (
<<<<<<< HEAD
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/dashboard/admin/employees">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Employee Profile</h2>
          <p className="text-muted-foreground">View employee details and information</p>
        </div>
      </div>

      {/* Header Card with Basic Info */}
      <Card>
        <CardHeader>
          <div className="flex items-start gap-6">
            <Avatar className="h-24 w-24 ring-2 ring-offset-2 ring-muted">
              <AvatarImage src={employee.image || ""} alt={employee.name || ""} />
              <AvatarFallback className="text-2xl">
                {employee.name?.split(" ").map(n => n[0]).join("").toUpperCase()}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1 space-y-4">
              <div>
                <h3 className="text-2xl font-bold">{employee.name}</h3>
                <p className="text-muted-foreground">{employee.employeeProfile?.position || "Employee"}</p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Email</p>
                    <p className="text-sm font-medium">{employee.email}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Mobile</p>
                    <p className="text-sm font-medium">{employee.employeeProfile?.phone || "N/A"}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Building className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Company</p>
                    <p className="text-sm font-medium">{employee.employeeProfile?.company || "N/A"}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Employee ID</p>
                    <p className="text-sm font-medium">{employee.employeeProfile?.employeeId || "N/A"}</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground">Department</p>
                  <Badge variant="outline">{employee.employeeProfile?.department || "N/A"}</Badge>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Manager</p>
                  <p className="text-sm font-medium">{employee.employeeProfile?.manager || "N/A"}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Location</p>
                  <p className="text-sm font-medium">{employee.employeeProfile?.location || "N/A"}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Role</p>
                  <Badge>{employee.role}</Badge>
                </div>
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Detailed Information Tabs */}
      <Tabs defaultValue="personal" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="personal">Personal Info</TabsTrigger>
          <TabsTrigger value="employment">Employment</TabsTrigger>
          <TabsTrigger value="salary">Salary Info</TabsTrigger>
          <TabsTrigger value="bank">Bank Details</TabsTrigger>
          <TabsTrigger value="about">About</TabsTrigger>
        </TabsList>

        {/* Personal Information Tab */}
        <TabsContent value="personal">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Employee's personal details</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <Label className="text-muted-foreground">Full Name</Label>
                  <p className="font-medium">{employee.name}</p>
                </div>
                
                <div className="space-y-1">
                  <Label className="text-muted-foreground">Date of Birth</Label>
                  <p className="font-medium">
                    {employee.employeeProfile?.dob 
                      ? format(new Date(employee.employeeProfile.dob), "MMM dd, yyyy")
                      : "N/A"}
                  </p>
                </div>

                <div className="space-y-1">
                  <Label className="text-muted-foreground">Gender</Label>
                  <p className="font-medium">{employee.employeeProfile?.gender || "N/A"}</p>
                </div>

                <div className="space-y-1">
                  <Label className="text-muted-foreground">Marital Status</Label>
                  <p className="font-medium">{employee.employeeProfile?.maritalStatus || "N/A"}</p>
                </div>

                <div className="space-y-1">
                  <Label className="text-muted-foreground">Nationality</Label>
                  <p className="font-medium">{employee.employeeProfile?.nationality || "N/A"}</p>
                </div>

                <div className="space-y-1">
                  <Label className="text-muted-foreground">Personal Email</Label>
                  <p className="font-medium">{employee.employeeProfile?.personalEmail || "N/A"}</p>
                </div>

                <div className="space-y-1 md:col-span-2">
                  <Label className="text-muted-foreground">Address</Label>
                  <p className="font-medium">{employee.employeeProfile?.address || "N/A"}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Employment Information Tab */}
        <TabsContent value="employment">
          <Card>
            <CardHeader>
              <CardTitle>Employment Details</CardTitle>
              <CardDescription>Work-related information</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <Label className="text-muted-foreground">Employee ID</Label>
                  <p className="font-medium font-mono">{employee.employeeProfile?.employeeId || "N/A"}</p>
                </div>

                <div className="space-y-1">
                  <Label className="text-muted-foreground">Joining Date</Label>
                  <p className="font-medium">
                    {employee.employeeProfile?.joiningDate 
                      ? format(new Date(employee.employeeProfile.joiningDate), "MMM dd, yyyy")
                      : "N/A"}
                  </p>
                </div>

                <div className="space-y-1">
                  <Label className="text-muted-foreground">Department</Label>
                  <p className="font-medium">{employee.employeeProfile?.department || "N/A"}</p>
                </div>

                <div className="space-y-1">
                  <Label className="text-muted-foreground">Position</Label>
                  <p className="font-medium">{employee.employeeProfile?.position || "N/A"}</p>
                </div>

                <div className="space-y-1">
                  <Label className="text-muted-foreground">Manager</Label>
                  <p className="font-medium">{employee.employeeProfile?.manager || "N/A"}</p>
                </div>

                <div className="space-y-1">
                  <Label className="text-muted-foreground">Work Location</Label>
                  <p className="font-medium">{employee.employeeProfile?.location || "N/A"}</p>
                </div>

                <div className="space-y-1">
                  <Label className="text-muted-foreground">Basic Salary</Label>
                  <p className="font-medium">${employee.employeeProfile?.basicSalary?.toLocaleString() || "N/A"}</p>
                </div>

                <div className="space-y-1">
                  <Label className="text-muted-foreground">Account Status</Label>
                  <Badge variant={employee.role !== "EMPLOYEE" ? "default" : "secondary"}>
                    {employee.role}
                  </Badge>
=======
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
>>>>>>> origin/feature/auth-and-employee-updates
                </div>
              </div>
            </CardContent>
          </Card>
<<<<<<< HEAD
        </TabsContent>

        {/* Salary Information Tab - Admin Only */}
        <TabsContent value="salary">
          <Card>
            <CardHeader>
              <CardTitle>Salary Configuration</CardTitle>
              <CardDescription>Configure employee salary structure and components (Admin Only)</CardDescription>
            </CardHeader>
            <CardContent>
              <SalaryConfig userId={employee.id} initialData={employee.employeeProfile} />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Bank Details Tab */}
        <TabsContent value="bank">
          <Card>
            <CardHeader>
              <CardTitle>Bank & Salary Information</CardTitle>
              <CardDescription>Financial and payroll details</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <Label className="text-muted-foreground">Account Number</Label>
                  <p className="font-medium font-mono">{employee.employeeProfile?.accountNumber || "N/A"}</p>
                </div>

                <div className="space-y-1">
                  <Label className="text-muted-foreground">Bank Name</Label>
                  <p className="font-medium">{employee.employeeProfile?.bankName || "N/A"}</p>
                </div>

                <div className="space-y-1">
                  <Label className="text-muted-foreground">IFSC Code</Label>
                  <p className="font-medium font-mono">{employee.employeeProfile?.ifscCode || "N/A"}</p>
                </div>

                <div className="space-y-1">
                  <Label className="text-muted-foreground">PAN Number</Label>
                  <p className="font-medium font-mono">{employee.employeeProfile?.panNo || "N/A"}</p>
                </div>

                <div className="space-y-1">
                  <Label className="text-muted-foreground">UAN Number</Label>
                  <p className="font-medium font-mono">{employee.employeeProfile?.uanNo || "N/A"}</p>
                </div>

                <div className="space-y-1">
                  <Label className="text-muted-foreground">Employee Code</Label>
                  <p className="font-medium font-mono">{employee.employeeProfile?.empCode || "N/A"}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* About Tab */}
        <TabsContent value="about">
          <div className="grid gap-4">
            <Card>
              <CardHeader>
                <CardTitle>About</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Employee profile information and biography will be displayed here.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Skills</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Employee skills and certifications will be displayed here.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Certifications</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Professional certifications and achievements will be displayed here.
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
=======

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
>>>>>>> origin/feature/auth-and-employee-updates
    </div>
  )
}
