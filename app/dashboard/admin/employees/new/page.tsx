"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { toast } from "sonner"
import { createEmployee } from "@/actions/hr"
import { Loader2, Eye, EyeOff, Copy, CheckCircle } from "lucide-react"

export default function NewEmployeePage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [generatedCredentials, setGeneratedCredentials] = useState<{
    employeeId: string
    tempPassword: string
  } | null>(null)
  const [copied, setCopied] = useState<{ [key: string]: boolean }>({})

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    const formData = new FormData(e.currentTarget)
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      role: formData.get("role") as string,
      department: formData.get("department") as string,
      companyName: formData.get("companyName") as string || "Odoo India",
    }

    const result = await createEmployee(data)
    setIsLoading(false)

    if (result.error) {
      toast.error(result.error)
    } else {
      toast.success(result.success)
      if (result.employeeId && result.tempPassword) {
        setGeneratedCredentials({
          employeeId: result.employeeId,
          tempPassword: result.tempPassword
        })
      }
    }
  }

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text)
    setCopied({ ...copied, [key]: true })
    toast.success("Copied to clipboard")
    setTimeout(() => {
      setCopied({ ...copied, [key]: false })
    }, 2000)
  }

  const handleCreateAnother = () => {
    setGeneratedCredentials(null)
    router.refresh()
  }

  if (generatedCredentials) {
    return (
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Employee Created Successfully!</h2>
        </div>

        <Card className="max-w-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-6 w-6 text-green-600" />
              Login Credentials Generated
            </CardTitle>
            <CardDescription>
              Please save these credentials securely. They have been sent to the employee's email.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Employee ID</Label>
              <div className="flex gap-2">
                <Input 
                  value={generatedCredentials.employeeId} 
                  readOnly 
                  className="font-mono"
                />
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => copyToClipboard(generatedCredentials.employeeId, 'id')}
                >
                  {copied.id ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Temporary Password</Label>
              <div className="flex gap-2">
                <Input 
                  value={generatedCredentials.tempPassword} 
                  readOnly 
                  className="font-mono"
                />
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => copyToClipboard(generatedCredentials.tempPassword, 'password')}
                >
                  {copied.password ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800">
              <p className="text-sm text-yellow-800 dark:text-yellow-200">
                <strong>⚠️ Important:</strong> The employee should change their password upon first login for security.
              </p>
            </div>

            <div className="flex gap-3 pt-4">
              <Button onClick={handleCreateAnother} className="flex-1">
                Create Another Employee
              </Button>
              <Button 
                variant="outline" 
                onClick={() => router.push('/dashboard/admin/employees')}
                className="flex-1"
              >
                View All Employees
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Create New Employee</h2>
          <p className="text-muted-foreground">
            Employee ID and password will be auto-generated
          </p>
        </div>
      </div>

      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>Employee Information</CardTitle>
          <CardDescription>
            Fill in the employee details. Login credentials will be automatically generated and sent via email.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="companyName">Company Name</Label>
              <Input
                id="companyName"
                name="companyName"
                placeholder="e.g., Odoo India"
                defaultValue="Odoo India"
                required
              />
              <p className="text-xs text-muted-foreground">
                Used to generate employee ID (company initials)
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                name="name"
                placeholder="e.g., John Doe"
                required
              />
              <p className="text-xs text-muted-foreground">
                Used to generate employee ID (name initials)
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="employee@company.com"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="role">Role *</Label>
                <Select name="role" required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="EMPLOYEE">Employee</SelectItem>
                    <SelectItem value="HR">HR Officer</SelectItem>
                    <SelectItem value="ADMIN">Administrator</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="department">Department *</Label>
                <Input
                  id="department"
                  name="department"
                  placeholder="e.g., Engineering"
                  required
                />
              </div>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
              <p className="text-sm text-blue-800 dark:text-blue-200">
                <strong>ℹ️ Auto-Generation:</strong> Employee ID will be generated in format: 
                <code className="ml-1 bg-white dark:bg-gray-800 px-2 py-0.5 rounded">
                  {"{CompanyInitials}{NameInitials}{Year}{Serial}"}
                </code>
              </p>
              <p className="text-xs text-blue-700 dark:text-blue-300 mt-1">
                Example: OI2D20230001 (Odoo India + John Doe + 2023 + 0001)
              </p>
            </div>

            <div className="flex gap-3 pt-4">
              <Button type="submit" disabled={isLoading} className="flex-1">
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Create Employee
              </Button>
              <Button 
                type="button"
                variant="outline" 
                onClick={() => router.back()}
                disabled={isLoading}
              >
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
