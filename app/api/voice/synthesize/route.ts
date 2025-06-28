import { type NextRequest, NextResponse } from "next/server"
import { textToSpeech } from "@/lib/voice"

export async function POST(request: NextRequest) {
  try {
    const { text, voiceId, speed, volume } = await request.json()

    if (!text) {
      return NextResponse.json({ error: "Text is required" }, { status: 400 })
    }

    const { audioUrl, error } = await textToSpeech(text, {
      voiceId,
      speed,
      volume,
    })

    if (error) {
      return NextResponse.json({ error }, { status: 500 })
    }

    return NextResponse.json({ audioUrl })
  } catch (error) {
    console.error("Voice synthesis error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
