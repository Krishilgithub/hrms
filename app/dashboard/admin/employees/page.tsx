import { getEmployees } from "@/actions/admin"
import { AddEmployeeDialog } from "@/components/dashboard/admin/add-employee-dialog"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default async function EmployeesPage() {
    const employees = await getEmployees()

    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Employees</h2>
                <div className="flex items-center space-x-2">
                    <AddEmployeeDialog />
                </div>
            </div>
            
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Role</TableHead>
                            <TableHead>Department</TableHead>
                            <TableHead>Position</TableHead>
                            <TableHead>Joined</TableHead>
                            <TableHead className="text-right">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {employees.map((employee: any) => (
                            <TableRow key={employee.id}>
                                <TableCell className="flex items-center gap-2">
                                     <Avatar className="h-8 w-8">
                                        <AvatarImage src={employee.image || undefined} />
                                        <AvatarFallback>{employee.name?.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <div className="flex flex-col">
                                        <span className="font-medium">{employee.name}</span>
                                        <span className="text-xs text-muted-foreground">{employee.email}</span>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <Badge variant="outline">{employee.role}</Badge>
                                </TableCell>
                                <TableCell>{employee.employeeProfile?.department || "-"}</TableCell>
                                <TableCell>{employee.employeeProfile?.position || "-"}</TableCell>
                                <TableCell>{format(new Date(employee.createdAt), "MMM d, yyyy")}</TableCell>
                                <TableCell className="text-right">
                                    <Link href={`/dashboard/admin/employees/${employee.id}`}>
                                        <Button variant="secondary" size="sm">View</Button>
                                    </Link>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
