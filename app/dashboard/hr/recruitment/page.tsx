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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Briefcase, MapPin, DollarSign, UploadCloud } from "lucide-react"

export default function HRRecruitmentPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Recruitment</h2>
      </div>
      
      <Tabs defaultValue="openings" className="space-y-4">
        <TabsList>
          <TabsTrigger value="openings">Job Openings</TabsTrigger>
          <TabsTrigger value="candidates">Candidates</TabsTrigger>
          <TabsTrigger value="new-job">Post New Job</TabsTrigger>
        </TabsList>
        <TabsContent value="openings" className="space-y-4">
             <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex justify-between">
                            Senior Frontend Developer
                            <span className="text-xs font-normal px-2 py-1 bg-green-100 text-green-700 rounded-full">Active</span>
                        </CardTitle>
                        <CardDescription>Engineering • Full-time</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col gap-2 text-sm text-muted-foreground">
                            <div className="flex items-center"><MapPin className="mr-2 h-4 w-4"/> Remote / New York</div>
                            <div className="flex items-center"><DollarSign className="mr-2 h-4 w-4"/> $120k - $150k</div>
                            <div className="mt-2 text-foreground font-medium">12 Applicants</div>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button variant="outline" className="w-full">View Details</Button>
                    </CardFooter>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle className="flex justify-between">
                            Product Designer
                            <span className="text-xs font-normal px-2 py-1 bg-green-100 text-green-700 rounded-full">Active</span>
                        </CardTitle>
                        <CardDescription>Design • Full-time</CardDescription>
                    </CardHeader>
                     <CardContent>
                        <div className="flex flex-col gap-2 text-sm text-muted-foreground">
                            <div className="flex items-center"><MapPin className="mr-2 h-4 w-4"/> San Francisco</div>
                            <div className="flex items-center"><DollarSign className="mr-2 h-4 w-4"/> $100k - $130k</div>
                            <div className="mt-2 text-foreground font-medium">8 Applicants</div>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button variant="outline" className="w-full">View Details</Button>
                    </CardFooter>
                </Card>
                <Card className="opacity-70 border-dashed">
                    <CardHeader>
                        <CardTitle className="flex justify-between">
                            Marketing Intern
                            <span className="text-xs font-normal px-2 py-1 bg-gray-100 text-gray-700 rounded-full">Closed</span>
                        </CardTitle>
                        <CardDescription>Marketing • Internship</CardDescription>
                    </CardHeader>
                     <CardContent>
                        <div className="flex flex-col gap-2 text-sm text-muted-foreground">
                            <div className="flex items-center"><MapPin className="mr-2 h-4 w-4"/> New York</div>
                            <div className="flex items-center"><DollarSign className="mr-2 h-4 w-4"/> Stipend</div>
                            <div className="mt-2 text-foreground font-medium">45 Applicants</div>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button variant="ghost" className="w-full">Archived</Button>
                    </CardFooter>
                </Card>
             </div>
        </TabsContent>
        <TabsContent value="candidates">
             <Card>
                <CardHeader>
                    <CardTitle>Candidates Pipeline</CardTitle>
                    <CardDescription>Manage applications and interview stages.</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground text-sm">Table view to be implemented similar to Employee Directory.</p>
                </CardContent>
            </Card>
        </TabsContent>
         <TabsContent value="new-job">
            <Card>
            <CardHeader>
                <CardTitle>Post a Job Opening</CardTitle>
                <CardDescription>
                Create a new job listing for internal or external portals.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="title">Job Title</Label>
                        <Input id="title" placeholder="e.g. Software Engineer" />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="department">Department</Label>
                        <Input id="department" placeholder="e.g. Engineering" />
                    </div>
                </div>
                 <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="type">Employment Type</Label>
                        <Input id="type" placeholder="Full-time / Contract" />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="location">Location</Label>
                        <Input id="location" placeholder="Remote / Office" />
                    </div>
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="description">Job Description</Label>
                    <Textarea id="description" className="min-h-[150px]" placeholder="Enter job responsibilities and requirements..." />
                </div>
                <div className="space-y-2">
                    <Label>Application Form Config</Label>
                    <div className="flex gap-4">
                        <div className="border border-dashed rounded-lg p-4 w-full flex flex-col items-center justify-center text-muted-foreground hover:bg-muted/50 cursor-pointer transition">
                            <UploadCloud className="h-8 w-8 mb-2" />
                            <span className="text-sm">Upload JD PDF (Optional)</span>
                        </div>
                    </div>
                </div>
            </CardContent>
             <CardFooter className="justify-end space-x-2">
                <Button variant="ghost">Save Draft</Button>
                <Button>Publish Job</Button>
            </CardFooter>
            </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
