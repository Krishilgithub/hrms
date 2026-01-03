
import { Calendar } from "@/components/ui/calendar"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { db } from "@/lib/db"
import { cookies } from "next/headers"
import { AttendanceTimer } from "@/components/dashboard/attendance-timer"

export default async function AttendancePage() {
  const cookieStore = await cookies()
  const userId = cookieStore.get("user_session")?.value

  if (!userId) {
      return <div className="p-8">Please log in to view attendance.</div>
  }

  // Fetch all attendance history
  const history = await db.attendance.findMany({
      where: { userId },
      orderBy: { date: 'desc' },
      take: 30 // Last 30 records
  })

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
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Attendance History</CardTitle>
            <CardDescription>
              View your check-in and check-out times (Last 30 days).
            </CardDescription>
          </CardHeader>
          <CardContent>
             {history.length === 0 ? (
                 <div className="text-center py-8 text-muted-foreground text-sm">No attendance records found.</div>
             ) : (
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Date</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Check In</TableHead>
                            <TableHead>Check Out</TableHead>
                            <TableHead>Total Hours</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {history.map((record) => (
                             <TableRow key={record.id}>
                                <TableCell className="font-medium">{new Date(record.date).toLocaleDateString()}</TableCell>
                                <TableCell>
                                    <Badge variant="outline" className={
                                        record.status === 'PRESENT' ? 'bg-green-50 text-green-700 border-green-200' : 
                                        record.status === 'ABSENT' ? 'bg-red-50 text-red-700 border-red-200' :
                                        'bg-yellow-50 text-yellow-700 border-yellow-200'
                                    }>
                                        {record.status}
                                    </Badge>
                                </TableCell>
                                <TableCell>{record.checkIn ? new Date(record.checkIn).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : '-'}</TableCell>
                                <TableCell>{record.checkOut ? new Date(record.checkOut).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : '-'}</TableCell>
                                <TableCell>{record.totalHours ? `${record.totalHours.toFixed(1)}h` : '-'}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
             )}
          </CardContent>
        </Card>
        <div className="col-span-3 space-y-4">
            <AttendanceTimer todayRecord={todayRecord} />
            <Card>
                <CardHeader>
                   <CardTitle>Calendar</CardTitle>
                </CardHeader>
                 <CardContent>
                     {/* Static calendar for now, could act as a filter later */}
                    <Calendar
                        mode="single"
                        selected={new Date()}
                        className="rounded-md border mx-auto"
                    />
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  )
}
