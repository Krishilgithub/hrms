"use client"

import { ModeToggle } from "@/components/mode-toggle"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Search } from "lucide-react"
import { logout } from "@/actions/login"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Sidebar } from "./sidebar"
import { UserAvatarMenu } from "./user-avatar-menu"

interface HeaderProps {
    user?: {
        name: string | null;
        email: string | null;
        image: string | null;
    } | null;
}

export function Header({ user }: HeaderProps) {
  const pathname = usePathname()
  const isAdmin = pathname?.startsWith("/dashboard/admin")

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-30 w-full">
      <div className="flex h-16 items-center px-4 gap-4">
        <div className="md:hidden">
            <Sheet>
                <SheetTrigger asChild>
                    <Button variant="outline" size="icon">
                        <Menu className="h-5 w-5" />
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="p-0">
                    <Sidebar />
                </SheetContent>
            </Sheet>
        </div>
        
        <div className="flex-1 flex gap-4 md:ml-auto md:justify-end">
             {/* Search can go here */}
        </div>
        
        
        <div className="flex items-center gap-2">
            <UserAvatarMenu 
              user={{
                name: user?.name || "User",
                email: user?.email || "",
                image: user?.image,
                role: isAdmin ? "ADMIN" : (pathname?.startsWith("/dashboard/hr") ? "HR" : "EMPLOYEE")
              }}
            />
            <ModeToggle />
        </div>
      </div>
    </header>
  )
}
