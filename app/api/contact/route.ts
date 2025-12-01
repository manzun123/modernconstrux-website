import { type NextRequest, NextResponse } from "next/server"

interface ContactFormData {
  name: string
  email: string
  phone: string
  address?: string
  projectType: string
  message: string
}

export async function POST(request: NextRequest) {
  try {
    const data: ContactFormData = await request.json()

    // Validate required fields
    if (!data.name || !data.email || !data.phone || !data.projectType || !data.message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(data.email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 })
    }

    // TODO: Integrate with your preferred service:
    // - Send email via SendGrid, Resend, or other email service
    // - Save to database (Supabase, Neon, etc.)
    // - Send to CRM (HubSpot, Salesforce, etc.)
    // - Send Slack notification

    console.log("Contact form submission:", {
      name: data.name,
      email: data.email,
      phone: data.phone,
      address: data.address || "Not provided",
      projectType: data.projectType,
      message: data.message,
      timestamp: new Date().toISOString(),
    })

    // For now, just return success
    return NextResponse.json({
      success: true,
      message: "Thank you for your inquiry. We will contact you within 24 hours.",
    })
  } catch (error) {
    console.error("Contact form error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
