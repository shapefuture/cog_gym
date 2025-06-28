export interface NFTMetadata {
  name: string
  description: string
  image: string
  attributes: Array<{
    trait_type: string
    value: string | number
  }>
  achievement_type: string
  earned_date: string
  cognitive_score: number
}

export interface NFT {
  id: string
  token_id: string
  contract_address: string
  metadata: NFTMetadata
  owner_address: string
  created_at: string
}

export async function createAchievementNFT(
  userId: string,
  achievementType: string,
  userStats: any,
): Promise<{ nft: NFT | null; error: string | null }> {
  try {
    // Demo mode - return mock NFT
    if (!process.env.BLOCKCHAIN_PRIVATE_KEY || process.env.BLOCKCHAIN_PRIVATE_KEY === "demo-key") {
      const mockNFT: NFT = {
        id: `nft_${Date.now()}`,
        token_id: `${Date.now()}`,
        contract_address: "0x1234567890123456789012345678901234567890",
        metadata: generateAchievementMetadata(achievementType, userStats),
        owner_address: `0x${userId.slice(0, 40)}`,
        created_at: new Date().toISOString(),
      }

      return { nft: mockNFT, error: null }
    }

    // In production, you would:
    // 1. Connect to blockchain (Ethereum, Polygon, etc.)
    // 2. Deploy or interact with NFT smart contract
    // 3. Mint the NFT with metadata
    // 4. Return the transaction hash and token ID

    const metadata = generateAchievementMetadata(achievementType, userStats)

    // Mock blockchain interaction
    const tokenId = Date.now().toString()
    const contractAddress = process.env.NFT_CONTRACT_ADDRESS || "0x1234567890123456789012345678901234567890"

    const nft: NFT = {
      id: `nft_${tokenId}`,
      token_id: tokenId,
      contract_address: contractAddress,
      metadata,
      owner_address: `0x${userId.slice(0, 40)}`,
      created_at: new Date().toISOString(),
    }

    return { nft, error: null }
  } catch (error) {
    console.error("NFT creation error:", error)
    return {
      nft: null,
      error: error instanceof Error ? error.message : "Failed to create NFT",
    }
  }
}

export function generateAchievementMetadata(achievementType: string, userStats: any): NFTMetadata {
  const achievementData = getAchievementData(achievementType)

  return {
    name: achievementData.name,
    description: achievementData.description,
    image: achievementData.image,
    attributes: [
      {
        trait_type: "Achievement Type",
        value: achievementType,
      },
      {
        trait_type: "Cognitive Score",
        value: userStats.cognitiveScore || 0,
      },
      {
        trait_type: "Training Sessions",
        value: userStats.totalSessions || 0,
      },
      {
        trait_type: "Streak Days",
        value: userStats.streakDays || 0,
      },
      {
        trait_type: "Rarity",
        value: achievementData.rarity,
      },
      {
        trait_type: "Difficulty",
        value: achievementData.difficulty,
      },
    ],
    achievement_type: achievementType,
    earned_date: new Date().toISOString(),
    cognitive_score: userStats.cognitiveScore || 0,
  }
}

function getAchievementData(type: string) {
  const achievements = {
    "first-session": {
      name: "First Steps",
      description: "Completed your first cognitive training session",
      image: "https://example.com/nft/first-steps.png",
      rarity: "Common",
      difficulty: "Beginner",
    },
    "week-streak": {
      name: "Week Warrior",
      description: "Maintained a 7-day training streak",
      image: "https://example.com/nft/week-warrior.png",
      rarity: "Uncommon",
      difficulty: "Intermediate",
    },
    "bias-master": {
      name: "Bias Master",
      description: "Achieved 90%+ accuracy in bias detection",
      image: "https://example.com/nft/bias-master.png",
      rarity: "Rare",
      difficulty: "Advanced",
    },
    "cognitive-elite": {
      name: "Cognitive Elite",
      description: "Reached the top 1% of cognitive scores",
      image: "https://example.com/nft/cognitive-elite.png",
      rarity: "Legendary",
      difficulty: "Expert",
    },
    "perfect-score": {
      name: "Perfect Mind",
      description: "Achieved a perfect score in advanced training",
      image: "https://example.com/nft/perfect-mind.png",
      rarity: "Mythic",
      difficulty: "Master",
    },
  }

  return (
    achievements[type] || {
      name: "Unknown Achievement",
      description: "A mysterious cognitive achievement",
      image: "https://example.com/nft/unknown.png",
      rarity: "Common",
      difficulty: "Unknown",
    }
  )
}

export async function getUserNFTs(userId: string): Promise<{ nfts: NFT[]; error: string | null }> {
  try {
    // Demo mode - return mock NFTs
    const mockNFTs: NFT[] = [
      {
        id: "nft_1",
        token_id: "1001",
        contract_address: "0x1234567890123456789012345678901234567890",
        metadata: generateAchievementMetadata("first-session", { cognitiveScore: 65, totalSessions: 1, streakDays: 1 }),
        owner_address: `0x${userId.slice(0, 40)}`,
        created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: "nft_2",
        token_id: "1002",
        contract_address: "0x1234567890123456789012345678901234567890",
        metadata: generateAchievementMetadata("week-streak", { cognitiveScore: 78, totalSessions: 15, streakDays: 7 }),
        owner_address: `0x${userId.slice(0, 40)}`,
        created_at: new Date().toISOString(),
      },
    ]

    return { nfts: mockNFTs, error: null }
  } catch (error) {
    console.error("Get user NFTs error:", error)
    return {
      nfts: [],
      error: error instanceof Error ? error.message : "Failed to get NFTs",
    }
  }
}

export async function transferNFT(
  tokenId: string,
  fromAddress: string,
  toAddress: string,
): Promise<{ success: boolean; transactionHash?: string; error?: string }> {
  try {
    // Demo mode
    if (!process.env.BLOCKCHAIN_PRIVATE_KEY || process.env.BLOCKCHAIN_PRIVATE_KEY === "demo-key") {
      return {
        success: true,
        transactionHash: `0x${Date.now().toString(16)}`,
      }
    }

    // In production, you would:
    // 1. Connect to blockchain
    // 2. Call the transfer function on the NFT contract
    // 3. Return the transaction hash

    const mockTransactionHash = `0x${Date.now().toString(16)}`

    return {
      success: true,
      transactionHash: mockTransactionHash,
    }
  } catch (error) {
    console.error("NFT transfer error:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to transfer NFT",
    }
  }
}

export async function getNFTMarketValue(tokenId: string): Promise<{ value: number; currency: string; error?: string }> {
  try {
    // Demo mode - return mock market value
    const baseValue = 0.1 // ETH
    const randomMultiplier = Math.random() * 2 + 0.5 // 0.5x to 2.5x

    return {
      value: Number((baseValue * randomMultiplier).toFixed(4)),
      currency: "ETH",
    }
  } catch (error) {
    console.error("Get NFT market value error:", error)
    return {
      value: 0,
      currency: "ETH",
      error: error instanceof Error ? error.message : "Failed to get market value",
    }
  }
}
