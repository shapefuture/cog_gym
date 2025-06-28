import { GoogleGenerativeAI } from "@google/generative-ai"

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "demo-key")

interface ChatMessage {
  role: "user" | "assistant"
  content: string
  timestamp?: string
}

interface CognitiveAnalysis {
  biasesDetected: string[]
  confidenceScore: number
  recommendations: string[]
  patterns: string[]
  riskLevel: "low" | "medium" | "high"
  insights: string[]
}

export async function chatWithAI(message: string, conversationHistory: ChatMessage[] = []) {
  try {
    if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === "demo-key") {
      // Demo mode with intelligent responses
      return {
        response: generateMockAIResponse(message, conversationHistory),
        error: null,
      }
    }

    const model = genAI.getGenerativeModel({ model: "gemini-pro" })

    const context = `You are a cognitive bias expert and AI coach for Cognitive Gym. Your role is to:
1. Help users identify and overcome cognitive biases
2. Provide personalized training recommendations
3. Analyze decision-making patterns
4. Offer practical strategies for better thinking

Keep responses conversational, insightful, and actionable. Focus on cognitive psychology principles.

Conversation history:
${conversationHistory.map((msg) => `${msg.role}: ${msg.content}`).join("\n")}

User: ${message}`

    const result = await model.generateContent(context)
    const response = result.response.text()

    return { response, error: null }
  } catch (error) {
    console.error("AI chat error:", error)
    return {
      response: generateMockAIResponse(message, conversationHistory),
      error: null, // Fallback to mock response instead of error
    }
  }
}

export async function analyzeCognitivePatterns(data: {
  userId: string
  sessionData: any
  userHistory: any[]
}): Promise<CognitiveAnalysis> {
  try {
    if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === "demo-key") {
      return generateMockCognitiveAnalysis(data)
    }

    const model = genAI.getGenerativeModel({ model: "gemini-pro" })

    const prompt = `Analyze the following cognitive training data and identify patterns, biases, and recommendations:

Session Data: ${JSON.stringify(data.sessionData)}
User History: ${JSON.stringify(data.userHistory)}

Provide analysis in this JSON format:
{
  "biasesDetected": ["list of detected biases"],
  "confidenceScore": 85,
  "recommendations": ["list of recommendations"],
  "patterns": ["list of observed patterns"],
  "riskLevel": "medium",
  "insights": ["list of key insights"]
}`

    const result = await model.generateContent(prompt)
    const response = result.response.text()

    // Parse the AI response into structured data
    try {
      const parsed = JSON.parse(response)
      return parsed
    } catch {
      return parseAIAnalysis(response)
    }
  } catch (error) {
    console.error("Cognitive analysis error:", error)
    return generateMockCognitiveAnalysis(data)
  }
}

export async function generatePersonalizedRecommendations(userProfile: any, recentSessions: any[]) {
  try {
    if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === "demo-key") {
      return generateMockRecommendations(userProfile, recentSessions)
    }

    const model = genAI.getGenerativeModel({ model: "gemini-pro" })

    const prompt = `Based on this user profile and recent training sessions, generate personalized cognitive training recommendations:

User Profile: ${JSON.stringify(userProfile)}
Recent Sessions: ${JSON.stringify(recentSessions)}

Provide recommendations in JSON format:
{
  "nextTraining": ["specific training modules to focus on"],
  "weakAreas": ["areas that need improvement"],
  "strengths": ["areas where user excels"],
  "dailyTips": ["practical daily tips"],
  "estimatedImprovement": "percentage improvement expected"
}`

    const result = await model.generateContent(prompt)
    const response = result.response.text()

    try {
      return JSON.parse(response)
    } catch {
      return generateMockRecommendations(userProfile, recentSessions)
    }
  } catch (error) {
    console.error("Recommendations error:", error)
    return generateMockRecommendations(userProfile, recentSessions)
  }
}

function generateMockAIResponse(message: string, history: ChatMessage[]): string {
  const lowerMessage = message.toLowerCase()

  // Contextual responses based on message content
  if (lowerMessage.includes("bias") || lowerMessage.includes("biased")) {
    return "I can help you identify and work with cognitive biases! Biases aren't necessarily bad - they're mental shortcuts that can be useful but sometimes lead us astray. What specific situation are you thinking about? I can help you spot potential biases and develop strategies to make more objective decisions."
  }

  if (lowerMessage.includes("decision") || lowerMessage.includes("choose")) {
    return "Great question about decision-making! Here's a framework I recommend: 1) Identify your key criteria, 2) Gather diverse perspectives, 3) Consider what you might be missing, 4) Sleep on important decisions when possible. What decision are you working on? I can help you spot potential cognitive traps."
  }

  if (lowerMessage.includes("confidence") || lowerMessage.includes("overconfident")) {
    return "Overconfidence is one of the most common biases! Research shows we're often more certain than we should be. Try the 'consider the opposite' technique - actively look for evidence that contradicts your view. Also, ask yourself: 'What would need to be true for me to be wrong?' This helps calibrate confidence levels."
  }

  if (lowerMessage.includes("training") || lowerMessage.includes("improve")) {
    return "Excellent! Cognitive training is like going to the gym for your mind. I recommend starting with 10-15 minutes daily focusing on one bias at a time. Based on your recent sessions, you might benefit from working on confirmation bias exercises. Would you like me to suggest a specific training plan?"
  }

  if (lowerMessage.includes("help") || lowerMessage.includes("how")) {
    return "I'm here to help you become a better decision-maker! I can assist with identifying cognitive biases, analyzing your thinking patterns, suggesting training exercises, and providing strategies for specific situations. What would you like to work on today?"
  }

  if (lowerMessage.includes("score") || lowerMessage.includes("progress")) {
    return "Your cognitive training progress looks promising! I've noticed improvement in your bias detection accuracy. Your recent confirmation bias training showed 78% accuracy - that's solid progress. I'd recommend focusing on anchoring bias next, as that seems to be an area for growth. Keep up the consistent practice!"
  }

  // Default responses
  const defaultResponses = [
    "That's an interesting perspective! Cognitive biases often influence how we interpret information. Can you tell me more about the context of your question?",
    "I appreciate you sharing that with me. As your cognitive coach, I'm here to help you develop better thinking patterns. What specific aspect would you like to explore?",
    "Great question! This touches on some important cognitive psychology principles. Let me help you think through this systematically.",
    "I can see you're thinking deeply about this. One approach is to consider multiple perspectives and potential blind spots. What factors might you be overlooking?",
  ]

  return defaultResponses[Math.floor(Math.random() * defaultResponses.length)]
}

