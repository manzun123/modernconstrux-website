import { type NextRequest, NextResponse } from "next/server"
import nodemailer from "nodemailer"
import type { Attachment } from "nodemailer/lib/mailer"

interface ContactFormData {
  name: string
  email: string
  phone?: string
  address?: string
  projectType?: string
  message: string
  // Honeypot field - should be empty
  website?: string
  // Source tracking
  source?: string
  // Additional metadata (for AI Visualizer, etc.)
  metadata?: {
    projectType?: string
    style?: string
    notes?: string
    finalPrompt?: string
    imageUrl?: string
    // AI-generated image (truncated in frontend, but could be full)
    generatedImageBase64?: string
    imageBase64?: string
    // User-uploaded image from AI Visualizer
    uploadedImageDataUrl?: string
    uploadedImageFilename?: string
    [key: string]: unknown
  }
}

// Simple in-memory rate limiting
const rateLimitMap = new Map<string, { count: number; resetTime: number }>()
const RATE_LIMIT_WINDOW = 60 * 1000 // 1 minute
const MAX_REQUESTS = 5 // 5 requests per minute per IP

function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for")
  const realIP = request.headers.get("x-real-ip")
  
  if (forwarded) {
    return forwarded.split(",")[0].trim()
  }
  if (realIP) {
    return realIP
  }
  return "unknown"
}

function checkRateLimit(ip: string): { allowed: boolean; retryAfter?: number } {
  const now = Date.now()
  const record = rateLimitMap.get(ip)

  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW })
    return { allowed: true }
  }

  if (record.count >= MAX_REQUESTS) {
    const retryAfter = Math.ceil((record.resetTime - now) / 1000)
    return { allowed: false, retryAfter }
  }

  record.count++
  return { allowed: true }
}

/**
 * Parse a data URL and extract the buffer and content type
 */
function parseDataUrl(dataUrl: string): { buffer: Buffer; contentType: string; extension: string } | null {
  try {
    const matches = dataUrl.match(/^data:([^;]+);base64,(.+)$/)
    if (!matches) return null
    
    const contentType = matches[1]
    const base64Data = matches[2]
    const buffer = Buffer.from(base64Data, "base64")
    
    // Determine file extension from content type
    const extensionMap: Record<string, string> = {
      "image/jpeg": "jpg",
      "image/jpg": "jpg",
      "image/png": "png",
      "image/webp": "webp",
      "image/gif": "gif",
    }
    const extension = extensionMap[contentType] || "png"
    
    return { buffer, contentType, extension }
  } catch {
    return null
  }
}

