"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react"
import { Badge } from "@/components/ui/badge"

type AttendanceRecord = {
    id: string
    date: Date
    checkIn: Date | null
    checkOut: Date | null
    workHours: number | null
    extraHours: number
    status: string
}

interface EmployeeAttendanceViewProps {
    attendanceRecords: AttendanceRecord[]
    userName: string
    stats: {
        daysPresent: number
        latenessCount: number
        totalWorkingDays: number
    }
}

export default function EmployeeAttendanceView({ 
    attendanceRecords, 
    userName,
    stats 
}: EmployeeAttendanceViewProps) {
    const [currentMonth, setCurrentMonth] = useState(new Date())

    const formatTime = (date: Date | null) => {
        if (!date) return "-"
        return new Date(date).toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit',
            hour12: false 
        })
    }

    const formatHours = (hours: number | null) => {
        if (hours === null) return "-"
        const h = Math.floor(hours)
        const m = Math.round((hours - h) * 60)
        return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`
    }

    const navigateMonth = (direction: 'prev' | 'next') => {
        const newDate = new Date(currentMonth)
        newDate.setMonth(newDate.getMonth() + (direction === 'next' ? 1 : -1))
        setCurrentMonth(newDate)
    }

    const getMonthName = () => {
        return currentMonth.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
    }

    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight">My Attendance</h2>
            </div>

            <Tabs defaultValue="attendance" className="space-y-4">
                <TabsList>
                    {/* <TabsTrigger value="company">Company Logo</TabsTrigger> */}
                    <TabsTrigger value="employees">Employees</TabsTrigger>
                    <TabsTrigger value="attendance">Attendances</TabsTrigger>
                    <TabsTrigger value="timeoff">Time Off</TabsTrigger>
                </TabsList>

                <TabsContent value="attendance" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <CardTitle>Attendance Records</CardTitle>
                                <div className="flex items-center space-x-4">
                                    {/* Stats */}
                                    <div className="flex items-center space-x-4 text-sm">
                                        <div className="flex items-center space-x-2">
                                            <span className="text-muted-foreground">Month:</span>
                                            <div className="flex items-center space-x-1">
                                                <Button variant="ghost" size="sm" onClick={() => navigateMonth('prev')}>
                                                    <ChevronLeft className="h-4 w-4" />
                                                </Button>
                                                <span className="font-medium min-w-[80px] text-center">{getMonthName()}</span>
                                                <Button variant="ghost" size="sm" onClick={() => navigateMonth('next')}>
                                                    <ChevronRight className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </div>
                                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                            Days Present: {stats.daysPresent}
                                        </Badge>
                                        <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                                            Late Count: {stats.latenessCount}
                                        </Badge>
                                        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                                            Working Days: {stats.totalWorkingDays}
                                        </Badge>
                                    </div>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Date</TableHead>
                                        <TableHead>Check In</TableHead>
                                        <TableHead>Check Out</TableHead>
                                        <TableHead>Work Hours</TableHead>
                                        <TableHead>Extra Hours</TableHead>
                                        <TableHead>Status</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {attendanceRecords.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={6} className="text-center text-muted-foreground">
                                                No attendance records found for this month
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        attendanceRecords.map((record) => (
                                            <TableRow key={record.id}>
                                                <TableCell className="font-medium">
                                                    {new Date(record.date).toLocaleDateString('en-US', {
                                                        day: '2-digit',
                                                        month: '2-digit',
                                                        year: 'numeric'
                                                    })}
                                                </TableCell>
                                                <TableCell>{formatTime(record.checkIn)}</TableCell>
                                                <TableCell>{formatTime(record.checkOut)}</TableCell>
                                                <TableCell>{formatHours(record.workHours)}</TableCell>
                                                <TableCell>{formatHours(record.extraHours)}</TableCell>
                                                <TableCell>
                                                    <Badge 
                                                        variant={
                                                            record.status === 'PRESENT' ? 'default' :
                                                            record.status === 'LATE' ? 'secondary' :
                                                            record.status === 'ABSENT' ? 'destructive' :
                                                            record.status === 'ON_LEAVE' ? 'outline' :
                                                            'outline'
                                                        }
                                                        className={
                                                            record.status === 'PRESENT' ? 'bg-green-100 text-green-700' :
                                                            record.status === 'LATE' ? 'bg-amber-100 text-amber-700' :
                                                            ''
                                                        }
                                                    >
                                                        {record.status}
                                                    </Badge>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    )}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}
