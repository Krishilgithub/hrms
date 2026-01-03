import { db } from "@/lib/db"
import { notFound } from "next/navigation"
import { EditEmployeeForm } from "@/components/dashboard/admin/edit-employee-form"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default async function EditEmployeePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  
  const employee = await db.user.findUnique({
    where: { id },
    include: {
      employeeProfile: true,
    }
  })

  if (!employee) {
    notFound()
  }

  return (
    <div className="flex-1 space-y-6 p-8 pt-6">
      <div className="flex items-center gap-4">
        <Link href={`/dashboard/admin/employees/${id}`}>
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Edit Employee</h2>
          <p className="text-muted-foreground">
            Update employee information and salary details
          </p>
        </div>
      </div>

      <EditEmployeeForm employee={employee} />
    </div>
  )
}
