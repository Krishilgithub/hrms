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
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"

export default function ProfilePage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
       <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Profile</h2>
      </div>
      <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-1/3">
              <Card>
                  <CardHeader className="items-center text-center">
                    <Avatar className="h-24 w-24">
                        <AvatarImage src="/avatars/01.png" alt="@id" />
                        <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <CardTitle className="mt-4">John Doe</CardTitle>
                    <CardDescription>Senior Software Engineer</CardDescription>
                     <Badge variant="outline" className="mt-2 text-green-600 border-green-200 bg-green-50">Active</Badge>
                  </CardHeader>
                  <CardContent className="space-y-4">
                      <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Employee ID</span>
                          <span className="font-medium">EMP-2023-001</span>
                      </div>
                       <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Department</span>
                          <span className="font-medium">Engineering</span>
                      </div>
                       <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Joining Date</span>
                          <span className="font-medium">Jan 10, 2021</span>
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
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="personal">Personal</TabsTrigger>
                    <TabsTrigger value="job">Job Details</TabsTrigger>
                    <TabsTrigger value="documents">Documents</TabsTrigger>
                    <TabsTrigger value="settings">Settings</TabsTrigger>
                </TabsList>
                <TabsContent value="personal">
                    <Card>
                    <CardHeader>
                        <CardTitle>Personal Information</CardTitle>
                        <CardDescription>
                        Manage your personal details here.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="phone">Phone Number</Label>
                                <Input id="phone" defaultValue="+1 (555) 123-4567" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email Address</Label>
                                <Input id="email" defaultValue="john.doe@example.com" disabled />
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="dob">Date of Birth</Label>
                                <Input id="dob" type="date" defaultValue="1995-05-20" />
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="gender">Gender</Label>
                                <Input id="gender" defaultValue="Male" />
                            </div>
                        </div>
                        <div className="space-y-2">
                             <Label htmlFor="address">Address</Label>
                             <Input id="address" defaultValue="123 Main St, Apt 4B, New York, NY 10001" />
                        </div>
                    </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="job">
                    <Card>
                    <CardHeader>
                        <CardTitle>Job Information</CardTitle>
                        <CardDescription>
                        View your employment details.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <h4 className="font-medium mb-1">Position</h4>
                                <p className="text-sm text-muted-foreground">Senior Software Engineer</p>
                            </div>
                             <div>
                                <h4 className="font-medium mb-1">Reports To</h4>
                                <p className="text-sm text-muted-foreground">Michael Scott (CTO)</p>
                            </div>
                             <div>
                                <h4 className="font-medium mb-1">Employment Type</h4>
                                <p className="text-sm text-muted-foreground">Full-Time</p>
                            </div>
                             <div>
                                <h4 className="font-medium mb-1">Work Shift</h4>
                                <p className="text-sm text-muted-foreground">General (9:00 AM - 6:00 PM)</p>
                            </div>
                        </div>
                        <Separator />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                             <div>
                                <h4 className="font-medium mb-1">Current Salary (CTC)</h4>
                                <p className="text-sm text-muted-foreground">$120,000 / Year</p>
                            </div>
                            <div>
                                <h4 className="font-medium mb-1">Bank Account</h4>
                                <p className="text-sm text-muted-foreground">Chase Bank - **** 8899</p>
                            </div>
                        </div>
                    </CardContent>
                    </Card>
                </TabsContent>
                 <TabsContent value="documents">
                    <Card>
                    <CardHeader>
                        <CardTitle>Documents</CardTitle>
                        <CardDescription>
                        Your upload documents.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between border p-4 rounded-lg">
                            <div className="flex items-center gap-4">
                                <div className="h-10 w-10 bg-red-100 text-red-600 rounded flex items-center justify-center font-bold text-xs">PDF</div>
                                <div>
                                    <p className="font-medium text-sm">Employment_Contract.pdf</p>
                                    <p className="text-xs text-muted-foreground">Uploaded on Jan 10, 2021</p>
                                </div>
                            </div>
                            <Button variant="ghost" size="sm">View</Button>
                        </div>
                         <div className="flex items-center justify-between border p-4 rounded-lg">
                            <div className="flex items-center gap-4">
                                <div className="h-10 w-10 bg-blue-100 text-blue-600 rounded flex items-center justify-center font-bold text-xs">Img</div>
                                <div>
                                    <p className="font-medium text-sm">ID_Proof_Passport.jpg</p>
                                    <p className="text-xs text-muted-foreground">Uploaded on Jan 12, 2021</p>
                                </div>
                            </div>
                            <Button variant="ghost" size="sm">View</Button>
                        </div>
                    </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="settings">
                    <Card>
                        <CardHeader>
                            <CardTitle>Account Settings</CardTitle>
                            <CardDescription>Manage your preferences and security.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label className="text-base">Email Notifications</Label>
                                        <CardDescription>Receive emails about leave status updates.</CardDescription>
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
