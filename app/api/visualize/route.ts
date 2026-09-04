import { type NextRequest, NextResponse } from "next/server"

interface VisualizeRequest {
  projectType: "Bathroom" | "Kitchen" | "ADU" | "Exterior" | "Living Room" | "Bedroom" | "Other"
  style: "Modern" | "Spanish" | "Farmhouse" | "Luxury" | "Minimal" | "Industrial" | "Coastal" | "Other"
  notes?: string
  prompt?: string // Optional override
}

// Simple in-memory rate limiting for visualize endpoint
const rateLimitMap = new Map<string, { count: number; resetTime: number }>()
const RATE_LIMIT_WINDOW = 60 * 1000 // 1 minute
const MAX_REQUESTS = 3 // 3 requests per minute per IP (more restrictive for AI generation)

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

// Build optimized prompt for construction/remodel visualization
function buildPrompt(data: VisualizeRequest): string {
  if (data.prompt) {
    // User provided custom prompt - still append quality modifiers
    return `${data.prompt}, photorealistic, natural lighting, realistic proportions, high-end materials, no warped objects, no extra doors, no weird fixtures, no text, no watermark, architectural photography, interior design magazine quality`
  }

  const projectDescriptors: Record<string, string> = {
    "Bathroom": "luxurious bathroom renovation with modern fixtures, elegant vanity, walk-in shower",
    "Kitchen": "high-end kitchen remodel with premium cabinetry, marble countertops, professional appliances",
    "ADU": "beautiful accessory dwelling unit, modern guest house, backyard living space",
    "Exterior": "stunning home exterior renovation, curb appeal, landscaping",
    "Living Room": "elegant living room redesign, comfortable seating, stylish decor",
    "Bedroom": "serene master bedroom renovation, cozy atmosphere, designer furniture",
    "Other": "beautiful home renovation, quality craftsmanship",
  }

  const styleDescriptors: Record<string, string> = {
    "Modern": "modern contemporary design, clean lines, neutral palette, sleek finishes",
    "Spanish": "Spanish Mediterranean style, warm terracotta, wrought iron details, arched doorways",
    "Farmhouse": "farmhouse style, shiplap walls, warm wood tones, rustic charm",
    "Luxury": "luxury high-end design, premium materials, sophisticated details, designer finishes",
    "Minimal": "minimalist design, uncluttered spaces, functional elegance, simple forms",
    "Industrial": "industrial style, exposed brick, metal accents, urban aesthetic",
    "Coastal": "coastal design, light colors, natural textures, beach-inspired decor",
    "Other": "beautiful interior design",
  }

  const project = projectDescriptors[data.projectType] || projectDescriptors["Other"]
  const style = styleDescriptors[data.style] || styleDescriptors["Other"]
  const notes = data.notes ? `, ${data.notes}` : ""

  return `${project}, ${style}${notes}, photorealistic, natural lighting, realistic proportions, high-end materials, no warped objects, no extra doors, no weird fixtures, no text, no watermark, architectural photography, interior design magazine quality, 8k resolution, professional real estate photo`
}

export async function POST(request: NextRequest) {
  const clientIP = getClientIP(request)

  // Check rate limit
  const rateLimitResult = checkRateLimit(clientIP)
  if (!rateLimitResult.allowed) {
    return NextResponse.json(
      { ok: false, error: "Too many requests. Please wait a moment before generating another image." },
      { 
        status: 429,
        headers: {
          "Retry-After": String(rateLimitResult.retryAfter || 60)
        }
      }
    )
  }

  try {
    const data: VisualizeRequest = await request.json()

    // Validate required fields
    if (!data.projectType) {
      return NextResponse.json(
        { ok: false, error: "Project type is required" },
        { status: 400 }
      )
    }

    if (!data.style) {
      return NextResponse.json(
        { ok: false, error: "Design style is required" },
        { status: 400 }
      )
    }

    // Check for HF API key - gracefully disable if not configured
    const hfApiKey = process.env.HF_API_KEY
    if (!hfApiKey) {
      console.log("[Visualize] AI Visualizer disabled (HF_API_KEY not configured)")
      return NextResponse.json(
        { ok: false, error: "AI Visualizer is currently disabled", disabled: true },
        { status: 501 }
      )
    }

    // Build the prompt
    const finalPrompt = buildPrompt(data)
    console.log(`[Visualize] Generating image for: ${data.projectType} / ${data.style}`)
    console.log(`[Visualize] Prompt: ${finalPrompt.substring(0, 200)}...`)

    // Call Hugging Face Inference API
    // Using Stable Diffusion XL which is good for photorealistic images
    const HF_MODEL = "stabilityai/stable-diffusion-xl-base-1.0"
    const HF_API_URL = `https://api-inference.huggingface.co/models/${HF_MODEL}`

    const response = await fetch(HF_API_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${hfApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        inputs: finalPrompt,
        parameters: {
          num_inference_steps: 30,
          guidance_scale: 7.5,
          width: 1024,
          height: 768,
        },
        options: {
          wait_for_model: true,
        },
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error(`[Visualize] HF API error: ${response.status} - ${errorText}`)
      
      // Handle specific errors
      if (response.status === 503) {
        return NextResponse.json(
          { ok: false, error: "AI model is loading. Please try again in 30 seconds." },
          { status: 503 }
        )
      }
      
      if (response.status === 401) {
        return NextResponse.json(
          { ok: false, error: "AI service authentication failed. Please contact support." },
          { status: 500 }
        )
      }

      return NextResponse.json(
        { ok: false, error: "Failed to generate image. Please try again." },
        { status: 500 }
      )
    }

    // HF returns binary image data
    const imageBuffer = await response.arrayBuffer()
    const base64Image = Buffer.from(imageBuffer).toString("base64")

    console.log(`[Visualize] Image generated successfully (${Math.round(base64Image.length / 1024)}KB)`)

    return NextResponse.json({
      ok: true,
      image_base64: base64Image,
      final_prompt: finalPrompt,
      projectType: data.projectType,
      style: data.style,
    })

  } catch (error) {
    console.error("[Visualize] Error:", error)
    return NextResponse.json(
      { ok: false, error: "An error occurred while generating the image. Please try again." },
      { status: 500 }
    )
  }
}