export async function POST(request: NextRequest) {
  const clientIP = getClientIP(request)
  const userAgent = request.headers.get("user-agent") || "Unknown"

  // Check rate limit
  const rateLimitResult = checkRateLimit(clientIP)
  if (!rateLimitResult.allowed) {
    return NextResponse.json(
      { ok: false, error: "Too many requests. Please try again later." },
      { 
        status: 429,
        headers: {
          "Retry-After": String(rateLimitResult.retryAfter || 60)
        }
      }
    )
  }

  try {
    const data: ContactFormData = await request.json()

    // Honeypot check - if filled, it's likely a bot
    if (data.website && data.website.trim() !== "") {
      console.log("[Contact] Honeypot triggered - likely bot submission")
      return NextResponse.json({ ok: true })
    }

    // Validate required fields
    const errors: string[] = []
    
    if (!data.name || data.name.trim().length === 0) {
      errors.push("Name is required")
    } else if (data.name.trim().length > 100) {
      errors.push("Name must be less than 100 characters")
    }

    if (!data.email || data.email.trim().length === 0) {
      errors.push("Email is required")
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(data.email)) {
        errors.push("Invalid email format")
      }
    }

    if (!data.message || data.message.trim().length === 0) {
      errors.push("Message is required")
    } else if (data.message.length > 5000) {
      errors.push("Message must be less than 5000 characters")
    }

    if (errors.length > 0) {
      return NextResponse.json(
        { ok: false, error: "Validation failed", details: errors },
        { status: 400 }
      )
    }

    // Check if SMTP is configured FIRST before doing any email prep work
    const smtpHost = process.env.SMTP_HOST
    const smtpPort = process.env.SMTP_PORT || "587"
    const smtpUser = process.env.SMTP_USER
    const smtpPass = process.env.SMTP_PASS
    const mailTo = process.env.MAIL_TO
    const mailFrom = process.env.MAIL_FROM

    if (!smtpHost || !smtpUser || !smtpPass || !mailTo || !mailFrom) {
      console.error("[Contact] ❌ SMTP not configured")
      console.error("[Contact] Missing env vars:", {
        SMTP_HOST: !!smtpHost,
        SMTP_PORT: !!smtpPort,
        SMTP_USER: !!smtpUser,
        SMTP_PASS: !!smtpPass,
        MAIL_TO: !!mailTo,
        MAIL_FROM: !!mailFrom,
      })
      console.log("[Contact] 📝 Form submission (not sent):", {
        name: data.name,
        email: data.email,
        phone: data.phone,
        source: data.source || "Contact Page",
        hasUploadedImage: !!data.metadata?.uploadedImageDataUrl,
      })
      
      return NextResponse.json(
        { ok: false, error: "Email service is not configured. Please call us directly at (858) 744-0521." },
        { status: 500 }
      )
    }

    // Prepare email content
    const timestamp = new Date().toLocaleString("en-US", {
      timeZone: "America/Los_Angeles",
      dateStyle: "full",
      timeStyle: "long",
    })

    const source = data.source || "Contact Page"
    const isAIVisualizerLead = source === "AI Visualizer"

    const projectTypeLabels: Record<string, string> = {
      "adu": "ADU Construction",
      "kitchen-remodel": "Kitchen Remodel",
      "bathroom-remodel": "Bathroom Remodel",
      "whole-home-remodel": "Whole Home Remodel",
      "tenant-improvement": "Tenant Improvement",
      "commercial": "Commercial Construction",
      "other": "Other",
    }

    // Build AI Visualizer section if applicable
    let aiVisualizerSection = ""
    let aiVisualizerSectionText = ""
    const meta = data.metadata
    
    if (isAIVisualizerLead && meta) {
      const metaProjectType = meta.projectType as string | undefined
      const metaStyle = meta.style as string | undefined
      const metaNotes = meta.notes as string | undefined
      const metaPrompt = meta.finalPrompt as string | undefined
      const hasUploadedImage = !!meta.uploadedImageDataUrl
      const uploadedFilename = meta.uploadedImageFilename as string | undefined

      aiVisualizerSection = `
    <h2 style="color: #1e3a5f; margin-top: 30px; font-size: 18px; border-bottom: 2px solid #10b981; padding-bottom: 10px;">🎨 AI Visualizer Details</h2>
    <table style="width: 100%; border-collapse: collapse;">
      ${metaProjectType ? `<tr><td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; font-weight: 600; color: #6b7280; width: 140px;">Project Type:</td><td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; color: #111827;">${escapeHtml(metaProjectType)}</td></tr>` : ""}
      ${metaStyle ? `<tr><td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; font-weight: 600; color: #6b7280;">Design Style:</td><td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; color: #111827;">${escapeHtml(metaStyle)}</td></tr>` : ""}
      ${metaNotes ? `<tr><td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; font-weight: 600; color: #6b7280;">Notes:</td><td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; color: #111827;">${escapeHtml(metaNotes)}</td></tr>` : ""}
      ${hasUploadedImage ? `<tr><td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; font-weight: 600; color: #6b7280;">Uploaded Photo:</td><td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; color: #10b981; font-weight: 500;">📎 ${escapeHtml(uploadedFilename || "user-photo")} (attached)</td></tr>` : ""}
    </table>
    ${metaPrompt ? `<div style="margin-top: 16px;"><strong style="color: #6b7280;">AI Prompt:</strong><div style="background: #f3f4f6; padding: 12px; border-radius: 8px; margin-top: 8px; font-size: 13px; color: #374151;">${escapeHtml(metaPrompt)}</div></div>` : ""}
`
      aiVisualizerSectionText = `
AI VISUALIZER DETAILS
---------------------
${metaProjectType ? `Project Type: ${metaProjectType}` : ""}
${metaStyle ? `Design Style: ${metaStyle}` : ""}
${metaNotes ? `Notes: ${metaNotes}` : ""}
${hasUploadedImage ? `Uploaded Photo: ${uploadedFilename || "user-photo"} (attached)` : ""}
${metaPrompt ? `AI Prompt: ${metaPrompt}` : ""}
`
    }

    const emailHTML = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Website Lead</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(135deg, #1e3a5f 0%, #2d5a87 100%); padding: 30px; border-radius: 10px 10px 0 0;">
    <h1 style="color: #ffffff; margin: 0; font-size: 24px;">${isAIVisualizerLead ? "🎨" : "🏗️"} New Website Lead</h1>
    <p style="color: #e0e0e0; margin: 10px 0 0 0; font-size: 14px;">Source: ${escapeHtml(source)}</p>
  </div>
  
  <div style="background: #f9fafb; padding: 30px; border: 1px solid #e5e7eb; border-top: none;">
    <h2 style="color: #1e3a5f; margin-top: 0; font-size: 18px; border-bottom: 2px solid #f59e0b; padding-bottom: 10px;">Contact Information</h2>
    
    <table style="width: 100%; border-collapse: collapse;">
      <tr>
        <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; font-weight: 600; color: #6b7280; width: 120px;">Name:</td>
        <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; color: #111827;">${escapeHtml(data.name)}</td>
      </tr>
      <tr>
        <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; font-weight: 600; color: #6b7280;">Email:</td>
        <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;"><a href="mailto:${escapeHtml(data.email)}" style="color: #2563eb; text-decoration: none;">${escapeHtml(data.email)}</a></td>
      </tr>
      <tr>
        <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; font-weight: 600; color: #6b7280;">Phone:</td>
        <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">${data.phone ? `<a href="tel:${escapeHtml(data.phone)}" style="color: #2563eb; text-decoration: none;">${escapeHtml(data.phone)}</a>` : '<span style="color: #9ca3af;">Not provided</span>'}</td>
      </tr>
      ${data.address ? `<tr>
        <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; font-weight: 600; color: #6b7280;">Address:</td>
        <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; color: #111827;">${escapeHtml(data.address)}</td>
      </tr>` : ""}
      ${data.projectType ? `<tr>
        <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; font-weight: 600; color: #6b7280;">Project Type:</td>
        <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;"><span style="background: #fef3c7; color: #92400e; padding: 4px 12px; border-radius: 20px; font-size: 13px; font-weight: 500;">${escapeHtml(projectTypeLabels[data.projectType] || data.projectType)}</span></td>
      </tr>` : ""}
    </table>

    <h2 style="color: #1e3a5f; margin-top: 30px; font-size: 18px; border-bottom: 2px solid #f59e0b; padding-bottom: 10px;">Message</h2>
    <div style="background: #ffffff; padding: 20px; border-radius: 8px; border: 1px solid #e5e7eb; white-space: pre-wrap;">${escapeHtml(data.message)}</div>

    ${aiVisualizerSection}

    <h2 style="color: #1e3a5f; margin-top: 30px; font-size: 18px; border-bottom: 2px solid #f59e0b; padding-bottom: 10px;">Submission Details</h2>
    <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
      <tr>
        <td style="padding: 8px 0; color: #6b7280; width: 120px;">Timestamp:</td>
        <td style="padding: 8px 0; color: #111827;">${timestamp}</td>
      </tr>
      <tr>
        <td style="padding: 8px 0; color: #6b7280;">Source:</td>
        <td style="padding: 8px 0; color: #111827;">${escapeHtml(source)}</td>
      </tr>
      <tr>
        <td style="padding: 8px 0; color: #6b7280;">IP Address:</td>
        <td style="padding: 8px 0; color: #111827;">${escapeHtml(clientIP)}</td>
      </tr>
      <tr>
        <td style="padding: 8px 0; color: #6b7280;">User Agent:</td>
        <td style="padding: 8px 0; color: #111827; word-break: break-all;">${escapeHtml(userAgent.substring(0, 200))}</td>
      </tr>
    </table>
  </div>
  
  <div style="background: #1e3a5f; padding: 20px; border-radius: 0 0 10px 10px; text-align: center;">
    <p style="color: #e0e0e0; margin: 0; font-size: 12px;">This email was sent from the Modern Construx website.</p>
  </div>
</body>
</html>
`

    const emailText = `
NEW WEBSITE LEAD - Modern Construx
==================================
Source: ${source}

CONTACT INFORMATION
-------------------
Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone || "Not provided"}
${data.address ? `Address: ${data.address}` : ""}
${data.projectType ? `Project Type: ${projectTypeLabels[data.projectType] || data.projectType}` : ""}

MESSAGE
-------
${data.message}
${aiVisualizerSectionText}

SUBMISSION DETAILS
------------------
Timestamp: ${timestamp}
Source: ${source}
IP Address: ${clientIP}
User Agent: ${userAgent.substring(0, 200)}

---
This email was sent from the Modern Construx website.
`

    // Build attachments array
    const attachments: Attachment[] = []

    // Attach user-uploaded image if present
    if (meta?.uploadedImageDataUrl) {
      const parsed = parseDataUrl(meta.uploadedImageDataUrl as string)
      if (parsed) {
        const filename = (meta.uploadedImageFilename as string) || `user-upload.${parsed.extension}`
        attachments.push({
          filename,
          content: parsed.buffer,
          contentType: parsed.contentType,
        })
        console.log(`[Contact] 📎 Attaching user-uploaded image: ${filename} (${Math.round(parsed.buffer.length / 1024)}KB)`)
      }
    }

    // Create Nodemailer transporter configured for Google Workspace
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: parseInt(smtpPort, 10),
      secure: false, // Use STARTTLS (port 587)
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
      // Required for Google Workspace
      tls: {
        ciphers: "SSLv3",
        rejectUnauthorized: false,
      },
    })

    // Attempt to send email
    try {
      const info = await transporter.sendMail({
        from: `"Modern Construx Website" <${mailFrom}>`,
        to: mailTo,
        replyTo: data.email,
        subject: `New Website Lead – Modern Construx – ${data.name}${isAIVisualizerLead ? " (AI Visualizer)" : ""}`,
        text: emailText,
        html: emailHTML,
        attachments: attachments.length > 0 ? attachments : undefined,
      })

      console.log(`[Contact] ✅ Email sent successfully to ${mailTo}`)
      console.log(`[Contact] Message ID: ${info.messageId}`)
      console.log(`[Contact] Source: ${source}, Attachments: ${attachments.length}`)

      return NextResponse.json({ ok: true })
      
    } catch (sendError) {
      // Log the actual error server-side for debugging
      console.error("[Contact] ❌ Failed to send email:", sendError)
      
      if (sendError instanceof Error) {
        console.error("[Contact] Error name:", sendError.name)
        console.error("[Contact] Error message:", sendError.message)
        
        // Check for common SMTP errors
        if (sendError.message.includes("Invalid login") || sendError.message.includes("authentication")) {
          console.error("[Contact] 💡 Check SMTP_USER and SMTP_PASS - you need a Google App Password, not your regular password")
        }
        if (sendError.message.includes("certificate") || sendError.message.includes("TLS")) {
          console.error("[Contact] 💡 TLS/Certificate issue - check SMTP_HOST and SMTP_PORT settings")
        }
      }
      
      // Return generic error to client (don't expose internal details)
      return NextResponse.json(
        { ok: false, error: "Failed to send email. Please try again or call us directly at (858) 744-0521." },
        { status: 500 }
      )
    }

  } catch (error) {
    console.error("[Contact] Unexpected error:", error)
    
    return NextResponse.json(
      { ok: false, error: "An unexpected error occurred. Please try again or call us directly at (858) 744-0521." },
      { status: 500 }
    )
  }
}

function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  }
  return text.replace(/[&<>"']/g, (char) => map[char] || char)
}
