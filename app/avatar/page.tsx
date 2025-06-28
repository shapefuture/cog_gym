"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowLeft, Settings } from "lucide-react"
import Link from "next/link"
import { VoiceChat } from "@/components/voice-chat"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function AvatarPage() {
  const [avatarState, setAvatarState] = useState({
    animation: "Idle",
    facialExpression: "default",
    isPlaying: false,
  })

  const [showSettings, setShowSettings] = useState(false)

  const handleAvatarResponse = (response: any) => {
    setAvatarState({
      animation: response.animation || "Idle",
      facialExpression: response.facialExpression || "default",
      isPlaying: !!response.audioUrl,
    })

    // Reset to idle after response
    setTimeout(() => {
      setAvatarState((prev) => ({
        ...prev,
        animation: "Idle",
        facialExpression: "default",
        isPlaying: false,
      }))
    }, 5000)
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-neutral-800/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/dashboard" className="text-white/60 hover:text-white transition-colors">
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <div>
                <h1 className="text-lg font-medium">AI Avatar Coach</h1>
                <p className="text-sm text-white/60">Interactive cognitive training with your AI companion</p>
              </div>
            </div>

            <Button
              onClick={() => setShowSettings(!showSettings)}
              variant="ghost"
              size="sm"
              className="text-white/60 hover:text-white"
            >
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Avatar Display */}
          <div className="space-y-6">
            <Card className="p-8 bg-neutral-900/40 border-neutral-800/50 backdrop-blur-sm">
              <div className="aspect-square bg-neutral-800/30 rounded-2xl flex items-center justify-center relative overflow-hidden">
                {/* Avatar Placeholder - In production, this would be the 3D avatar */}
                <motion.div
                  className="w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center"
                  animate={{
                    scale: avatarState.isPlaying ? [1, 1.1, 1] : 1,
                    rotate: avatarState.animation === "thoughtful_head_shake" ? [0, -5, 5, 0] : 0,
                  }}
                  transition={{
                    scale: { duration: 0.5, repeat: avatarState.isPlaying ? Number.POSITIVE_INFINITY : 0 },
                    rotate: {
                      duration: 2,
                      repeat: avatarState.animation === "thoughtful_head_shake" ? Number.POSITIVE_INFINITY : 0,
                    },
                  }}
                >
                  <motion.div
                    className="text-4xl"
                    animate={{
                      scale: avatarState.facialExpression === "happy" ? 1.2 : 1,
                    }}
                  >
                    {avatarState.facialExpression === "happy"
                      ? "😊"
                      : avatarState.facialExpression === "thinking"
                        ? "🤔"
                        : avatarState.facialExpression === "concerned"
                          ? "😐"
                          : "🙂"}
                  </motion.div>
                </motion.div>

                {/* Status Indicators */}
                <div className="absolute top-4 right-4 flex space-x-2">
                  {avatarState.isPlaying && (
                    <motion.div
                      className="w-3 h-3 bg-green-500 rounded-full"
                      animate={{ opacity: [1, 0.3, 1] }}
                      transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                    />
                  )}
                  <div className="w-3 h-3 bg-blue-500 rounded-full" />
                </div>

                {/* Animation Label */}
                <div className="absolute bottom-4 left-4 bg-black/50 px-3 py-1 rounded-full text-xs">
                  {avatarState.animation}
                </div>
              </div>

              <div className="mt-6 text-center">
                <h3 className="text-lg font-semibold mb-2">Cognitive Coach AI</h3>
                <p className="text-white/60 text-sm">Your personal AI companion for cognitive bias training</p>
              </div>
            </Card>

            {/* Avatar Controls */}
            {showSettings && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                <Card className="p-6 bg-neutral-900/40 border-neutral-800/50 backdrop-blur-sm">
                  <h4 className="font-semibold mb-4">Avatar Settings</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Voice</label>
                      <select className="w-full bg-neutral-800/50 border border-neutral-700/50 rounded-lg px-3 py-2 text-sm">
                        <option>Rachel (Default)</option>
                        <option>Drew</option>
                        <option>Domi</option>
                        <option>Bella</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Speaking Speed</label>
                      <input type="range" min="0.5" max="2" step="0.1" defaultValue="1" className="w-full" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Personality</label>
                      <select className="w-full bg-neutral-800/50 border border-neutral-700/50 rounded-lg px-3 py-2 text-sm">
                        <option>Encouraging Coach</option>
                        <option>Analytical Mentor</option>
                        <option>Friendly Guide</option>
                        <option>Professional Trainer</option>
                      </select>
                    </div>
                  </div>
                </Card>
              </motion.div>
            )}
          </div>

          {/* Voice Chat Interface */}
          <div className="space-y-6">
            <VoiceChat onResponse={handleAvatarResponse} includeAvatar={true} className="h-[600px]" />

            {/* Quick Actions */}
            <Card className="p-6 bg-neutral-900/40 border-neutral-800/50 backdrop-blur-sm">
              <h4 className="font-semibold mb-4">Quick Training Topics</h4>
              <div className="grid grid-cols-2 gap-3">
                {[
                  "Confirmation Bias",
                  "Anchoring Effect",
                  "Availability Heuristic",
                  "Overconfidence",
                  "Loss Aversion",
                  "Sunk Cost Fallacy",
                ].map((topic) => (
                  <Button
                    key={topic}
                    variant="outline"
                    size="sm"
                    className="text-left justify-start border-neutral-700/50 hover:bg-neutral-800/50 bg-transparent"
                    onClick={() => {
                      // Auto-send message about this topic
                      const message = `Tell me about ${topic} and how to avoid it`
                      // This would trigger the voice chat
                    }}
                  >
                    {topic}
                  </Button>
                ))}
              </div>
            </Card>

            {/* Integration Status */}
            <Card className="p-4 bg-neutral-900/40 border-neutral-800/50 backdrop-blur-sm">
              <div className="flex items-center justify-between text-sm">
                <span className="text-white/60">System Status</span>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    <span>AI Connected</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    <span>Voice Ready</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    <span>Avatar Active</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
