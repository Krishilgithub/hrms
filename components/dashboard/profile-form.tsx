"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"
import { updateProfile, changePassword } from "@/actions/profile"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Loader2, Pencil } from "lucide-react"
import { DateOfBirthPicker } from "@/components/ui/date-of-birth-picker"
import { format } from "date-fns"

const privateInfoSchema = z.object({
  dob: z.date().optional(),
  address: z.string().optional(),
  nationality: z.string().optional(),
  personalEmail: z.string().email().optional().or(z.literal("")),
  gender: z.string().optional(),
  maritalStatus: z.string().optional(),
})

const salaryInfoSchema = z.object({
  accountNumber: z.string().optional(),
  bankName: z.string().optional(),
  ifscCode: z.string().optional(),
  panNo: z.string().optional(),
  uanNo: z.string().optional(),
  empCode: z.string().optional(),
})

const passwordFormSchema = z.object({
  currentPassword: z.string().min(1, "Current password is required"),
  newPassword: z.string().min(6, "New password must be at least 6 characters"),
  confirmPassword: z.string().min(6, "Confirm password must be at least 6 characters"),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
})

type ProfileFormProps = {
  user: any
  employeeProfile: any
}

export function ProfileForm({ user, employeeProfile }: ProfileFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [uploadingPhoto, setUploadingPhoto] = useState(false)
  const [uploadingResume, setUploadingResume] = useState(false)

  const privateForm = useForm<z.infer<typeof privateInfoSchema>>({
    resolver: zodResolver(privateInfoSchema),
    defaultValues: {
      dob: employeeProfile?.dob ? new Date(employeeProfile.dob) : undefined,
      address: employeeProfile?.address || "",
      nationality: employeeProfile?.nationality || "",
      personalEmail: employeeProfile?.personalEmail || "",
      gender: employeeProfile?.gender || "",
      maritalStatus: employeeProfile?.maritalStatus || "",
    },
  })

  const salaryForm = useForm<z.infer<typeof salaryInfoSchema>>({
    resolver: zodResolver(salaryInfoSchema),
    defaultValues: {
      accountNumber: employeeProfile?.accountNumber || "",
      bankName: employeeProfile?.bankName || "",
      ifscCode: employeeProfile?.ifscCode || "",
      panNo: employeeProfile?.panNo || "",
      uanNo: employeeProfile?.uanNo || "",
      empCode: employeeProfile?.empCode || "",
    },
  })

  const passwordForm = useForm<z.infer<typeof passwordFormSchema>>({
    resolver: zodResolver(passwordFormSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  })

  async function handlePhotoUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file')
      return
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('File size must be less than 5MB')
      return
    }

    setUploadingPhoto(true)
    const formData = new FormData()
    formData.append('file', file)

    try {
      const { uploadProfileImage } = await import('@/actions/profile')
      const result = await uploadProfileImage(formData)
      
      if (result.error) {
        toast.error(result.error)
      } else {
        toast.success(result.success || 'Profile photo updated')
        router.refresh()
      }
    } catch (error) {
      toast.error('Failed to upload photo')
    } finally {
      setUploadingPhoto(false)
    }
  }

  async function handleResumeUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file type (PDF only for resume)
    if (file.type !== 'application/pdf') {
      toast.error('Please upload a PDF file')
      return
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      toast.error('File size must be less than 10MB')
      return
    }

    setUploadingResume(true)
    const formData = new FormData()
    formData.append('file', file)
    formData.append('type', 'RESUME')

    try {
      const { uploadDocument } = await import('@/actions/profile')
      const result = await uploadDocument(formData)
      
      if (result.error) {
        toast.error(result.error)
      } else {
        toast.success('Resume uploaded successfully')
        router.refresh()
      }
    } catch (error) {
      toast.error('Failed to upload resume')
    } finally {
      setUploadingResume(false)
    }
  }

  async function onPrivateInfoSubmit(data: z.infer<typeof privateInfoSchema>) {
    setIsLoading(true)
    const res = await updateProfile(data)
    setIsLoading(false)

    if (res.error) {
      toast.error(res.error)
    } else {
      toast.success(res.success)
      router.refresh()
    }
  }

  async function onSalaryInfoSubmit(data: z.infer<typeof salaryInfoSchema>) {
    setIsLoading(true)
    const res = await updateProfile(data)
    setIsLoading(false)

    if (res.error) {
      toast.error(res.error)
    } else {
      toast.success(res.success)
      router.refresh()
    }
  }

  async function onPasswordSubmit(data: z.infer<typeof passwordFormSchema>) {
    setIsLoading(true)
    const res = await changePassword(data)
    setIsLoading(false)

    if (res.error) {
      toast.error(res.error)
    } else {
      toast.success("Password changed successfully")
      passwordForm.reset()
    }
  }

  return (
    <div className="space-y-6">
      {/* Header with Avatar */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-6">
            <div className="relative">
              <Avatar className="h-24 w-24">
                <AvatarImage src={user?.image || ""} alt={user?.name || ""} />
                <AvatarFallback className="text-2xl">
                  {user?.name?.split(" ").map((n: string) => n[0]).join("") || "U"}
                </AvatarFallback>
              </Avatar>
              <label htmlFor="photo-upload" className="absolute bottom-0 right-0 cursor-pointer">
                <div className="bg-primary text-primary-foreground rounded-full p-2 shadow-lg hover:bg-primary/90 transition-colors">
                  {uploadingPhoto ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Pencil className="h-4 w-4" />
                  )}
                </div>
                <input
                  id="photo-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handlePhotoUpload}
                  disabled={uploadingPhoto}
                />
              </label>
            </div>
            <div className="flex-1">
              <h2 className="text-3xl font-bold">{user?.name}</h2>
              <p className="text-muted-foreground">{employeeProfile?.position || "Employee"}</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                <div>
                  <Label className="text-xs text-muted-foreground">Company</Label>
                  <p className="font-medium">{employeeProfile?.company || "N/A"}</p>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Department</Label>
                  <p className="font-medium">{employeeProfile?.department || "N/A"}</p>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Manager</Label>
                  <p className="font-medium">{employeeProfile?.manager || "N/A"}</p>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Location</Label>
                  <p className="font-medium">{employeeProfile?.location || "N/A"}</p>
                </div>
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Tabs */}
      <Tabs defaultValue="private" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="resume">Resume</TabsTrigger>
          <TabsTrigger value="private">Private Info</TabsTrigger>
          <TabsTrigger value="salary">Salary Info</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        {/* Resume Tab */}
        <TabsContent value="resume">
          <Card>
            <CardHeader>
              <CardTitle>Resume</CardTitle>
              <CardDescription>Upload and manage your resume</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="border-2 border-dashed rounded-lg p-8 text-center hover:border-primary/50 transition-colors">
                <input
                  id="resume-upload"
                  type="file"
                  accept=".pdf"
                  className="hidden"
                  onChange={handleResumeUpload}
                  disabled={uploadingResume}
                />
                <label htmlFor="resume-upload" className="cursor-pointer">
                  <div className="flex flex-col items-center gap-4">
                    {uploadingResume ? (
                      <Loader2 className="h-12 w-12 text-muted-foreground animate-spin" />
                    ) : (
                      <svg
                        className="h-12 w-12 text-muted-foreground"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        />
                      </svg>
                    )}
                    <div>
                      <p className="text-lg font-medium">
                        {uploadingResume ? "Uploading..." : "Upload Resume"}
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Click to upload or drag and drop
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        PDF files only (max 10MB)
                      </p>
                    </div>
                  </div>
                </label>
              </div>

              {/* Resume preview/list would go here */}
              <div className="text-sm text-muted-foreground">
                <p>Uploaded resumes will appear here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Private Info Tab */}
        <TabsContent value="private">
          <Card>
            <CardHeader>
              <CardTitle>Private Information</CardTitle>
              <CardDescription>Manage your personal details</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...privateForm}>
                <form onSubmit={privateForm.handleSubmit(onPrivateInfoSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Left Column */}
                    <div className="space-y-4">
                      <FormField
                        control={privateForm.control}
                        name="dob"
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <FormLabel>Date of Birth</FormLabel>
                            <DateOfBirthPicker
                              value={field.value}
                              onChange={field.onChange}
                            />
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={privateForm.control}
                        name="address"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Residing Address</FormLabel>
                            <FormControl>
                              <Textarea placeholder="Enter your address" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={privateForm.control}
                        name="nationality"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nationality</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g., Indian" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={privateForm.control}
                        name="personalEmail"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Personal Email</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="personal@example.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Right Column */}
                    <div className="space-y-4">
                      <FormField
                        control={privateForm.control}
                        name="gender"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Gender</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select gender" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="Male">Male</SelectItem>
                                <SelectItem value="Female">Female</SelectItem>
                                <SelectItem value="Other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={privateForm.control}
                        name="maritalStatus"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Marital Status</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select status" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="Single">Single</SelectItem>
                                <SelectItem value="Married">Married</SelectItem>
                                <SelectItem value="Divorced">Divorced</SelectItem>
                                <SelectItem value="Widowed">Widowed</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div>
                        <Label>Date of Joining</Label>
                        <p className="mt-2 text-sm">
                          {employeeProfile?.joiningDate
                            ? format(new Date(employeeProfile.joiningDate), "PPP")
                            : "N/A"}
                        </p>
                      </div>
                    </div>
                  </div>

                  <Button type="submit" disabled={isLoading}>
                    {isLoading && <Loader2  className="mr-2 h-4 w-4 animate-spin" />}
                    Save Changes
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Salary Info Tab */}
        <TabsContent value="salary">
          <Card>
            <CardHeader>
              <CardTitle>Salary & Bank Information</CardTitle>
              <CardDescription>Manage your bank and payroll details</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...salaryForm}>
                <form onSubmit={salaryForm.handleSubmit(onSalaryInfoSubmit)} className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg">Bank Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={salaryForm.control}
                        name="accountNumber"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Account Number</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter account number" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={salaryForm.control}
                        name="bankName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Bank Name</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g., HDFC Bank" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={salaryForm.control}
                        name="ifscCode"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>IFSC Code</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g., HDFC0001234" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={salaryForm.control}
                        name="panNo"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>PAN No</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g., ABCDE1234F" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={salaryForm.control}
                        name="uanNo"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>UAN NO</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter UAN number" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={salaryForm.control}
                        name="empCode"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Emp Code</FormLabel>
                            <FormControl>
                              <Input placeholder="Employee code" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <Button type="submit" disabled={isLoading}>
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Save Changes
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Security</CardTitle>
              <CardDescription>Manage your password and security settings</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...passwordForm}>
                <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)} className="space-y-4">
                  <FormField
                    control={passwordForm.control}
                    name="currentPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Current Password</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="Enter current password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={passwordForm.control}
                    name="newPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>New Password</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="Enter new password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={passwordForm.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm New Password</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="Confirm new password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit" disabled={isLoading}>
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Change Password
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
