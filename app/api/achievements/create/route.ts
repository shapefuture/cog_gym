import { type NextRequest, NextResponse } from "next/server"
import { createAchievement } from "@/lib/supabase"
import { createAchievementNFT, generateAchievementMetadata } from "@/lib/nft"
import { getCurrentUser } from "@/lib/supabase"

export async function POST(request: NextRequest) {
  try {
    const { achievementType, userStats } = await request.json()

    const user = await getCurrentUser()
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Create achievement record
    const { data: achievement, error: achievementError } = await createAchievement({
      user_id: user.id,
      type: achievementType,
      earned_at: new Date().toISOString(),
    })

    if (achievementError) {
      return NextResponse.json({ error: achievementError }, { status: 500 })
    }

    // Create NFT for achievement
    const metadata = generateAchievementMetadata(achievementType, userStats)
    const { nft, error: nftError } = await createAchievementNFT(user.id, achievementType, metadata)

    if (nftError) {
      console.error("NFT creation error:", nftError)
      // Don't fail the achievement creation if NFT fails
    }

    return NextResponse.json({
      achievement,
      nft: nft || null,
      metadata,
    })
  } catch (error) {
    console.error("Create achievement error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
