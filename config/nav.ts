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

export const hrNav = [
  {
    title: "Dashboard",
    href: "/dashboard/hr",
    icon: LayoutDashboard,
  },
  {
    title: "My Profile",
    href: "/dashboard/hr/profile",
    icon: User,
  },
  {
    title: "Employees",
    href: "/dashboard/hr/employees",
    icon: Users,
  },
  {
    title: "Attendance",
    href: "/dashboard/hr/attendance",
    icon: Clock,
  },
  {
    title: "Leaves",
    href: "/dashboard/hr/leaves",
    icon: Calendar,
  },
  {
    title: "Recruitment",
    href: "/dashboard/hr/recruitment",
    icon: User,
  },
   {
    title: "Payroll",
    href: "/dashboard/hr/payroll",
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