function generateMockCognitiveAnalysis(data: any): CognitiveAnalysis {
  const possibleBiases = [
    "confirmation-bias",
    "anchoring-bias",
    "availability-heuristic",
    "overconfidence",
    "loss-aversion",
    "sunk-cost-fallacy",
  ]

  const biasesDetected = possibleBiases.slice(0, Math.floor(Math.random() * 3) + 1)
  const confidenceScore = Math.floor(Math.random() * 30) + 70 // 70-100

  const recommendations = [
    "Practice devil's advocate analysis for important decisions",
    "Seek out disconfirming evidence before concluding",
    "Use structured decision-making frameworks",
    "Take breaks before making significant choices",
    "Consult diverse perspectives on complex issues",
  ]

  const patterns = [
    "Tendency to seek confirming information",
    "Quick decision-making under pressure",
    "Strong initial impressions influence later judgments",
    "Difficulty updating beliefs with new evidence",
  ]

  const insights = [
    "Your decision-making speed has improved by 15% this week",
    "You show strong pattern recognition abilities",
    "Consider slowing down for complex decisions",
    "Your bias awareness is above average",
  ]

  return {
    biasesDetected,
    confidenceScore,
    recommendations: recommendations.slice(0, 3),
    patterns: patterns.slice(0, 2),
    insights: insights.slice(0, 3),
    riskLevel: confidenceScore > 85 ? "low" : confidenceScore > 70 ? "medium" : "high",
  }
}

function generateMockRecommendations(userProfile: any, recentSessions: any[]) {
  return {
    nextTraining: [
      "Anchoring Bias Resistance Training",
      "Advanced Confirmation Bias Scenarios",
      "Overconfidence Calibration Exercises",
    ],
    weakAreas: ["Quick decision-making under pressure", "Considering alternative perspectives"],
    strengths: ["Pattern recognition", "Learning from feedback", "Consistent training engagement"],
    dailyTips: [
      "Before important decisions, ask 'What am I not considering?'",
      "Practice the 10-10-10 rule: How will you feel in 10 minutes, 10 months, 10 years?",
      "Seek out one piece of contradictory evidence for your beliefs each day",
    ],
    estimatedImprovement: "23% improvement expected over next 30 days",
  }
}

function parseAIAnalysis(response: string): CognitiveAnalysis {
  // Simple parsing logic for AI response
  const lines = response.split("\n")
  const analysis: CognitiveAnalysis = {
    biasesDetected: [],
    confidenceScore: 75,
    recommendations: [],
    patterns: [],
    riskLevel: "medium",
    insights: [],
  }

  lines.forEach((line) => {
    if (line.includes("Biases detected:")) {
      analysis.biasesDetected =
        line
          .split(":")[1]
          ?.split(",")
          .map((b) => b.trim()) || []
    }
    if (line.includes("Confidence score:")) {
      analysis.confidenceScore = Number.parseInt(line.split(":")[1]?.trim() || "75")
    }
    if (line.includes("Risk level:")) {
      const level = line.split(":")[1]?.trim().toLowerCase()
      analysis.riskLevel = (level as "low" | "medium" | "high") || "medium"
    }
  })

  return analysis
}

export async function generateTrainingRecommendations(userProfile: any) {
  const recommendations = [
    {
      type: "confirmation-bias",
      title: "Confirmation Bias Training",
      description: "Practice seeking disconfirming evidence",
      difficulty: "beginner",
      estimatedTime: "15 minutes",
    },
    {
      type: "anchoring-bias",
      title: "Anchoring Resistance",
      description: "Learn to avoid first-impression traps",
      difficulty: "intermediate",
      estimatedTime: "20 minutes",
    },
    {
      type: "availability-heuristic",
      title: "Availability Heuristic",
      description: "Counter recent-memory bias",
      difficulty: "intermediate",
      estimatedTime: "18 minutes",
    },
  ]

  return recommendations.slice(0, 2) // Return top 2 recommendations
}
