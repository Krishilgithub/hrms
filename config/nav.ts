import {
  Banknote,
  Calendar,
  Clock,
  LayoutDashboard,
  User,
  Users,
} from "lucide-react"

export const employeeNav = [
  {
    title: "Dashboard",
    href: "/dashboard/employee",
    icon: LayoutDashboard,
  },
  {
    title: "My Profile",
    href: "/dashboard/employee/profile",
    icon: User,
  },
  {
    title: "Attendance",
    href: "/dashboard/employee/attendance",
    icon: Clock,
  },
  {
    title: "Leaves",
    href: "/dashboard/employee/leaves",
    icon: Calendar,
  },
  {
    title: "Payroll",
    href: "/dashboard/employee/payroll",
    icon: Banknote,
  },
]

export const adminNav = [
  {
    title: "Dashboard",
    href: "/dashboard/admin",
    icon: LayoutDashboard,
  },
  {
    title: "My Profile",
    href: "/dashboard/admin/profile",
    icon: User,
  },
  {
    title: "Employees",
    href: "/dashboard/admin/employees",
    icon: Users,
  },
  {
    title: "Attendance",
    href: "/dashboard/admin/attendance",
    icon: Clock,
  },
  {
    title: "Leaves",
    href: "/dashboard/admin/leaves",
    icon: Calendar,
  },
  {
    title: "Payroll",
    href: "/dashboard/admin/payroll",
    icon: Banknote,
  },
]
