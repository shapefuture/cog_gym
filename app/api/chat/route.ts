import { type NextRequest, NextResponse } from "next/server"
import { chatWithAI } from "@/lib/ai"
import { getCurrentUser } from "@/lib/supabase"

export async function POST(request: NextRequest) {
  try {
    const { message, conversationHistory } = await request.json()

    const user = await getCurrentUser()
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { response, error } = await chatWithAI(message, conversationHistory || [])

    if (error) {
      return NextResponse.json({ error }, { status: 500 })
    }

    return NextResponse.json({ response })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
