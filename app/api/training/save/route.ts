import { type NextRequest, NextResponse } from "next/server"
import { saveTrainingSession } from "@/lib/supabase"
import { getCurrentUser } from "@/lib/supabase"

export async function POST(request: NextRequest) {
  try {
    const sessionData = await request.json()

    const user = await getCurrentUser()
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { data, error } = await saveTrainingSession({
      ...sessionData,
      user_id: user.id,
      created_at: new Date().toISOString(),
    })

    if (error) {
      return NextResponse.json({ error }, { status: 500 })
    }

    return NextResponse.json({ session: data })
  } catch (error) {
    console.error("Save training session error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
