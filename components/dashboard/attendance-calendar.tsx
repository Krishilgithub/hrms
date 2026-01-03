"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useState } from "react"

type AttendanceRecord = {
  id: string
  date: Date
  status: string
  checkIn: Date | null
  checkOut: Date | null
  totalHours: number | null
  isLate: boolean
  lateBy: number | null
  breakDuration: number | null
}

type AttendanceCalendarProps = {
  attendance: AttendanceRecord[]
  summary: {
    presentDays: number
    lateDays: number
    totalHours: number
    avgHours: number
    leaveDays: number
    absentDays: number
    workingDays: number
  }
}

export function AttendanceCalendar({ attendance, summary }: AttendanceCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth())
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear())

  const firstDay = new Date(currentYear, currentMonth, 1)
  const lastDay = new Date(currentYear, currentMonth + 1, 0)
  const daysInMonth = lastDay.getDate()
  const startingDayOfWeek = firstDay.getDay()

  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ]

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  // Create a map of attendance by date
  const attendanceMap = new Map()
  attendance.forEach((record) => {
    const dateKey = new Date(record.date).toDateString()
    attendanceMap.set(dateKey, record)
  })

  const getStatusColor = (status: string, isLate: boolean) => {
    if (isLate) return "bg-orange-100 text-orange-800 border-orange-300"
    switch (status) {
      case "PRESENT": return "bg-green-100 text-green-800 border-green-300"
      case "ABSENT": return "bg-red-100 text-red-800 border-red-300"
      case "ON_LEAVE": return "bg-yellow-100 text-yellow-800 border-yellow-300"
      default: return "bg-gray-100 text-gray-800 border-gray-300"
    }
  }

  const getStatusLabel = (status: string, isLate: boolean) => {
    if (isLate) return "Late"
    switch (status) {
      case "PRESENT": return "P"
      case "ABSENT": return "A"
      case "ON_LEAVE": return "L"
      default: return "-"
    }
  }

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11)
      setCurrentYear(currentYear - 1)
    } else {
      setCurrentMonth(currentMonth - 1)
    }
  }

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0)
      setCurrentYear(currentYear + 1)
    } else {
      setCurrentMonth(currentMonth + 1)
    }
  }

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Present Days</CardDescription>
            <CardTitle className="text-3xl text-green-600">{summary.presentDays}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Hours</CardDescription>
            <CardTitle className="text-3xl">{summary.totalHours}h</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Avg Hours/Day</CardDescription>
            <CardTitle className="text-3xl">{summary.avgHours}h</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Late Days</CardDescription>
            <CardTitle className="text-3xl text-orange-600">{summary.lateDays}</CardTitle>
          </CardHeader>
        </Card>
      </div>

      {/* Calendar */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Attendance Calendar</CardTitle>
              <CardDescription>Your monthly attendance record</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" onClick={handlePrevMonth}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="text-sm font-medium min-w-[140px] text-center">
                {monthNames[currentMonth]} {currentYear}
              </span>
              <Button variant="outline" size="icon" onClick={handleNextMonth}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-2">
            {/* Day Headers */}
            {dayNames.map((day) => (
              <div key={day} className="text-center text-sm font-medium text-muted-foreground py-2">
                {day}
              </div>
            ))}

            {/* Empty cells for days before month starts */}
            {Array.from({ length: startingDayOfWeek }).map((_, index) => (
              <div key={`empty-${index}`} className="aspect-square" />
            ))}

            {/* Calendar days */}
            {Array.from({ length: daysInMonth }).map((_, index) => {
              const day = index + 1
              const date = new Date(currentYear, currentMonth, day)
              const dateKey = date.toDateString()
              const record = attendanceMap.get(dateKey)
              const isWeekend = date.getDay() === 0 || date.getDay() === 6
              const isToday = date.toDateString() === new Date().toDateString()

              return (
                <div
                  key={day}
                  className={`
                    aspect-square border rounded-lg p-2 flex flex-col gap-1
                    ${isToday ? "border-primary border-2" : "border-border"}
                    ${isWeekend && !record ? "bg-gray-50 dark:bg-gray-900" : ""}
                  `}
                >
                  <div className="text-xs font-medium">{day}</div>
                  {record ? (
                    <div className="flex-1 flex flex-col gap-1">
                      <Badge
                        variant="outline"
                        className={`text-[10px] py-0 px-1 w-fit ${getStatusColor(record.status, record.isLate)}`}
                      >
                        {getStatusLabel(record.status, record.isLate)}
                      </Badge>
                      {record.totalHours !== null && (
                        <span className="text-[10px] text-muted-foreground">
                          {record.totalHours.toFixed(1)}h
                        </span>
                      )}
                      {record.isLate && record.lateBy && (
                        <span className="text-[9px] text-orange-600">
                          +{record.lateBy}m
                        </span>
                      )}
                    </div>
                  ) : (
                    isWeekend && (
                      <Badge variant="outline" className="text-[10px] py-0 px-1 w-fit bg-gray-100">
                        -
                      </Badge>
                    )
                  )}
                </div>
              )
            })}
          </div>

          {/* Legend */}
          <div className="flex flex-wrap gap-4 mt-6 pt-4 border-t">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-green-100 border border-green-300"></div>
              <span className="text-xs text-muted-foreground">Present</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-orange-100 border border-orange-300"></div>
              <span className="text-xs text-muted-foreground">Late</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-red-100 border border-red-300"></div>
              <span className="text-xs text-muted-foreground">Absent</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-yellow-100 border border-yellow-300"></div>
              <span className="text-xs text-muted-foreground">On Leave</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-gray-100 border border-gray-300"></div>
              <span className="text-xs text-muted-foreground">Weekend</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
