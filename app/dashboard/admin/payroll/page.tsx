import { getAllPayrolls } from "@/actions/admin"
import { ProcessPayrollCard } from "@/components/dashboard/admin/process-payroll-card"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default async function AdminPayrollPage() {
    const payrolls = await getAllPayrolls()

    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Payroll Management</h2>
            </div>
            
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <div className="col-span-2">
                    <ProcessPayrollCard />
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Payroll History</CardTitle>
                </CardHeader>
                <CardContent>
                    {payrolls.length === 0 ? (
                         <div className="text-center py-10 text-muted-foreground">No payroll records found.</div>
                    ) : (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Employee</TableHead>
                                    <TableHead>Month</TableHead>
                                    <TableHead>Basic Salary</TableHead>
                                    <TableHead>Allowances</TableHead>
                                    <TableHead>Deductions</TableHead>
                                    <TableHead>Net Salary</TableHead>
                                    <TableHead>Status</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {payrolls.map((record: any) => (
                                    <TableRow key={record.id}>
                                        <TableCell className="flex items-center gap-2">
                                            <Avatar className="h-8 w-8">
                                                <AvatarImage src={record.user.image || undefined} />
                                                <AvatarFallback>{record.user.name?.charAt(0)}</AvatarFallback>
                                            </Avatar>
                                            <div className="flex flex-col">
                                                <span className="font-medium">{record.user.name}</span>
                                                <span className="text-xs text-muted-foreground">{record.user.email}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>{record.month} {record.year}</TableCell>
                                        <TableCell>${record.basicSalary.toLocaleString()}</TableCell>
                                        <TableCell className="text-green-600">+${record.allowances.toLocaleString()}</TableCell>
                                        <TableCell className="text-red-600">-${record.deductions.toLocaleString()}</TableCell>
                                        <TableCell className="font-bold">${record.netSalary.toLocaleString()}</TableCell>
                                        <TableCell>
                                            <Badge variant={record.status === 'PAID' ? 'default' : 'secondary'} className="bg-green-100 text-green-800">
                                                {record.status}
                                            </Badge>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}
