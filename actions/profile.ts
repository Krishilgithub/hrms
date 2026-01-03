"use server"

import { db } from "@/lib/db"
import { revalidatePath } from "next/cache"
import { z } from "zod"
import { cookies } from "next/headers"
import { sendEmail } from "@/lib/mail"

const profileSchema = z.object({
  name: z.string().min(1, "Name is required").optional(),
  phone: z.string().optional(),
  address: z.string().optional(),
  dob: z.date().optional(),
  gender: z.string().optional(),
  nationality: z.string().optional(),
  maritalStatus: z.string().optional(),
  personalEmail: z.string().email().optional().or(z.literal("")),
})

const passwordSchema = z.object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z.string().min(6, "New password must be at least 6 characters"),
})

export async function uploadProfileImage(formData: FormData) {
    const cookieStore = await cookies()
    const userId = cookieStore.get("user_session")?.value
  
    if (!userId) {
      return { error: "Unauthorized" }
    }

    const file = formData.get("file") as File
    
    if (!file) {
        return { error: "No file provided" }
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
        return { error: "Please upload an image file" }
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
        return { error: "Image size must be less than 5MB" }
    }

    try {
        // Convert image to base64 data URL for storage in database
        // In production, you would upload to S3/Cloudinary/etc instead
        const bytes = await file.arrayBuffer()
        const buffer = Buffer.from(bytes)
        const base64 = buffer.toString('base64')
        const dataUrl = `data:${file.type};base64,${base64}`

        await db.user.update({
            where: { id: userId },
            data: { image: dataUrl }
        })

        revalidatePath("/dashboard/employee/profile")
        revalidatePath("/dashboard/employee")
        revalidatePath("/dashboard/admin/employees")
        
        return { success: "Profile photo uploaded successfully!" }
    } catch (error) {
        console.error("Upload profile image error:", error)
        return { error: "Failed to upload profile photo" }
    }
}

export async function updateProfile(values: z.infer<typeof profileSchema>) {
  const cookieStore = await cookies()
  const userId = cookieStore.get("user_session")?.value

  if (!userId) {
    return { error: "Unauthorized" }
  }

  try {
    const { name, phone, address, dob, gender, nationality, maritalStatus, personalEmail } = values

    if (name) {
        await db.user.update({
            where: { id: userId },
            data: { name }
        })
    }

    await db.employeeProfile.upsert({
        where: { userId },
        create: { 
            userId, 
            phone, 
            address, 
            dob,
            gender,
            nationality,
            maritalStatus,
            personalEmail
        },
        update: { 
            phone, 
            address, 
            dob,
            gender,
            nationality,
            maritalStatus,
            personalEmail
        }
    })

    const user = await db.user.findUnique({ where: { id: userId } })
    if (user?.email) {
        await sendEmail(
            user.email,
            "Profile Updated - Dayflow HRMS", 
            `<p>Hello ${name},</p><p>Your profile information has been successfully updated.</p>`
        )
    }

    revalidatePath("/dashboard/employee/profile")
    // Revalidate the layout/sidebar where the user info might be
    revalidatePath("/dashboard/employee") 
    return { success: "Profile updated successfully!" }
  } catch (error) {
     return { error: "Failed to update profile." }
  }
}

export async function changePassword(values: z.infer<typeof passwordSchema>) {
    const cookieStore = await cookies()
    const userId = cookieStore.get("user_session")?.value
  
    if (!userId) {
      return { error: "Unauthorized" }
    }

    const { currentPassword, newPassword } = values
    
    // In a real app, we would hash the password and compare.
    // Since our seed uses plain text, we compare directly for now.
    const user = await db.user.findUnique({ where: { id: userId } })
    
    if (!user || user.password !== currentPassword) {
        return { error: "Incorrect current password." }
    }

    await db.user.update({
        where: { id: userId },
        data: { password: newPassword } // Again, plain text for this demo environment
    })

     if (user.email) {
        await sendEmail(
            user.email,
            "Security Alert: Password Changed", 
            `<p>Hello ${user.name},</p><p>Your password was recently changed. If this wasn't you, please contact HR immediately.</p>`
        )
    }

    return { success: "Password updated successfully!" }
}

export async function uploadResume(formData: FormData) {
    const cookieStore = await cookies()
    const userId = cookieStore.get("user_session")?.value
  
    if (!userId) {
      return { error: "Unauthorized" }
    }

    const file = formData.get("file") as File
    
    if (!file) {
        return { error: "No file provided" }
    }

    // Validate file type - PDF only
    if (file.type !== 'application/pdf') {
        return { error: "Please upload a PDF file" }
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
        return { error: "Resume size must be less than 10MB" }
    }

    try {
        // Convert PDF to base64 data URL for storage
        const bytes = await file.arrayBuffer()
        const buffer = Buffer.from(bytes)
        const base64 = buffer.toString('base64')
        const dataUrl = `data:${file.type};base64,${base64}`

        await db.employeeProfile.upsert({
            where: { userId },
            create: { 
                userId, 
                resumeUrl: dataUrl 
            },
            update: { 
                resumeUrl: dataUrl 
            }
        })

        revalidatePath("/dashboard/employee/profile")
        
        return { success: "Resume uploaded successfully!" }
    } catch (error) {
        console.error("Upload resume error:", error)
        return { error: "Failed to upload resume" }
    }
}

export async function uploadDocument(formData: FormData) {
    const cookieStore = await cookies()
    const userId = cookieStore.get("user_session")?.value
  
    if (!userId) {
      return { error: "Unauthorized" }
    }

    const file = formData.get("file") as File
    const docType = formData.get("type") as string || "OTHER"

    if (!file) {
        return { error: "No file provided" }
    }

     // In real app: Upload to S3/Blob Storage
     // Here: Mock URL
     const fileName = file.name
     const mockUrl = `https://fake-s3.com/${userId}/${fileName}`
     
     try {
         // Create Document Record
         await db.document.create({
             data: {
                 userId,
                 name: fileName,
                 type: docType,
                 url: mockUrl
             }
         })

         // Check for completion
         const userDocuments = await db.document.findMany({
             where: { userId },
             select: { type: true }
         })
         
         const requiredTypes = ["RESUME", "ID_PROOF", "OFFER_LETTER"]
         const uploadedTypes = userDocuments.map((d: { type: string }) => d.type)
         const allUploaded = requiredTypes.every(t => uploadedTypes.includes(t))

         const user = await db.user.findUnique({ where: { id: userId } })

         if (user?.email) {
            // Send Upload Notification
            await sendEmail(
                user.email,
                "Document Uploaded", 
                `<p>You have successfully uploaded <strong>${docType}</strong> (${fileName}).</p>`
            )

            // Send Completion Email if all docs are present
            if (allUploaded) {
                 await sendEmail(
                    user.email,
                    "Profile Complete!", 
                    `<p>Congratulations! You have uploaded all required documents. Your profile is now complete.</p>`
                )
            }
        }
        
        revalidatePath("/dashboard/employee/profile")
        return { success: "Document uploaded successfully" }

     } catch(err) {
         console.error(err)
         return { error: "Failed to upload document" }
     }
}

export async function getDocuments() {
    const cookieStore = await cookies()
    const userId = cookieStore.get("user_session")?.value
  
    if (!userId) {
      return []
    }

    return await db.document.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' }
    })
}
