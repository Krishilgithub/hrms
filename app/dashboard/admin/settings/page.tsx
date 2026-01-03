"use client"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { toast } from "sonner"

export default function AdminSettingsPage() {
    
  const handleSave = () => {
      toast.success("Settings saved successfully.")
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div className="col-span-2 space-y-4">
            <Card>
                <CardHeader>
                    <CardTitle>Global Configurations</CardTitle>
                    <CardDescription>Manage system-wide settings for the HRMS.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                            <Label className="text-base">Maintenance Mode</Label>
                            <CardDescription>
                                Temporarily disable access for employees.
                            </CardDescription>
                        </div>
                        <Switch />
                    </div>
                     <div className="flex items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                            <Label className="text-base">Allow New Registrations</Label>
                            <CardDescription>
                                Toggle to allow or restrict new employee sign-ups.
                            </CardDescription>
                        </div>
                        <Switch defaultChecked />
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Notifications</CardTitle>
                    <CardDescription>Configure admin alert preferences.</CardDescription>
                </CardHeader>
                 <CardContent className="space-y-4">
                    <div className="flex items-center justify-between space-x-2">
                         <Label htmlFor="email-notifications">Email Alerts for Leave Requests</Label>
                         <Switch id="email-notifications" defaultChecked />
                    </div>
                     <div className="flex items-center justify-between space-x-2">
                         <Label htmlFor="payroll-alerts">Payroll Processing Reminders</Label>
                         <Switch id="payroll-alerts" defaultChecked />
                    </div>
                </CardContent>
                 <CardFooter>
                    <Button onClick={handleSave}>Save Changes</Button>
                </CardFooter>
            </Card>
          </div>
      </div>
    </div>
  )
}
