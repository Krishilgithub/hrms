"use client"

import { motion } from "framer-motion"
import {
  Banknote,
  CalendarCheck,
  Clock,
  LayoutDashboard,
  ShieldCheck,
  Users,
  TrendingUp,
  Bell,
  FileText
} from "lucide-react"

const features = [
  {
    icon: Clock,
    title: "Smart Attendance Tracking",
    description: "GPS-enabled check-in/out with automatic overtime calculation and real-time workforce visibility."
  },
  {
    icon: CalendarCheck,
    title: "Intelligent Leave Management",
    description: "Automated approval workflows, balance tracking, and conflict detection to keep operations running smoothly."
  },
  {
    icon: Banknote,
    title: "Automated Payroll Processing",
    description: "Calculate salaries, taxes, and deductions automatically. Generate payslips instantly with zero errors."
  },
  {
    icon: Users,
    title: "Centralized Employee Profiles",
    description: "Store all employee data, documents, and history in one secure, easily accessible location."
  },
  {
    icon: ShieldCheck,
    title: "Role-Based Security",
    description: "Granular access controls ensure employees see only what they need, keeping sensitive data protected."
  },
  {
    icon: LayoutDashboard,
    title: "Real-Time Analytics",
    description: "Make data-driven decisions with comprehensive dashboards and customizable reports."
  },
  {
    icon: TrendingUp,
    title: "Performance Tracking",
    description: "Monitor productivity metrics, attendance patterns, and set up automated performance reviews."
  },
  {
    icon: Bell,
    title: "Smart Notifications",
    description: "Stay informed with customizable alerts for leave requests, approvals, and important deadlines."
  },
  {
    icon: FileText,
    title: "Document Management",
    description: "Digital document storage with version control, e-signatures, and automated retention policies."
  }
]

export function Features() {
  return (
    <section
      id="features"
      className="py-12 md:py-16 lg:py-24 bg-gradient-to-b from-white to-slate-50 dark:from-gray-950 dark:to-gray-900"
    >
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center mb-12"
        >
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold">
            Everything you need to manage
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              your workforce effectively
            </span>
          </h2>
          <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
            Powerful features designed to save time, reduce errors, and empower your HR team.
          </p>
        </motion.div>

        <div className="mx-auto grid justify-center gap-6 sm:grid-cols-2 lg:grid-cols-3 md:max-w-[64rem] lg:max-w-7xl">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="group relative overflow-hidden rounded-xl border bg-background/60 backdrop-blur-sm p-6 hover:shadow-lg hover:border-primary/50 transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative">
                  <div className="mb-4 inline-flex items-center justify-center rounded-lg bg-primary/10 p-3 group-hover:bg-primary/20 transition-colors">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

