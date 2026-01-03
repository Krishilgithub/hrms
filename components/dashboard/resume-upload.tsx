"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Upload, FileText, Loader2 } from "lucide-react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

interface ResumeUploadProps {
  resumeUrl?: string | null
}

export function ResumeUpload({ resumeUrl }: ResumeUploadProps) {
  const router = useRouter()
  const [uploading, setUploading] = useState(false)

  async function handleResumeUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file type
    if (file.type !== 'application/pdf') {
      toast.error('Please upload a PDF file')
      return
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      toast.error('File size must be less than 10MB')
      return
    }

    setUploading(true)
    const formData = new FormData()
    formData.append('file', file)

    try {
      const { uploadResume } = await import('@/actions/profile')
      const result = await uploadResume(formData)
      
      if (result.error) {
        toast.error(result.error)
      } else {
        toast.success(result.success || 'Resume uploaded successfully')
        router.refresh()
      }
    } catch (error) {
      toast.error('Failed to upload resume')
    } finally {
      setUploading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Resume / CV</CardTitle>
        <CardDescription>
          Upload your resume in PDF format (max 10MB)
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {resumeUrl && (
          <div className="flex items-center gap-3 p-4 border rounded-lg bg-muted/50">
            <FileText className="h-8 w-8 text-primary" />
            <div className="flex-1">
              <p className="font-medium">Current Resume</p>
              <p className="text-sm text-muted-foreground">PDF Document</p>
            </div>
            <a
              href={resumeUrl}
              download="resume.pdf"
              className="text-sm text-primary hover:underline"
            >
              Download
            </a>
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="resume-upload">
            {resumeUrl ? 'Upload New Resume' : 'Upload Resume'}
          </Label>
          <div className="flex gap-2">
            <Input
              id="resume-upload"
              type="file"
              accept=".pdf"
              onChange={handleResumeUpload}
              disabled={uploading}
              className="flex-1"
            />
            {uploading && (
              <Button disabled size="icon">
                <Loader2 className="h-4 w-4 animate-spin" />
              </Button>
            )}
          </div>
          <p className="text-xs text-muted-foreground">
            Accepted format: PDF only, maximum size: 10MB
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
