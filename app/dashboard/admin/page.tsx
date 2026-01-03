
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Activity,
  CreditCard,
  DollarSign,
  Users,
} from "lucide-react"
import { getAdminDashboardStats } from "@/actions/admin"
import { format } from "date-fns"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"

export default async function AdminDashboardPage() {
  const stats = await getAdminDashboardStats()
  
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Admin Dashboard</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Employees
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalEmployees}</div>
            <p className="text-xs text-muted-foreground">
              + {stats.hrCount} HR Managers
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Pending Leaves
            </CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pendingLeaves}</div>
            <p className="text-xs text-muted-foreground">
              Requires attention
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Attendance Today
            </CardTitle>
             <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.attendanceStats.percentage}%</div>
            <p className="text-xs text-muted-foreground">
               {stats.attendanceStats.present} / {stats.attendanceStats.total} Present
            </p>
          </CardContent>
        </Card>
         <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Current Payroll
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats.totalPayroll.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              For this month
            </p>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Recent Leave Requests</CardTitle>
          </CardHeader>
          <CardContent>
             <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Employee</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Dates</TableHead>
                        <TableHead className="text-right">Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {stats.recentLeaves.length === 0 ? (
                        <TableRow>
                             <TableCell colSpan={4} className="text-center text-muted-foreground">No recent requests</TableCell>
                        </TableRow>
                    ) : (
                        stats.recentLeaves.map((leave: any) => (
                            <TableRow key={leave.id}>
                                <TableCell className="flex items-center gap-2">
                                     <Avatar className="h-8 w-8">
                                        <AvatarImage src={leave.user.image || undefined} />
                                        <AvatarFallback>{leave.user.name?.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <div className="flex flex-col">
                                        <span className="font-medium">{leave.user.name}</span>
                                        <span className="text-xs text-muted-foreground">{leave.user.email}</span>
                                    </div>
                                </TableCell>
                                <TableCell className="capitalize">{leave.type.toLowerCase()}</TableCell>
                                <TableCell>
                                    {format(new Date(leave.startDate), "MMM d")} - {format(new Date(leave.endDate), "MMM d")}
                                </TableCell>
                                 <TableCell className="text-right">
                                    <Badge variant={leave.status === 'PENDING' ? 'outline' : 'secondary'} className={
                                         leave.status === 'APPROVED' ? 'bg-green-100 text-green-800' : 
                                         leave.status === 'REJECTED' ? 'bg-red-100 text-red-800' : 
                                         'bg-yellow-100 text-yellow-800'
                                    }>
                                        {leave.status}
                                    </Badge>
                                 </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
             </Table>
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
             <div className="flex flex-col gap-2">
                <Link href="/dashboard/admin/employees/new">
                  <div className="p-4 border rounded-lg bg-background hover:bg-muted/50 cursor-pointer transition-colors">
                      <div className="font-medium">Add New Employee</div>
                      <div className="text-sm text-muted-foreground">Create a new user account</div>
                  </div>
                </Link>
                <Link href="/dashboard/admin/payroll">
                  <div className="p-4 border rounded-lg bg-background hover:bg-muted/50 cursor-pointer transition-colors">
                      <div className="font-medium">Run Payroll</div>
                      <div className="text-sm text-muted-foreground">Process salaries for {new Date().toLocaleString('default', { month: 'long' })}</div>
                  </div>
                </Link>
                <Link href="/dashboard/admin/documents">
                  <div className="p-4 border rounded-lg bg-background hover:bg-muted/50 cursor-pointer transition-colors">
                      <div className="font-medium">Review Documents</div>
                      <div className="text-sm text-muted-foreground">Verify pending uploads</div>
                  </div>
                </Link>
             </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
