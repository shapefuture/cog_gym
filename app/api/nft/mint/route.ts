import { type NextRequest, NextResponse } from "next/server"
import { createAchievementNFT, generateAchievementMetadata } from "@/lib/nft"
import { getCurrentUser } from "@/lib/supabase"

export async function POST(request: NextRequest) {
  try {
    const { achievementType, userStats } = await request.json()

    const user = await getCurrentUser()
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const metadata = generateAchievementMetadata(achievementType, userStats)
    const { nft, error } = await createAchievementNFT(user.id, achievementType, metadata)

    if (error) {
      return NextResponse.json({ error }, { status: 500 })
    }

    return NextResponse.json({ nft, metadata })
  } catch (error) {
    console.error("NFT minting error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
