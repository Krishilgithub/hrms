"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"

export function LandingNavbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/" className="mr-6 flex items-center space-x-2">
            <div className="h-6 w-6 rounded-md bg-primary flex items-center justify-center text-primary-foreground font-bold text-xs">
                    D
            </div>
            <span className="hidden font-bold sm:inline-block">
                Dayflow
            </span>
        </Link>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
            <div className="w-full flex-1 md:w-auto md:flex-none">
            </div>
            <nav className="flex items-center gap-2">
                <Link href="/login">
                    <Button variant="ghost" size="sm">
                        Login
                    </Button>
                </Link>
                 <Link href="/register">
                    <Button size="sm">
                        Get Started
                    </Button>
                </Link>
                <ModeToggle />
            </nav>
        </div>
      </div>
    </nav>
  )
}
