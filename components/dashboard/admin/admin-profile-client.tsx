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
import { User, EmployeeProfile } from "@prisma/client"

interface AdminProfileClientProps {
    user: User & { employeeProfile: EmployeeProfile | null }
}

export default function AdminProfileClient({ user }: AdminProfileClientProps) {
  return (
      <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-1/3">
              <Card>
                  <CardHeader className="items-center text-center">
                    <Avatar className="h-24 w-24">
                        <AvatarImage src={user.image || undefined} alt={user.name || "Admin"} />
                        <AvatarFallback>{user.name?.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <CardTitle className="mt-4">{user.name}</CardTitle>
                    <CardDescription>{user.employeeProfile?.position || "Administrator"}</CardDescription>
                     <Badge variant="outline" className="mt-2 text-purple-600 border-purple-200 bg-purple-50">{user.role}</Badge>
                  </CardHeader>
                  <CardContent className="space-y-4">
                      <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">User ID</span>
                          <span className="font-medium truncate max-w-[150px]">{user.id}</span>
                      </div>
                       <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Email</span>
                          <span className="font-medium truncate max-w-[150px]">{user.email}</span>
                      </div>
                       <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Joined</span>
                          <span className="font-medium">{new Date(user.createdAt).toLocaleDateString()}</span>
                      </div>
                  </CardContent>
              </Card>
          </div>
          <div className="w-full md:w-2/3">
             <Tabs defaultValue="personal" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="personal">Personal Details</TabsTrigger>
                    <TabsTrigger value="security">Security & Settings</TabsTrigger>
                </TabsList>
                <TabsContent value="personal">
                    <Card>
                    <CardHeader>
                        <CardTitle>Personal Information</CardTitle>
                        <CardDescription>
                        Manage your contact and identity details.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Full Name</Label>
                                <Input id="name" defaultValue={user.name || ""} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email Address</Label>
                                <Input id="email" defaultValue={user.email} disabled />
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="phone">Phone</Label>
                                <Input id="phone" defaultValue={user.employeeProfile?.phone || ""} placeholder="+1..." />
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="dept">Department</Label>
                                <Input id="dept" defaultValue={user.employeeProfile?.department || ""} placeholder="Management" />
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <Button>Save Changes</Button>
                        </div>
                    </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="security">
                    <Card>
                        <CardHeader>
                            <CardTitle>Security Configuration</CardTitle>
                            <CardDescription>Manage your account security and preferences.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label className="text-base">Two-Factor Authentication</Label>
                                        <CardDescription>Enable 2FA for enhanced account security.</CardDescription>
                                    </div>
                                    <Switch defaultChecked />
                                </div>
                                <Separator />
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label className="text-base">System Notifications</Label>
                                        <CardDescription>Get alerts for critical system events.</CardDescription>
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
                                <Button>Update Security Settings</Button>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
          </div>
      </div>
  )
}
