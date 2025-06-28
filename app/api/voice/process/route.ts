import { type NextRequest, NextResponse } from "next/server"
import { textToSpeech, processVoiceInput } from "@/lib/voice"
import { generateAvatarResponse } from "@/lib/ai"

export async function POST(request: NextRequest) {
  try {
    const { message, audioData, includeAvatar = false } = await request.json()

    let voiceAnalysis = null
    let transcript = message

    // Process audio input if provided
    if (audioData) {
      // Convert base64 audio to blob
      const audioBuffer = Buffer.from(audioData, "base64")
      const audioBlob = new Blob([audioBuffer], { type: "audio/webm" })

      const voiceResult = await processVoiceInput(audioBlob)
      voiceAnalysis = voiceResult.voiceMetrics
      transcript = voiceResult.transcript || message
    }

    // Generate AI response with avatar data if requested
    let aiResponse
    if (includeAvatar) {
      aiResponse = await generateAvatarResponse(transcript, voiceAnalysis?.emotion)
    } else {
      const { response } = await import("@/lib/ai").then((m) =>
        m.chatWithAI(transcript, [], {
          emotion: voiceAnalysis?.emotion,
        }),
      )
      aiResponse = { response }
    }

    // Generate speech audio
    const { audioUrl, error: ttsError } = await textToSpeech(aiResponse.response)

    return NextResponse.json({
      response: aiResponse.response,
      audioUrl,
      animation: aiResponse.animation || "Idle",
      facialExpression: aiResponse.facialExpression || "default",
      voiceAnalysis,
      transcript,
      error: ttsError,
    })
  } catch (error) {
    console.error("Voice processing error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
