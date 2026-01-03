"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { checkIn, checkOut } from "@/actions/attendance"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"

interface AttendanceTimerProps {
  todayRecord: {
    checkIn: Date | null
    checkOut: Date | null
  } | null
}

export function AttendanceTimer({ todayRecord }: AttendanceTimerProps) {
  const [currentTime, setCurrentTime] = React.useState(new Date())
  const [isLoading, setIsLoading] = React.useState(false)

  // Update clock every second
  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const handleCheckIn = async () => {
      setIsLoading(true)
      try {
          const res = await checkIn()
          if (res.error) {
              toast.error(res.error)
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
          const res = await checkOut()
          if (res.error) {
              toast.error(res.error)
          } else {
              toast.success("Checked out successfully!")
          }
      } catch (error) {
          toast.error("Failed to check out")
      } finally {
          setIsLoading(false)
      }
  }

  const isCheckedIn = !!todayRecord?.checkIn
  const isCheckedOut = !!todayRecord?.checkOut

  return (
    <Card>
        <CardHeader>
            <CardTitle>Mark Attendance</CardTitle>
            <CardDescription>Today, {currentTime.toDateString()}</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
            <div className="text-center py-4">
                    <div className="text-4xl font-bold font-mono tracking-widest">
                        {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                    </div>
                    <p className="text-muted-foreground text-sm mt-1">Standard Check-in: 09:00 AM</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <Button 
                    onClick={handleCheckIn} 
                    className="w-full bg-green-600 hover:bg-green-700"
                    disabled={isCheckedIn || isLoading}
                >
                    {isLoading && !isCheckedIn ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                    {isCheckedIn ? "Checked In" : "Check In"}
                </Button>
                <Button 
                    onClick={handleCheckOut} 
                    variant="outline" 
                    className="w-full"
                    disabled={!isCheckedIn || isCheckedOut || isLoading}
                >
                     {isLoading && isCheckedIn && !isCheckedOut ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                     {isCheckedOut ? "Checked Out" : "Check Out"}
                </Button>
            </div>
            {todayRecord?.checkIn && (
                 <div className="mt-2 text-center text-sm">
                    <span className="text-muted-foreground mr-2">In:</span>
                    <span className="font-medium">{todayRecord.checkIn.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})}</span>
                    {todayRecord.checkOut && (
                        <>
                             <span className="mx-2 text-muted-foreground">|</span>
                             <span className="text-muted-foreground mr-2">Out:</span>
                             <span className="font-medium">{todayRecord.checkOut.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})}</span>
                        </>
                    )}
                 </div>
            )}
        </CardContent>
    </Card>
  )
}
