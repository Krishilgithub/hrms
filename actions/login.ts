"use server"

import { db } from "@/lib/db"
import { z } from "zod"
import { redirect } from "next/navigation"

const loginSchema = z.object({
  loginId: z.string().min(1),
  password: z.string().min(1),
})

export async function login(values: z.infer<typeof loginSchema>) {
  const validatedFields = loginSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: "Invalid fields!" }
  }

  const { loginId, password } = validatedFields.data

  // Try to find user by loginId or email
  let user = await db.user.findUnique({
    where: { loginId },
  })

  // If not found by loginId, try email
  if (!user) {
    user = await db.user.findUnique({
      where: { email: loginId },
    })
  }

  // In production, compare hashed password!
  // For now we compare plain text as per seed
  if (!user || user.password !== password) {
    return { error: "Invalid credentials!" }
  }

  // Create session (basic cookie for now)
  const { cookies } = await import("next/headers")
  const cookieStore = await cookies()
  cookieStore.set("user_session", user.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: "/",
  })

  return { 
      success: "Login successful!",
      role: user.role
  }
}

export async function logout() {
  const { cookies } = await import("next/headers")
  const cookieStore = await cookies()
  cookieStore.delete("user_session")
  redirect("/login")
}
