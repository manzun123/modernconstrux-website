import { NextResponse } from "next/server"
import { generateRemodelImage, type RemodelStyle } from "@/lib/remodel-ai"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { image, style } = body as { image: string; style: RemodelStyle }

    if (!image) {
      return NextResponse.json({ success: false, error: "No image provided" }, { status: 400 })
    }

    if (!style) {
      return NextResponse.json({ success: false, error: "No style selected" }, { status: 400 })
    }

    // Extract base64 data if it includes the data URL prefix
    const base64Data = image.includes("base64,") ? image.split("base64,")[1] : image

    const result = await generateRemodelImage(base64Data, style)

    return NextResponse.json(result)
  } catch (error) {
    console.error("[Remodel API Error]", error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Failed to process image",
      },
      { status: 500 },
    )
  }
}
