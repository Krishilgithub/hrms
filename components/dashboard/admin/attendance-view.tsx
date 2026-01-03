"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChevronLeft, ChevronRight, Search, Calendar } from "lucide-react"
import { Badge } from "@/components/ui/badge"

type AttendanceRecord = {
    id: string
    userId: string
    employeeName: string
    date: Date
    checkIn: Date | null
    checkOut: Date | null
    workHours: number | null
    extraHours: number
    status: string
}

interface AdminAttendanceViewProps {
    attendanceRecords: AttendanceRecord[]
}

export default function AdminAttendanceView({ attendanceRecords }: AdminAttendanceViewProps) {
    const [searchQuery, setSearchQuery] = useState("")
    const [selectedDate, setSelectedDate] = useState(new Date())

    const filteredRecords = attendanceRecords.filter(record => 
        record.employeeName.toLowerCase().includes(searchQuery.toLowerCase())
    )

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

    const navigateDate = (direction: 'prev' | 'next') => {
        const newDate = new Date(selectedDate)
        newDate.setDate(newDate.getDate() + (direction === 'next' ? 1 : -1))
        setSelectedDate(newDate)
    }

    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight">Attendance Management</h2>
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
                                <CardTitle>Attendance List View</CardTitle>
                                <div className="flex items-center space-x-2">
                                    {/* Search */}
                                    <div className="relative">
                                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            placeholder="Search employees..."
                                            className="pl-8 w-64"
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                        />
                                    </div>
                                    
                                    {/* Date Navigation */}
                                    <div className="flex items-center space-x-2">
                                        <Button variant="outline" size="icon" onClick={() => navigateDate('prev')}>
                                            <ChevronLeft className="h-4 w-4" />
                                        </Button>
                                        <div className="flex items-center space-x-2">
                                            <Calendar className="h-4 w-4 text-muted-foreground" />
                                            <span className="font-medium">
                                                {selectedDate.toLocaleDateString('en-US', { 
                                                    day: '2-digit',
                                                    month: 'long',
                                                    year: 'numeric'
                                                })}
                                            </span>
                                        </div>
                                        <Button variant="outline" size="icon" onClick={() => navigateDate('next')}>
                                            <ChevronRight className="h-4 w-4" />
                                        </Button>
                                    </div>

                                    <Button variant="outline">Day</Button>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Employee</TableHead>
                                        <TableHead>Check In</TableHead>
                                        <TableHead>Check Out</TableHead>
                                        <TableHead>Work Hours</TableHead>
                                        <TableHead>Extra Hours</TableHead>
                                        <TableHead>Status</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredRecords.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={6} className="text-center text-muted-foreground">
                                                No attendance records found
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        filteredRecords.map((record) => (
                                            <TableRow key={record.id}>
                                                <TableCell className="font-medium">{record.employeeName}</TableCell>
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
                                                            'outline'
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
