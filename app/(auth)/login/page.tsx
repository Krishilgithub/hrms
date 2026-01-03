"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Loader2, Eye, EyeOff } from "lucide-react"
import { login } from "@/actions/login"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import Image from "next/image"

const formSchema = z.object({
  loginId: z.string().min(1, {
    message: "Login ID/Email is required.",
  }),
  password: z.string().min(1, {
    message: "Password is required.",
  }),
})

export default function LoginPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = React.useState(false)
  const [showPassword, setShowPassword] = React.useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      loginId: "",
      password: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    
    try {
        const data = await login(values)
        if (data?.error) {
            toast.error(data.error)
        } else if (data?.success) {
            toast.success(data.success)
            // Redirect based on role (HR users now treated as admin)
            if (data.role === "ADMIN" || data.role === "HR") {
                router.push("/dashboard/admin")
            } else {
                router.push("/dashboard/employee")
            }
        }
    } catch (error) {
        toast.error("Something went wrong.")
    } finally {
        setIsLoading(false)
    }
  }

  return (
    <div className="mx-auto flex w-full flex-col justify-center space-y-8 sm:w-[400px]">
      {/* Logo Section */}
      <div className="flex flex-col items-center space-y-2">
        <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center shadow-lg">
          <span className="text-white font-bold text-2xl">HRMS</span>
        </div>
        <h1 className="text-2xl font-bold tracking-tight">
          Sign in Page
        </h1>
      </div>
      
      <div className="grid gap-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="loginId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">Login Id/Email :-</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Enter your login ID or email" 
                      className="h-11"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">Password :-</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input 
                        placeholder="Enter your password" 
                        type={showPassword ? "text" : "password"}
                        className="h-11 pr-10"
                        {...field} 
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button 
              disabled={isLoading} 
              type="submit" 
              className="w-full h-11 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold"
            >
              {isLoading && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              SIGN IN
            </Button>
          </form>
        </Form>
      </div>
      <p className="text-center text-sm text-muted-foreground">
        Don&apos;t have an Account?{" "}
        <Link
          href="/register"
          className="font-semibold text-purple-600 hover:text-purple-700 underline underline-offset-4"
        >
          Sign Up
        </Link>
      </p>
    </div>
  )
}
