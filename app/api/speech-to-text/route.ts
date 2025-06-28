import { type NextRequest, NextResponse } from "next/server"
import { speechToText } from "@/lib/voice"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const audioFile = formData.get("audio") as File

    if (!audioFile) {
      return NextResponse.json({ error: "Audio file is required" }, { status: 400 })
    }

    // Convert File to Blob
    const audioBlob = new Blob([await audioFile.arrayBuffer()], { type: audioFile.type })

    const { text, error } = await speechToText(audioBlob)

    if (error) {
      return NextResponse.json({ error }, { status: 500 })
    }

    return NextResponse.json({ text })
  } catch (error) {
    console.error("Speech-to-text error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
