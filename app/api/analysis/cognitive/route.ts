import { type NextRequest, NextResponse } from "next/server"
import { analyzeCognitivePatterns } from "@/lib/ai"
import { getCurrentUser } from "@/lib/supabase"

export async function POST(request: NextRequest) {
  try {
    const { sessionData, userHistory } = await request.json()

    const user = await getCurrentUser()
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const analysis = await analyzeCognitivePatterns({
      userId: user.id,
      sessionData,
      userHistory: userHistory || [],
    })

    return NextResponse.json({ analysis })
  } catch (error) {
    console.error("Cognitive analysis error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
