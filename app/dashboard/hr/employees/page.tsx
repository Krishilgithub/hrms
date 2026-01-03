
import { db } from "@/lib/db"
import EmployeesClient from "@/components/dashboard/hr/employees-client"

export default async function HREmployeesPage() {
  const users = await db.user.findMany({
      include: {
          employeeProfile: true
      },
      orderBy: {
          name: 'asc'
      }
  })

  const formattedUsers = users.map((user: { id: string; name: string | null; email: string; role: "ADMIN" | "HR" | "EMPLOYEE"; employeeProfile: { department: string | null } | null }) => ({
      id: user.id || "",
      name: user.name,
      email: user.email,
      role: user.role, // Assuming Prisma enum matches the type
      department: user.employeeProfile?.department || "Unassigned",
  }))

  return <EmployeesClient data={formattedUsers} />
}
