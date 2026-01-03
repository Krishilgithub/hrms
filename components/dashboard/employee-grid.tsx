"use client"

import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Plane } from "lucide-react"

type Employee = {
  id: string
  name: string
  email: string
  image: string | null
  employeeProfile: {
    position?: string | null
    department?: string | null
  } | null
  todayAttendance?: {
    status: string
    checkIn: Date | null
  } | null
}

type EmployeeGridProps = {
  employees: Employee[]
}

export function EmployeeGrid({ employees }: EmployeeGridProps) {
  const getStatusIndicator = (employee: Employee) => {
    const attendance = employee.todayAttendance
    
    if (!attendance) {
      // No attendance = Absent (Yellow)
      return (
        <div className="absolute top-3 right-3 h-3 w-3 rounded-full bg-yellow-500 border-2 border-white shadow-sm" 
             title="Absent" />
      )
    }
    
    if (attendance.status === "ON_LEAVE") {
      // On Leave (Airplane icon)
      return (
        <div className="absolute top-2 right-2 bg-blue-500 p-1.5 rounded-full border-2 border-white shadow-sm" 
             title="On Leave">
          <Plane className="h-3 w-3 text-white" />
        </div>
      )
    }
    
    if (attendance.status === "PRESENT" && attendance.checkIn) {
      // Present (Green)
      return (
        <div className="absolute top-3 right-3 h-3 w-3 rounded-full bg-green-500 border-2 border-white shadow-sm animate-pulse" 
             title="Present" />
      )
    }
    
    // Default absent
    return (
      <div className="absolute top-3 right-3 h-3 w-3 rounded-full bg-yellow-500 border-2 border-white shadow-sm" 
           title="Absent" />
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {employees.map((employee) => (
        <Link key={employee.id} href={`/dashboard/admin/employees/${employee.id}`}>
          <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer relative group">
            {getStatusIndicator(employee)}
            
            <div className="flex flex-col items-center text-center space-y-3">
              <Avatar className="h-20 w-20 ring-2 ring-offset-2 ring-muted group-hover:ring-primary transition-all">
                <AvatarImage src={employee.image || ""} alt={employee.name} />
                <AvatarFallback className="text-lg">
                  {employee.name.split(" ").map(n => n[0]).join("").toUpperCase()}
                </AvatarFallback>
              </Avatar>
              
              <div className="space-y-1">
                <h3 className="font-semibold text-lg">{employee.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {employee.employeeProfile?.position || "Employee"}
                </p>
                {employee.employeeProfile?.department && (
                  <Badge variant="outline" className="text-xs">
                    {employee.employeeProfile.department}
                  </Badge>
                )}
              </div>
            </div>
          </Card>
        </Link>
      ))}
    </div>
  )
}
