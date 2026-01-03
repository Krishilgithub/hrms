
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
  Users,
  Briefcase,
  UserPlus,
  Calendar,
} from "lucide-react"
import { db } from "@/lib/db"

export default async function HRDashboardPage() {
    const totalEmployees = await db.user.count({ 
        where: { role: 'EMPLOYEE' } 
    })
    
    // We don't have job postings seeded yet, so this will be 0
    const activeJobs = await db.jobPosting.count({
        where: { status: 'OPEN' }
    })
    
    // Recent pending leaves
    const pendingLeaveCount = await db.leaveRequest.count({
        where: { status: 'PENDING' }
    })
    
    // New Joiners (last 30 days) - Mock logic or real query
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
    
    const newJoiners = await db.employeeProfile.count({
        where: {
            joiningDate: {
                gte: thirtyDaysAgo
            }
        }
    })

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">HR Overview</h2>
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
            <div className="text-2xl font-bold">{totalEmployees}</div>
            <p className="text-xs text-muted-foreground">
              Across all departments
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              New Joiners
            </CardTitle>
            <UserPlus className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+{newJoiners}</div>
            <p className="text-xs text-muted-foreground">
              In the last 30 days
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Job Openings</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeJobs}</div>
            <p className="text-xs text-muted-foreground">
              Active recruitment
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Leave Requests
            </CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingLeaveCount}</div>
            <p className="text-xs text-muted-foreground">
              Pending approval
            </p>
          </CardContent>
        </Card>
      </div>
       <div className="grid gap-4 md:grid-cols-7">
           <Card className="col-span-4">
               <CardHeader>
                   <CardTitle>Recruitment Pipeline</CardTitle>
               </CardHeader>
               <CardContent>
                   <div className="flex items-center justify-center h-[200px] text-muted-foreground">
                       No active recruitment data available.
                   </div>
               </CardContent>
           </Card>
            <Card className="col-span-3">
               <CardHeader>
                   <CardTitle>Department Distribution</CardTitle>
               </CardHeader>
               <CardContent>
                   <div className="flex items-center justify-center h-[200px] text-muted-foreground">
                       Engineering: 80% <br/> HR: 20%
                   </div>
               </CardContent>
           </Card>
       </div>
    </div>
  )
}
