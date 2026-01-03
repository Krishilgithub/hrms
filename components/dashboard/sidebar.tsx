"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { employeeNav, adminNav, hrNav } from "@/config/nav"
import { LogOut, Settings } from "lucide-react"

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  role?: "employee" | "admin" | "hr"
}

export function Sidebar({ className, role }: SidebarProps) {
  const pathname = usePathname()
  
  let currentRole = role
  if (!currentRole) {
    if (pathname?.startsWith("/dashboard/admin")) {
      currentRole = "admin"
    } else if (pathname?.startsWith("/dashboard/hr")) {
      currentRole = "hr"
    } else {
      currentRole = "employee"
    }
  }

  let navItems = employeeNav
  if (currentRole === "admin") navItems = adminNav
  if (currentRole === "hr") navItems = hrNav

  return (
    <div className={cn("pb-12 h-screen border-r bg-background", className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="flex items-center px-4 mb-8">
             <div className="flex items-center gap-2 font-bold text-xl">
                <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground">
                    D
                </div>
                Dayflow
             </div>
          </div>
          <div className="space-y-1">
            {navItems.map((item) => (
              <Button
                key={item.href}
                variant={pathname === item.href ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start",
                  pathname === item.href && "bg-secondary"
                )}
                asChild
              >
                <Link href={item.href}>
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.title}
                </Link>
              </Button>
            ))}
          </div>
        </div>
      </div>
      <div className="absolute bottom-4 left-0 px-4">
          <Button variant="ghost" className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20">
              <LogOut className="mr-2 h-4 w-4" />
              Logout
          </Button>
      </div>
    </div>
  )
}
