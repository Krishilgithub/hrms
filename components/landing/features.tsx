"use client"

import {
  Banknote,
  CalendarCheck,
  Clock,
  LayoutDashboard,
  ShieldCheck,
  Users,
} from "lucide-react"

export function Features() {
  return (
    <section
      id="features"
      className="container space-y-6 bg-slate-50 py-8 dark:bg-transparent md:py-12 lg:py-24"
    >
      <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
        <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
          Features
        </h2>
        <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
          Everything you need to manage your workforce effectively.
        </p>
      </div>
      <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
        <div className="relative overflow-hidden rounded-lg border bg-background p-2">
          <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
            <Clock className="h-12 w-12 text-primary" />
            <div className="space-y-2">
              <h3 className="font-bold">Attendance Tracking</h3>
              <p className="text-sm text-muted-foreground">
                Seamless check-in and check-out with geolocation support.
              </p>
            </div>
          </div>
        </div>
        <div className="relative overflow-hidden rounded-lg border bg-background p-2">
          <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
            <CalendarCheck className="h-12 w-12 text-primary" />
            <div className="space-y-2">
              <h3 className="font-bold">Leave Management</h3>
              <p className="text-sm text-muted-foreground">
                Apply for leaves and track approval status in real-time.
              </p>
            </div>
          </div>
        </div>
        <div className="relative overflow-hidden rounded-lg border bg-background p-2">
          <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
            <Banknote className="h-12 w-12 text-primary" />
            <div className="space-y-2">
              <h3 className="font-bold">Payroll Visibility</h3>
              <p className="text-sm text-muted-foreground">
                View salary slips and tax breakdowns instantly.
              </p>
            </div>
          </div>
        </div>
        <div className="relative overflow-hidden rounded-lg border bg-background p-2">
          <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
            <Users className="h-12 w-12 text-primary" />
            <div className="space-y-2">
              <h3 className="font-bold">Employee Profiles</h3>
              <p className="text-sm text-muted-foreground">
                Centralized database for all employee information.
              </p>
            </div>
          </div>
        </div>
        <div className="relative overflow-hidden rounded-lg border bg-background p-2">
          <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
            <ShieldCheck className="h-12 w-12 text-primary" />
            <div className="space-y-2">
              <h3 className="font-bold">Role-Based Access</h3>
              <p className="text-sm text-muted-foreground">
                Secure access controls for Admins, HR, and Employees.
              </p>
            </div>
          </div>
        </div>
        <div className="relative overflow-hidden rounded-lg border bg-background p-2">
          <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
            <LayoutDashboard className="h-12 w-12 text-primary" />
            <div className="space-y-2">
              <h3 className="font-bold">Real-time Dashboard</h3>
              <p className="text-sm text-muted-foreground">
                Insightful metrics and analytics at a glance.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
