"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"
import { CheckCircle2, Clock, MapPin, XCircle, AlertCircle, LogOut } from "lucide-react"
import { toast } from "sonner"
import { checkIn, checkOut } from "@/actions/attendance"
import { cn } from "@/lib/utils"

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
    const [date, setDate] = useState<Date | undefined>(new Date())
    const [currentTime, setCurrentTime] = useState(new Date())
    const [isLoading, setIsLoading] = useState(false)

    // Update time every second
    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000)
        return () => clearInterval(timer)
    }, [])

    // Find today's record
    const todayStr = new Date().toDateString()
    const todayRecord = attendanceRecords.find(r => new Date(r.date).toDateString() === todayStr)
    
    // Determine current status
    const isCheckedIn = !!todayRecord?.checkIn && !todayRecord?.checkOut
    const isCheckedOut = !!todayRecord?.checkIn && !!todayRecord?.checkOut
    const isToday = date?.toDateString() === new Date().toDateString()

    const handleCheckIn = async () => {
        setIsLoading(true)
        try {
            const result = await checkIn()
            if (result.error) {
                toast.error(result.error)
            } else {
                toast.success("Checked in successfully!")
            }
        } catch (error) {
            toast.error("Failed to check in")
        } finally {
            setIsLoading(false)
        }
    }

    const handleCheckOut = async () => {
        setIsLoading(true)
        try {
            const result = await checkOut()
            if (result.error) {
                toast.error(result.error)
            } else {
                toast.success("Checked out successfully!")
            }
        } catch (error) {
            toast.error("Failed to check out")
        } finally {
            setIsLoading(false)
        }
    }

    // Process records for calendar modifiers
    const presentDays = attendanceRecords
        .filter(r => r.status === "PRESENT" || r.status === "LATE")
        .map(r => new Date(r.date))
    
    const absentDays = attendanceRecords
        .filter(r => r.status === "ABSENT")
        .map(r => new Date(r.date))

    const selectedRecord = attendanceRecords.find(r => 
        date && new Date(r.date).toDateString() === date.toDateString()
    )

    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Attendance</h2>
                    <p className="text-muted-foreground">Welcome back, {userName}</p>
                </div>
                <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-muted-foreground" />
                    <span className="text-xl font-mono font-medium">
                        {currentTime.toLocaleTimeString()}
                    </span>
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                {/* Check In/Out Section */}
                <Card className="col-span-4 lg:col-span-3">
                    <CardHeader>
                        <CardTitle>Daily Action</CardTitle>
                        <CardDescription>Mark your attendance for today</CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center justify-center space-y-6 py-6">
                        <div className="rounded-full bg-muted/30 p-6 ring-2 ring-primary/10">
                            {isCheckedOut ? (
                                <CheckCircle2 className="h-16 w-16 text-green-500" />
                            ) : isCheckedIn ? (
                                <Clock className="h-16 w-16 text-blue-500 animate-pulse" />
                            ) : (
                                <MapPin className="h-16 w-16 text-muted-foreground" />
                            )}
                        </div>
                        
                        <div className="text-center space-y-1">
                            <h3 className="text-2xl font-bold">
                                {isCheckedOut ? "Completed" : isCheckedIn ? "Checked In" : "Not Checked In"}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                                {format(currentTime, "EEEE, MMMM do, yyyy")}
                            </p>
                            {todayRecord?.checkIn && (
                                <div className="pt-2">
                                    <Badge variant="outline" className="text-xs">
                                        In: {format(new Date(todayRecord.checkIn), "hh:mm a")}
                                    </Badge>
                                    {todayRecord.checkOut && (
                                        <Badge variant="outline" className="ml-2 text-xs">
                                            Out: {format(new Date(todayRecord.checkOut), "hh:mm a")}
                                        </Badge>
                                    )}
                                </div>
                            )}
                        </div>

                        <div className="flex gap-4 w-full max-w-xs">
                            {!isCheckedIn && !isCheckedOut && (
                                <Button 
                                    className="w-full h-12 text-lg" 
                                    onClick={handleCheckIn}
                                    disabled={isLoading}
                                >
                                    Check In
                                </Button>
                            )}
                            
                            {isCheckedIn && !isCheckedOut && (
                                <Button 
                                    variant="destructive" 
                                    className="w-full h-12 text-lg" 
                                    onClick={handleCheckOut}
                                    disabled={isLoading}
                                >
                                    Check Out <LogOut className="ml-2 h-4 w-4" />
                                </Button>
                            )}
                        </div>
                    </CardContent>
                    <CardFooter className="justify-center border-t p-4">
                        <div className="grid grid-cols-3 gap-8 text-center w-full">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Present</p>
                                <p className="text-2xl font-bold">{stats.daysPresent}</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Late</p>
                                <p className="text-2xl font-bold">{stats.latenessCount}</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Total Days</p>
                                <p className="text-2xl font-bold">{stats.totalWorkingDays}</p>
                            </div>
                        </div>
                    </CardFooter>
                </Card>

                {/* Calendar Section */}
                <Card className="col-span-4 border-none shadow-none lg:col-span-4">
                    <div className="grid gap-4 md:grid-cols-2">
                        <Card className="border shadow-none">
                            <CardContent className="p-3">
                                <Calendar
                                    mode="single"
                                    selected={date}
                                    onSelect={setDate}
                                    className="w-full"
                                    modifiers={{
                                        present: presentDays,
                                        absent: absentDays,
                                    }}
                                    modifiersClassNames={{
                                        present: "bg-green-100 text-green-700 font-bold hover:bg-green-200",
                                        absent: "bg-red-100 text-red-700 font-bold hover:bg-red-200",
                                    }}
                                />
                            </CardContent>
                        </Card>

                        <Card className="border shadow-none">
                            <CardHeader>
                                <CardTitle>
                                    {date ? format(date, "MMMM do") : "Select a date"}
                                </CardTitle>
                                <CardDescription>Activity Log</CardDescription>
                            </CardHeader>
                            <CardContent>
                                {selectedRecord ? (
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between rounded-lg border p-3">
                                            <div className="flex items-center gap-2">
                                                <Badge className={cn(
                                                    selectedRecord.status === "PRESENT" ? "bg-green-500" :
                                                    selectedRecord.status === "LATE" ? "bg-amber-500" : "bg-red-500"
                                                )}>
                                                    {selectedRecord.status}
                                                </Badge>
                                            </div>
                                            {selectedRecord.extraHours > 0 && (
                                                <Badge variant="outline">+{selectedRecord.extraHours.toFixed(1)} hrs OT</Badge>
                                            )}
                                        </div>

                                        <div className="space-y-3">
                                            <div className="flex justify-between items-center text-sm">
                                                <span className="text-muted-foreground">Check In</span>
                                                <span className="font-medium font-mono">
                                                    {selectedRecord.checkIn ? format(new Date(selectedRecord.checkIn), "hh:mm a") : "-"}
                                                </span>
                                            </div>
                                            <div className="flex justify-between items-center text-sm">
                                                <span className="text-muted-foreground">Check Out</span>
                                                <span className="font-medium font-mono">
                                                    {selectedRecord.checkOut ? format(new Date(selectedRecord.checkOut), "hh:mm a") : "-"}
                                                </span>
                                            </div>
                                            <div className="flex justify-between items-center text-sm border-t pt-2">
                                                <span className="text-muted-foreground">Work Hours</span>
                                                <span className="font-medium">
                                                    {selectedRecord.workHours ? selectedRecord.workHours.toFixed(2) : "0.00"} hrs
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center justify-center h-40 text-muted-foreground text-sm">
                                        <Calendar className="h-8 w-8 mb-2 opacity-20" />
                                        <p>No activity recorded</p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </Card>
            </div>
        </div>
    )
}
