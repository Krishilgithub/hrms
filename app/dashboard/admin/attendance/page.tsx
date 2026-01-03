import { getDailyAttendance } from "@/actions/admin"
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default async function AdminAttendancePage() {
  const { records, stats } = await getDailyAttendance()

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Attendance Oversight</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
          <Card>
             <CardHeader className="py-4">
                 <CardTitle className="text-base">Present Today</CardTitle>
             </CardHeader>
             <CardContent>
                 <div className="text-2xl font-bold text-green-600">
                    {stats.present}/{stats.total}
                 </div>
             </CardContent>
          </Card>
           <Card>
             <CardHeader className="py-4">
                 <CardTitle className="text-base">Late Arrivals</CardTitle>
             </CardHeader>
             <CardContent>
                 <div className="text-2xl font-bold text-orange-600">{stats.late}</div>
             </CardContent>
          </Card>
           <Card>
             <CardHeader className="py-4">
                 <CardTitle className="text-base">Absent / On Leave</CardTitle>
             </CardHeader>
             <CardContent>
                 <div className="text-2xl font-bold text-blue-600">{stats.absent}</div>
             </CardContent>
          </Card>
      </div>
      <Card>
          <CardHeader>
              <CardTitle>Daily Attendance Log</CardTitle>
              <CardDescription>Real-time check-in updates.</CardDescription>
          </CardHeader>
          <CardContent>
              {records.length === 0 ? (
                  <div className="text-center py-10 text-muted-foreground">No attendance records for today.</div>
              ) : (
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
                        {records.map((record: any) => (
                             <TableRow key={record.id}>
                                <TableCell className="flex items-center gap-2">
                                     <Avatar className="h-8 w-8">
                                        <AvatarImage src={record.user.image || undefined} />
                                        <AvatarFallback>{record.user.name?.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <span className="font-medium">{record.user.name}</span>
                                </TableCell>
                                <TableCell>
                                    {record.checkIn ? new Date(record.checkIn).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '-'}
                                </TableCell>
                                 <TableCell>
                                     <Badge variant="outline" className={
                                         record.status === 'PRESENT' ? 'text-green-600 bg-green-50 border-green-200' :
                                         record.status === 'LATE' ? 'text-orange-600 bg-orange-50 border-orange-200' :
                                         record.status === 'ABSENT' ? 'text-red-600 bg-red-50 border-red-200' : ''
                                     }>
                                         {record.status}
                                     </Badge>
                                 </TableCell>
                                <TableCell>{record.location || "Office"}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
              )}
          </CardContent>
      </Card>
    </div>
  )
}
