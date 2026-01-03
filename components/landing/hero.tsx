"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Play } from "lucide-react"

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-8 md:pt-14 lg:pt-20 pb-12 md:pb-16">
        
       {/* Enhanced Background Gradients */}
      <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
        <div
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-blue-600 via-purple-600 to-pink-600 opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem] dark:opacity-10"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>

      {/* Subtle grid pattern */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

      <div className="container flex max-w-[64rem] flex-col items-center gap-6 text-center mx-auto px-4">
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <Link
            href="/register"
            className="inline-flex items-center gap-2 rounded-full bg-muted px-4 py-1.5 text-sm font-medium transition-all hover:bg-muted/80 hover:shadow-md border border-border/50"
            >
            <span className="inline-flex items-center gap-1.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              <span className="text-primary font-semibold">New</span>
            </span>
            Introducing the future of HR Management
            <ArrowRight className="h-3 w-3" />
            </Link>
        </motion.div>
        
        <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight"
        >
          Transform Your Workforce
          <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
            {" "}Management Today
          </span>
        </motion.h1>
        
        <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-[42rem] leading-relaxed text-muted-foreground sm:text-xl sm:leading-8 mt-2"
        >
          Streamline attendance, automate leave approvals, and simplify payroll with Dayflow's all-in-one HRMS platform. Built for modern teams, trusted by thousands.
        </motion.p>
        
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 mt-4"
        >
          <Link href="/register">
            <Button size="lg" className="rounded-full h-12 px-8 text-base font-semibold shadow-lg hover:shadow-xl transition-all group">
              Start Free Trial
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
          <Link href="#features">
             <Button variant="outline" size="lg" className="rounded-full h-12 px-8 text-base font-semibold group">
              <Play className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
              Watch Demo
             </Button>
          </Link>
        </motion.div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground mt-8"
        >
          <span className="flex items-center gap-2">
            <svg className="h-5 w-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            14-day free trial
          </span>
          <span className="flex items-center gap-2">
            <svg className="h-5 w-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            No credit card required
          </span>
          <span className="flex items-center gap-2">
            <svg className="h-5 w-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Cancel anytime
          </span>
        </motion.div>
      </div>

      {/* Enhanced Hero Visual */}
       <motion.div 
         initial={{ opacity: 0, scale: 0.95 }}
         animate={{ opacity: 1, scale: 1 }}
         transition={{ duration: 0.8, delay: 0.5 }}
         className="container mt-16 max-w-6xl mx-auto rounded-2xl border-2 border-border/50 bg-background/95 shadow-2xl overflow-hidden backdrop-blur-sm sm:mt-20 hover:border-primary/30 transition-colors"
       >
          <div className="relative w-full aspect-[16/9]">
             <img 
               src="/dashboard-preview.png" 
               alt="Dayflow Dashboard Preview" 
               className="w-full h-full object-cover"
             />
             <div className="absolute top-4 right-4 inline-flex items-center gap-2 bg-white/90 dark:bg-gray-800/90 px-4 py-2 rounded-full shadow-lg backdrop-blur">
               <div className="h-2.5 w-2.5 rounded-full bg-green-500 animate-pulse" />
               <span className="text-xs font-semibold text-foreground">Live Demo</span>
             </div>
          </div>
       </motion.div>
    </section>
  )
}

