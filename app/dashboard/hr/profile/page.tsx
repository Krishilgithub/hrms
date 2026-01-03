"use client"

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
import { Switch } from "@/components/ui/switch"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"

export default function HRProfilePage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
       <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">HR Profile</h2>
      </div>
      <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-1/3">
              <Card>
                  <CardHeader className="items-center text-center">
                    <Avatar className="h-24 w-24">
                        <AvatarImage src="/avatars/hr.png" alt="@hr" />
                        <AvatarFallback>HR</AvatarFallback>
                    </Avatar>
                    <CardTitle className="mt-4">Sarah Jenkins</CardTitle>
                    <CardDescription>HR Manager</CardDescription>
                     <Badge variant="outline" className="mt-2 text-blue-600 border-blue-200 bg-blue-50">Active</Badge>
                  </CardHeader>
                  <CardContent className="space-y-4">
                      <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Employee ID</span>
                          <span className="font-medium">HR-101</span>
                      </div>
                       <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Department</span>
                          <span className="font-medium">Human Resources</span>
                      </div>
                       <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Joining Date</span>
                          <span className="font-medium">Mar 15, 2022</span>
                      </div>
                       <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Location</span>
                          <span className="font-medium">New York, USA</span>
                      </div>
                  </CardContent>
              </Card>
          </div>
          <div className="w-full md:w-2/3">
             <Tabs defaultValue="personal" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="personal">Personal</TabsTrigger>
                    <TabsTrigger value="settings">Settings</TabsTrigger>
                </TabsList>
                <TabsContent value="personal">
                    <Card>
                    <CardHeader>
                        <CardTitle>Personal Information</CardTitle>
                        <CardDescription>
                        Manage your personal details.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="phone">Phone Number</Label>
                                <Input id="phone" defaultValue="+1 (555) 789-0123" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email Address</Label>
                                <Input id="email" defaultValue="sarah.j@company.com" disabled />
                            </div>
                        </div>
                        <div className="space-y-2">
                             <Label htmlFor="address">Address</Label>
                             <Input id="address" defaultValue="456 Park Ave, New York, NY 10022" />
                        </div>
                    </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="settings">
                    <Card>
                        <CardHeader>
                            <CardTitle>Account Settings</CardTitle>
                            <CardDescription>Manage password and notifications.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label className="text-base">Email Notifications</Label>
                                        <CardDescription>Receive updates on leave requests and payroll.</CardDescription>
                                    </div>
                                    <Switch defaultChecked />
                                </div>
                                <Separator />
                                <div className="space-y-2">
                                     <Label htmlFor="current-password">Current Password</Label>
                                    <Input id="current-password" type="password" />
                                </div>
                                 <div className="space-y-2">
                                     <Label htmlFor="new-password">New Password</Label>
                                    <Input id="new-password" type="password" />
                                </div>
                                <Button>Update Password</Button>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
          </div>
      </div>
    </div>
  )
}
