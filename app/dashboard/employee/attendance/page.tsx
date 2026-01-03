"use client"

import * as React from "react"
import { Calendar } from "@/components/ui/calendar"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { toast } from "sonner"

export default function AttendancePage() {
  const [date, setDate] = React.useState<Date | undefined>(new Date())

  const handleCheckIn = () => {
      toast.success("Successfully Checked In at " + new Date().toLocaleTimeString())
  }
  
  const handleCheckOut = () => {
      toast.success("Successfully Checked Out at " + new Date().toLocaleTimeString())
  }

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
              View your check-in and check-out times.
            </CardDescription>
          </CardHeader>
          <CardContent>
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
                    <TableRow>
                        <TableCell className="font-medium">Oct 24, 2023</TableCell>
                        <TableCell><Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Present</Badge></TableCell>
                        <TableCell>09:00 AM</TableCell>
                        <TableCell>06:00 PM</TableCell>
                        <TableCell>9h 0m</TableCell>
                    </TableRow>
                     <TableRow>
                        <TableCell className="font-medium">Oct 23, 2023</TableCell>
                        <TableCell><Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Present</Badge></TableCell>
                        <TableCell>09:15 AM</TableCell>
                        <TableCell>06:15 PM</TableCell>
                        <TableCell>9h 0m</TableCell>
                    </TableRow>
                     <TableRow>
                        <TableCell className="font-medium">Oct 22, 2023</TableCell>
                        <TableCell><Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Absent</Badge></TableCell>
                        <TableCell>-</TableCell>
                        <TableCell>-</TableCell>
                        <TableCell>-</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
          </CardContent>
        </Card>
        <div className="col-span-3 space-y-4">
            <Card>
                <CardHeader>
                    <CardTitle>Mark Attendance</CardTitle>
                    <CardDescription>Today, {new Date().toDateString()}</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                    <div className="text-center py-4">
                         <div className="text-4xl font-bold font-mono tracking-widest">{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                         <p className="text-muted-foreground text-sm mt-1">Standard Check-in: 09:00 AM</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <Button onClick={handleCheckIn} className="w-full bg-green-600 hover:bg-green-700">Check In</Button>
                        <Button onClick={handleCheckOut} variant="outline" className="w-full">Check Out</Button>
                    </div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                   <CardTitle>Calendar</CardTitle>
                </CardHeader>
                 <CardContent>
                    <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        className="rounded-md border mx-auto"
                    />
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  )
}
