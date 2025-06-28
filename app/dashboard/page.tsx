"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Brain,
  Target,
  TrendingUp,
  Zap,
  Settings,
  User,
  Bell,
  ChevronRight,
  Award,
  Users,
  MessageCircle,
} from "lucide-react"
import Link from "next/link"

export default function Dashboard() {
  const [cognitiveLoad, setCognitiveLoad] = useState(67)
  const [activeNav, setActiveNav] = useState("CHAMBER")
  const [isTraining, setIsTraining] = useState(false)
  const [currentStreak, setCurrentStreak] = useState(7)

  useEffect(() => {
    const interval = setInterval(() => {
      setCognitiveLoad(Math.floor(Math.random() * 20) + 60)
    }, 10000)
    return () => clearInterval(interval)
  }, [])

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
  }

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.05,
      },
    },
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <motion.header
        className="border-b border-neutral-800/50 backdrop-blur-xl sticky top-0 z-50"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <motion.div
                className="w-2 h-2 bg-white rounded-full opacity-60"
                animate={{ opacity: [0.4, 0.8, 0.4] }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
              />
              <h1 className="text-lg font-medium tracking-wide">CALIBRATION CHAMBER</h1>
            </div>

            <div className="flex items-center space-x-6">
              <div className="text-sm text-white/60">
                Cognitive Health: <span className="text-white font-medium">78%</span>
              </div>
              <div className="text-sm text-white/60">
                Streak: <span className="text-green-400 font-medium">{currentStreak} days</span>
              </div>
              <button className="p-2 hover:bg-white/5 rounded-lg transition-colors">
                <Bell className="w-5 h-5" />
              </button>
              <button className="p-2 hover:bg-white/5 rounded-lg transition-colors">
                <Settings className="w-5 h-5" />
              </button>
              <button className="p-2 hover:bg-white/5 rounded-lg transition-colors">
                <User className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Navigation */}
      <motion.nav
        className="border-b border-neutral-800/30"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-center space-x-12">
            {[
              { id: "CHAMBER", label: "Chamber", icon: Brain },
              { id: "LABYRINTH", label: "Labyrinth", icon: Target },
              { id: "OBSERVATORY", label: "Observatory", icon: TrendingUp },
              { id: "LEADERBOARD", label: "Leaderboard", icon: Users },
              { id: "CHAT", label: "AI Coach", icon: MessageCircle },
            ].map((item, index) => (
              <motion.button
                key={item.id}
                className={`relative px-6 py-3 text-sm font-medium tracking-wide transition-all duration-300 flex items-center space-x-2 ${
                  activeNav === item.id ? "text-white" : "text-white/50 hover:text-white/80"
                }`}
                onClick={() => setActiveNav(item.id)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <item.icon className="w-4 h-4" />
                <span>{item.label}</span>
                {activeNav === item.id && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-px bg-white"
                    layoutId="activeTab"
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </motion.button>
            ))}
          </div>
        </div>
      </motion.nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <AnimatePresence mode="wait">
          {activeNav === "CHAMBER" && (
            <motion.div
              key="chamber"
              variants={staggerChildren}
              initial="initial"
              animate="animate"
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Quick Actions */}
              <motion.section variants={fadeInUp} className="mb-12">
                <h2 className="text-xl font-medium mb-6">Quick Training</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <motion.div
                    className="bg-neutral-900/40 border border-neutral-800/50 rounded-2xl p-6 backdrop-blur-sm hover:border-neutral-700/50 transition-all duration-300 cursor-pointer group"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <Zap className="w-8 h-8 text-yellow-400" />
                      <span className="text-xs bg-yellow-400/20 text-yellow-400 px-2 py-1 rounded-full">2 min</span>
                    </div>
                    <h3 className="font-semibold mb-2">Daily Micro</h3>
                    <p className="text-white/60 text-sm mb-4">Quick cognitive check-in</p>
                    <button className="w-full bg-white text-black py-2 rounded-lg font-medium hover:bg-white/90 transition-colors">
                      Start Now
                    </button>
                  </motion.div>

                  <motion.div
                    className="bg-neutral-900/40 border border-red-500/30 rounded-2xl p-6 backdrop-blur-sm hover:border-red-500/50 transition-all duration-300 cursor-pointer group"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <Target className="w-8 h-8 text-red-400" />
                      <span className="text-xs bg-red-400/20 text-red-400 px-2 py-1 rounded-full">URGENT</span>
                    </div>
                    <h3 className="font-semibold mb-2">Confirmation Bias</h3>
                    <p className="text-white/60 text-sm mb-4">Challenge detected pattern</p>
                    <button className="w-full bg-red-500 text-white py-2 rounded-lg font-medium hover:bg-red-400 transition-colors">
                      Engage
                    </button>
                  </motion.div>

                  <motion.div
                    className="bg-neutral-900/40 border border-neutral-800/50 rounded-2xl p-6 backdrop-blur-sm hover:border-neutral-700/50 transition-all duration-300 cursor-pointer group"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <Brain className="w-8 h-8 text-blue-400" />
                      <span className="text-xs bg-blue-400/20 text-blue-400 px-2 py-1 rounded-full">15 min</span>
                    </div>
                    <h3 className="font-semibold mb-2">Deep Analysis</h3>
                    <p className="text-white/60 text-sm mb-4">Comprehensive bias scan</p>
                    <button className="w-full border border-white/20 text-white py-2 rounded-lg font-medium hover:bg-white/5 transition-colors">
                      Begin Scan
                    </button>
                  </motion.div>
                </div>
              </motion.section>

              {/* System Status */}
              <motion.section variants={fadeInUp} className="mb-12">
                <h2 className="text-xl font-medium mb-6">System Status</h2>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Bias Scanner */}
                  <motion.div
                    className="bg-neutral-900/40 border border-neutral-800/50 rounded-2xl p-8 backdrop-blur-sm hover:border-neutral-700/50 transition-all duration-500"
                    whileHover={{ y: -4 }}
                  >
                    <div className="flex items-center justify-between mb-8">
                      <h3 className="text-base font-medium tracking-wide">Bias Scanner</h3>
                      <motion.div
                        className="w-1.5 h-1.5 bg-white/60 rounded-full"
                        animate={{ opacity: [0.4, 0.8, 0.4] }}
                        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                      />
                    </div>

                    <div className="space-y-6">
                      {[
                        { name: "Confirmation", level: "High", intensity: 0.8 },
                        { name: "Anchoring", level: "Medium", intensity: 0.5 },
                        { name: "Availability", level: "Low", intensity: 0.3 },
                      ].map((bias) => (
                        <div key={bias.name} className="flex items-center justify-between">
                          <span className="text-sm text-white/60">{bias.name}</span>
                          <div className="flex items-center space-x-3">
                            <motion.div
                              className="w-2 h-2 bg-white rounded-full"
                              style={{ opacity: bias.intensity }}
                              animate={{ scale: [1, 1.2, 1] }}
                              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: Math.random() }}
                            />
                            <span className="text-sm font-medium" style={{ opacity: bias.intensity }}>
                              {bias.level}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>

                    <motion.button
                      className="w-full mt-8 bg-white text-black py-4 rounded-xl text-sm font-medium tracking-wide hover:bg-white/90 transition-colors"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Run Deep Scan
                    </motion.button>
                  </motion.div>

                  {/* Load Monitor */}
                  <motion.div
                    className="bg-neutral-900/40 border border-neutral-800/50 rounded-2xl p-8 backdrop-blur-sm hover:border-neutral-700/50 transition-all duration-500"
                    whileHover={{ y: -4 }}
                  >
                    <div className="flex items-center justify-between mb-8">
                      <h3 className="text-base font-medium tracking-wide">Load Monitor</h3>
                      <motion.div
                        className="w-1.5 h-1.5 bg-white/40 rounded-full"
                        animate={{ opacity: [0.4, 0.8, 0.4] }}
                        transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                      />
                    </div>

                    <div className="text-center">
                      <motion.div
                        className="text-5xl font-light mb-3 tracking-tight"
                        key={cognitiveLoad}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                      >
                        {cognitiveLoad}
                      </motion.div>
                      <div className="text-sm text-white/60 mb-8">Current Load Percentage</div>

                      <div className="relative">
                        <div className="w-full h-1 bg-neutral-800 rounded-full overflow-hidden">
                          <motion.div
                            className="h-full bg-white rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${cognitiveLoad}%` }}
                            transition={{ duration: 1, ease: "easeOut" }}
                          />
                        </div>
                        <div className="text-xs text-white/40 mt-4">Optimal: 40–80%</div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Decision Quality */}
                  <motion.div
                    className="bg-neutral-900/40 border border-neutral-800/50 rounded-2xl p-8 backdrop-blur-sm hover:border-neutral-700/50 transition-all duration-500"
                    whileHover={{ y: -4 }}
                  >
                    <div className="flex items-center justify-between mb-8">
                      <h3 className="text-base font-medium tracking-wide">Decision Quality</h3>
                      <motion.div
                        className="w-1.5 h-1.5 bg-white/60 rounded-full"
                        animate={{ opacity: [0.4, 0.8, 0.4] }}
                        transition={{ duration: 2.5, repeat: Number.POSITIVE_INFINITY }}
                      />
                    </div>

                    <div className="text-center">
                      <motion.div
                        className="text-5xl font-light mb-3 tracking-tight"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.6 }}
                      >
                        8.2
                      </motion.div>
                      <div className="text-sm text-white/60 mb-4">Quality Index</div>
                      <motion.div
                        className="text-xs text-green-400"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.3 }}
                      >
                        ↑ 12% improvement
                      </motion.div>
                    </div>

                    <div className="mt-8 pt-6 border-t border-neutral-800/50">
                      <div className="text-xs text-white/40">47 decisions analyzed</div>
                    </div>
                  </motion.div>
                </div>
              </motion.section>

              {/* Recent Insights */}
              <motion.section variants={fadeInUp}>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-medium tracking-wide">Recent Insights</h2>
                  <Link
                    href="/observatory"
                    className="text-sm text-white/50 hover:text-white/80 transition-colors tracking-wide flex items-center space-x-1"
                  >
                    <span>View Observatory</span>
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>

                <motion.div
                  className="bg-neutral-900/40 border border-neutral-800/50 rounded-2xl p-8 backdrop-blur-sm"
                  whileHover={{ borderColor: "rgba(115, 115, 115, 0.5)" }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="space-y-8">
                    {[
                      {
                        title: "Confirmation Bias Spike Detected",
                        time: "2 hours ago",
                        description:
                          "Pattern analysis shows increased selective information gathering during market research phase.",
                        type: "warning",
                      },
                      {
                        title: "Decision Quality Improvement",
                        time: "Yesterday",
                        description: "Your systematic approach to evaluating options has improved by 23% this week.",
                        type: "success",
                      },
                      {
                        title: "Everything is fine",
                        time: "3 days ago",
                        description: "Just kidding. You avoided a major overconfidence trap. Nice work! 🔥",
                        type: "info",
                      },
                    ].map((insight, index) => (
                      <motion.div
                        key={insight.title}
                        className="flex items-start space-x-4"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                      >
                        <motion.div
                          className={`w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 ${
                            insight.type === "warning"
                              ? "bg-yellow-400"
                              : insight.type === "success"
                                ? "bg-green-400"
                                : "bg-blue-400"
                          }`}
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: index * 0.5 }}
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium">{insight.title}</span>
                            <span className="text-xs text-white/40">{insight.time}</span>
                          </div>
                          <p className="text-sm text-white/60 leading-relaxed">{insight.description}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </motion.section>
            </motion.div>
          )}

          {activeNav === "CHAT" && (
            <motion.div
              key="chat"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="max-w-4xl mx-auto">
                <div className="bg-neutral-900/40 border border-neutral-800/50 rounded-2xl p-8 backdrop-blur-sm">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                      <Brain className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold">AI Cognitive Coach</h3>
                      <p className="text-sm text-white/60">Your personal bias detection assistant</p>
                    </div>
                  </div>

                  <div className="h-96 bg-neutral-800/30 rounded-xl p-4 mb-4 overflow-y-auto">
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                          <Brain className="w-4 h-4 text-white" />
                        </div>
                        <div className="bg-neutral-700/50 rounded-lg p-3 max-w-xs">
                          <p className="text-sm">
                            Hello! I'm your AI cognitive coach. I can help you identify biases, analyze decisions, and
                            improve your thinking patterns. What would you like to work on today?
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <input
                      type="text"
                      placeholder="Ask about your cognitive patterns..."
                      className="flex-1 bg-neutral-800/50 border border-neutral-700/50 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-white/30 transition-colors"
                    />
                    <button className="bg-white text-black px-6 py-3 rounded-lg font-medium hover:bg-white/90 transition-colors">
                      Send
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeNav === "LEADERBOARD" && (
            <motion.div
              key="leaderboard"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="max-w-4xl mx-auto">
                <div className="bg-neutral-900/40 border border-neutral-800/50 rounded-2xl p-8 backdrop-blur-sm">
                  <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-semibold">Global Leaderboard</h2>
                    <div className="flex items-center space-x-2 text-sm text-white/60">
                      <Award className="w-4 h-4" />
                      <span>Weekly Rankings</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {[
                      { rank: 1, name: "Alex Chen", score: 2847, badge: "🏆" },
                      { rank: 2, name: "Sarah Kim", score: 2756, badge: "🥈" },
                      { rank: 3, name: "Marcus Johnson", score: 2698, badge: "🥉" },
                      { rank: 4, name: "You", score: 2543, badge: "", isUser: true },
                      { rank: 5, name: "Emma Wilson", score: 2487, badge: "" },
                    ].map((user) => (
                      <motion.div
                        key={user.rank}
                        className={`flex items-center justify-between p-4 rounded-xl transition-colors ${
                          user.isUser ? "bg-white/5 border border-white/10" : "hover:bg-neutral-800/30"
                        }`}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: user.rank * 0.1 }}
                      >
                        <div className="flex items-center space-x-4">
                          <div className="w-8 h-8 flex items-center justify-center">
                            {user.badge ? (
                              <span className="text-xl">{user.badge}</span>
                            ) : (
                              <span className="text-white/60 font-medium">#{user.rank}</span>
                            )}
                          </div>
                          <div>
                            <p className={`font-medium ${user.isUser ? "text-white" : "text-white/90"}`}>{user.name}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">{user.score.toLocaleString()}</p>
                          <p className="text-xs text-white/60">points</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  )
}
