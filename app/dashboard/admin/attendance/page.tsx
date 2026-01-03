"use client"

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

export default function AdminAttendancePage() {
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
                 <div className="text-2xl font-bold text-green-600">85/120</div>
             </CardContent>
          </Card>
           <Card>
             <CardHeader className="py-4">
                 <CardTitle className="text-base">Late Arrivals</CardTitle>
             </CardHeader>
             <CardContent>
                 <div className="text-2xl font-bold text-orange-600">12</div>
             </CardContent>
          </Card>
           <Card>
             <CardHeader className="py-4">
                 <CardTitle className="text-base">On Leave</CardTitle>
             </CardHeader>
             <CardContent>
                 <div className="text-2xl font-bold text-blue-600">8</div>
             </CardContent>
          </Card>
      </div>
      <Card>
          <CardHeader>
              <CardTitle>Daily Attendance Log</CardTitle>
              <CardDescription>Real-time check-in updates.</CardDescription>
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
                     <TableRow>
                        <TableCell className="font-medium">Alice Johnson</TableCell>
                        <TableCell>09:02 AM</TableCell>
                         <TableCell><Badge variant="outline" className="text-green-600 bg-green-50 border-green-200">On Time</Badge></TableCell>
                        <TableCell>Office</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className="font-medium">Bob Smith</TableCell>
                        <TableCell>09:45 AM</TableCell>
                         <TableCell><Badge variant="outline" className="text-orange-600 bg-orange-50 border-orange-200">Late</Badge></TableCell>
                        <TableCell>Remote</TableCell>
                    </TableRow>
                     <TableRow>
                        <TableCell className="font-medium">Charlie Brown</TableCell>
                        <TableCell>-</TableCell>
                         <TableCell><Badge variant="destructive">Absent</Badge></TableCell>
                        <TableCell>-</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
          </CardContent>
      </Card>
    </div>
  )
}
