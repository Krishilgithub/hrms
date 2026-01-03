import { Header } from "@/components/dashboard/header"
import { Sidebar } from "@/components/dashboard/sidebar"

import { db } from "@/lib/db"
import { cookies } from "next/headers"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const cookieStore = await cookies()
  const userId = cookieStore.get("user_session")?.value

  let user = null;
  if (userId) {
      user = await db.user.findUnique({
          where: { id: userId },
          select: { name: true, email: true, image: true }
      })
  }

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Desktop Sidebar */}
      <aside className="hidden w-64 border-r bg-background md:block">
        <Sidebar className="h-full" />
      </aside>

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header user={user} />
        <main className="flex-1 overflow-y-auto p-6 md:p-8">
            {children}
        </main>
      </div>
    </div>
  )
}
