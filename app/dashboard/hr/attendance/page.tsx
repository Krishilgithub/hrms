
import {
  Card,
  CardContent,
  CardDescription,
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
import { Badge } from "@/components/ui/badge"
import { db } from "@/lib/db"

export default async function HRAttendancePage() {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  // Get today's attendance
  const todayAttendance = await db.attendance.findMany({
    where: {
      date: today
    },
    include: {
      user: {
        select: {
          name: true
        }
      }
    },
    orderBy: {
      checkIn: 'asc'
    }
  })

  const totalEmployees = await db.user.count({ where: { role: 'EMPLOYEE' } })
  const presentCount = todayAttendance.filter(a => a.status === 'PRESENT' || a.status === 'LATE').length
  const lateCount = todayAttendance.filter(a => a.status === 'LATE').length
  const onLeaveCount = todayAttendance.filter(a => a.status === 'ON_LEAVE').length

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Attendance Management</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
          <Card>
             <CardHeader className="py-4">
                 <CardTitle className="text-base">Present Today</CardTitle>
             </CardHeader>
             <CardContent>
                 <div className="text-2xl font-bold text-green-600">{presentCount}/{totalEmployees}</div>
             </CardContent>
          </Card>
           <Card>
             <CardHeader className="py-4">
                 <CardTitle className="text-base">Late Arrivals</CardTitle>
             </CardHeader>
             <CardContent>
                 <div className="text-2xl font-bold text-orange-600">{lateCount}</div>
             </CardContent>
          </Card>
           <Card>
             <CardHeader className="py-4">
                 <CardTitle className="text-base">On Leave</CardTitle>
             </CardHeader>
             <CardContent>
                 <div className="text-2xl font-bold text-blue-600">{onLeaveCount}</div>
             </CardContent>
          </Card>
      </div>
      <Card>
          <CardHeader>
              <CardTitle>Daily Attendance Log</CardTitle>
              <CardDescription>Real-time check-in updates for all employees.</CardDescription>
          </CardHeader>
          <CardContent>
              <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Employee</TableHead>
                        <TableHead>Time</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Location</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {todayAttendance.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={4} className="text-center text-muted-foreground">
                          No attendance records for today
                        </TableCell>
                      </TableRow>
                    ) : (
                      todayAttendance.map((record) => (
                        <TableRow key={record.id}>
                            <TableCell className="font-medium">{record.user.name || "Unknown"}</TableCell>
                            <TableCell>{record.checkIn ? new Date(record.checkIn).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) : '-'}</TableCell>
                            <TableCell>
                              <Badge variant={
                                record.status === 'PRESENT' ? 'outline' : 
                                record.status === 'LATE' ? 'outline' :
                                record.status === 'ON_LEAVE' ? 'secondary' :
                                'destructive'
                              } className={
                                record.status === 'PRESENT' ? 'text-green-600 bg-green-50 border-green-200' :
                                record.status === 'LATE' ? 'text-orange-600 bg-orange-50 border-orange-200' :
                                ''
                              }>
                                {record.status === 'PRESENT' ? 'On Time' : record.status}
                              </Badge>
                            </TableCell>
                            <TableCell>{record.location || '-'}</TableCell>
                        </TableRow>
                      ))
                    )}
                </TableBody>
            </Table>
          </CardContent>
      </Card>
    </div>
  )
}
