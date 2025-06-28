import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://demo.supabase.co"
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "demo-key"

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export interface User {
  id: string
  email: string
  created_at: string
  updated_at: string
  profile?: UserProfile
}

export interface UserProfile {
  id: string
  user_id: string
  first_name?: string
  last_name?: string
  bio?: string
  avatar_url?: string
  cognitive_score: number
  streak_days: number
  total_sessions: number
  created_at: string
  updated_at: string
}

export interface TrainingSession {
  id: string
  user_id: string
  type: string
  score: number
  duration: number
  biases_detected: string[]
  completed_at: string
  data: any
}

export interface Achievement {
  id: string
  user_id: string
  type: string
  title: string
  description: string
  earned_at: string
  nft_token_id?: string
}

export async function getCurrentUser(): Promise<User | null> {
  try {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser()
    if (error || !user) return null

    // Get user profile
    const { data: profile } = await supabase.from("profiles").select("*").eq("user_id", user.id).single()

    return {
      id: user.id,
      email: user.email || "",
      created_at: user.created_at || "",
      updated_at: user.updated_at || "",
      profile,
    }
  } catch (error) {
    console.error("Error getting current user:", error)
    return null
  }
}

export async function signUp(email: string, password: string) {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    })

    if (error) throw error

    // Create user profile
    if (data.user) {
      await supabase.from("profiles").insert({
        user_id: data.user.id,
        cognitive_score: 0,
        streak_days: 0,
        total_sessions: 0,
      })
    }

    return { data, error: null }
  } catch (error) {
    return { data: null, error: error.message }
  }
}

export async function signIn(email: string, password: string) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) throw error
    return { data, error: null }
  } catch (error) {
    return { data: null, error: error.message }
  }
}

export async function signOut() {
  try {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
    return { error: null }
  } catch (error) {
    return { error: error.message }
  }
}

export async function saveTrainingSession(session: Partial<TrainingSession>) {
  try {
    const { data, error } = await supabase.from("training_sessions").insert(session).select().single()

    if (error) throw error

    // Update user stats
    const user = await getCurrentUser()
    if (user?.profile) {
      await supabase
        .from("profiles")
        .update({
          total_sessions: user.profile.total_sessions + 1,
          cognitive_score: Math.min(100, user.profile.cognitive_score + (session.score || 0) / 10),
        })
        .eq("user_id", user.id)
    }

    return { data, error: null }
  } catch (error) {
    return { data: null, error: error.message }
  }
}

export async function getTrainingSessions(userId: string, limit = 10) {
  try {
    const { data, error } = await supabase
      .from("training_sessions")
      .select("*")
      .eq("user_id", userId)
      .order("completed_at", { ascending: false })
      .limit(limit)

    if (error) throw error
    return { data, error: null }
  } catch (error) {
    return { data: [], error: error.message }
  }
}

export async function createAchievement(achievement: Partial<Achievement>) {
  try {
    const { data, error } = await supabase.from("achievements").insert(achievement).select().single()

    if (error) throw error
    return { data, error: null }
  } catch (error) {
    return { data: null, error: error.message }
  }
}

export async function getUserAchievements(userId: string) {
  try {
    const { data, error } = await supabase
      .from("achievements")
      .select("*")
      .eq("user_id", userId)
      .order("earned_at", { ascending: false })

    if (error) throw error
    return { data, error: null }
  } catch (error) {
    return { data: [], error: error.message }
  }
}

export async function getLeaderboard(limit = 10) {
  try {
    const { data, error } = await supabase
      .from("profiles")
      .select("*, users(email)")
      .order("cognitive_score", { ascending: false })
      .limit(limit)

    if (error) throw error
    return { data, error: null }
  } catch (error) {
    return { data: [], error: error.message }
  }
}

export async function updateUserProfile(userId: string, updates: Partial<UserProfile>) {
  try {
    const { data, error } = await supabase.from("profiles").update(updates).eq("user_id", userId).select().single()

    if (error) throw error
    return { data, error: null }
  } catch (error) {
    return { data: null, error: error.message }
  }
}

// Demo mode fallbacks
export const demoUser: User = {
  id: "demo-user",
  email: "demo@cognitivegym.com",
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
  profile: {
    id: "demo-profile",
    user_id: "demo-user",
    first_name: "Demo",
    last_name: "User",
    bio: "Exploring cognitive training",
    cognitive_score: 78,
    streak_days: 7,
    total_sessions: 47,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
}

export const demoSessions: TrainingSession[] = [
  {
    id: "session-1",
    user_id: "demo-user",
    type: "confirmation-bias",
    score: 85,
    duration: 420,
    biases_detected: ["confirmation-bias", "anchoring"],
    completed_at: new Date(Date.now() - 86400000).toISOString(),
    data: { questions: 5, correct: 4 },
  },
  {
    id: "session-2",
    user_id: "demo-user",
    type: "anchoring-bias",
    score: 92,
    duration: 380,
    biases_detected: ["anchoring"],
    completed_at: new Date(Date.now() - 172800000).toISOString(),
    data: { questions: 3, correct: 3 },
  },
]

export const demoAchievements: Achievement[] = [
  {
    id: "achievement-1",
    user_id: "demo-user",
    type: "first-session",
    title: "First Steps",
    description: "Completed your first training session",
    earned_at: new Date(Date.now() - 604800000).toISOString(),
    nft_token_id: "nft-001",
  },
  {
    id: "achievement-2",
    user_id: "demo-user",
    type: "week-streak",
    title: "Week Warrior",
    description: "Maintained a 7-day training streak",
    earned_at: new Date().toISOString(),
    nft_token_id: "nft-002",
  },
]
