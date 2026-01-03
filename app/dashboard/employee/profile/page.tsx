
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { db } from "@/lib/db"
import { cookies } from "next/headers"
import { ProfileForm } from "@/components/dashboard/profile-form"



export default async function ProfilePage() {
  const cookieStore = await cookies()
  const userId = cookieStore.get("user_session")?.value

  if (!userId) {
      return <div>Please log in to view profile.</div>
  }

  const user = await db.user.findUnique({
      where: { id: userId },
      include: { employeeProfile: true }
  })
  // const employeeProfile = await db.employeeProfile.findUnique({ where: { userId } }) - Removed as now included



  if (!user) return <div>User not found</div>

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
       <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Profile</h2>
      </div>
      <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-1/3">
              <Card>
                  <CardHeader className="flex flex-col items-center text-center">
                    <Avatar className="h-24 w-24">
                        <AvatarImage src={user.image || "/avatars/01.png"} alt={user.name || "User"} />
                        <AvatarFallback>{user.name?.charAt(0) || "U"}</AvatarFallback>
                    </Avatar>
                    <CardTitle className="mt-4">{user.name}</CardTitle>
                    <CardDescription>{user.employeeProfile?.position || "Employee"}</CardDescription>
                     <Badge variant="outline" className="mt-2 text-green-600 border-green-200 bg-green-50">Active</Badge>
                  </CardHeader>
                  <CardContent className="space-y-4">
                      <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Employee ID</span>
                          <span className="font-medium">{user.employeeProfile?.employeeId || "N/A"}</span>
                      </div>
                       <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Department</span>
                          <span className="font-medium">{user.employeeProfile?.department || "N/A"}</span>
                      </div>
                       <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Joining Date</span>
                          <span className="font-medium">
                              {user.employeeProfile?.joiningDate 
                                  ? new Date(user.employeeProfile.joiningDate).toLocaleDateString() 
                                  : "N/A"}
                          </span>
                      </div>
                       <div className="flex flex-col space-y-1 text-sm">
                          <span className="text-muted-foreground">Location</span>
                          <span className="font-medium text-right sm:text-left">{user.employeeProfile?.address || "Remote"}</span>
                      </div>
                      {user.employeeProfile?.resumeUrl && (
                        <div className="pt-4 border-t">
                          <a 
                            href={user.employeeProfile.resumeUrl} 
                            download="resume.pdf"
                            className="flex items-center justify-center gap-2 w-full px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                              <polyline points="7 10 12 15 17 10"></polyline>
                              <line x1="12" y1="15" x2="12" y2="3"></line>
                            </svg>
                            Download Resume
                          </a>
                        </div>
                      )}
                  </CardContent>
              </Card>
          </div>
          <div className="w-full md:w-2/3">
             <ProfileForm 
                user={{
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    image: user.image
                }} 
                employeeProfile={{
                    ...user.employeeProfile,
                    resumeUrl: user.employeeProfile?.resumeUrl
                }}
             />
          </div>
      </div>
    </div>
  )
}
