"use client"

import { motion } from "framer-motion"
import { Users, Building2, Globe, TrendingUp } from "lucide-react"

const stats = [
  {
    icon: Users,
    value: "50,000+",
    label: "Active Users",
    description: "Professionals trust Dayflow"
  },
  {
    icon: Building2,
    value: "1,200+",
    label: "Companies",
    description: "Organizations worldwide"
  },
  {
    icon: Globe,
    value: "45+",
    label: "Countries",
    description: "Global presence"
  },
  {
    icon: TrendingUp,
    value: "99.9%",
    label: "Uptime",
    description: "Reliable service"
  }
]

export function Stats() {
  return (
    <section className="py-12 md:py-16 lg:py-20 bg-gradient-to-br from-blue-50 via-indigo-50/50 to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Trusted by teams worldwide
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Join thousands of companies streamlining their HR operations with Dayflow
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <div className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="font-semibold text-foreground mb-1">
                  {stat.label}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.description}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
