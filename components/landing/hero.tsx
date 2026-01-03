"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { motion } from "framer-motion"

export function Hero() {
  return (

    <section className="relative overflow-hidden pt-6 md:pt-10 lg:pt-24 pb-12">
        
       {/* Background Gradients */}
      <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
        <div
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>

      <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center mx-auto">
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <Link
            href="/login"
            className="rounded-full bg-muted px-4 py-1.5 text-sm font-medium transition-colors hover:bg-muted/80 border"
            >
            <span className="text-primary mr-2">New</span> Introducing the new HR Standard
            </Link>
        </motion.div>
        
        <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-heading text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter"
        >
          Every workday, <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">perfectly aligned.</span>
        </motion.h1>
        
        <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8 mt-4"
        >
          Dayflow is the all-in-one HRMS platform designed to streamline attendance, leave management, and payroll for modern enterprises.
        </motion.p>
        
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="space-x-4 mt-6"
        >
          <Link href="/login">
            <Button size="lg" className="rounded-full h-12 px-8 text-lg">Get Started</Button>
          </Link>
          <Link href="#features">
             <Button variant="outline" size="lg" className="rounded-full h-12 px-8 text-lg">Learn More</Button>
          </Link>
        </motion.div>
      </div>

      {/* Hero Image Mockup */}
       <motion.div 
         initial={{ opacity: 0, scale: 0.95 }}
         animate={{ opacity: 1, scale: 1 }}
         transition={{ duration: 0.8, delay: 0.5 }}
         className="container mt-16 max-w-6xl mx-auto rounded-xl border bg-background/50 shadow-2xl overflow-hidden backdrop-blur sm:mt-20"
       >
          <div className="aspect-[16/9] w-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center text-muted-foreground">
             Dashboard Preview Placeholder
          </div>
       </motion.div>
    </section>
  )
}
