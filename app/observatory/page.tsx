"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import {
  TrendingUp,
  Brain,
  Target,
  Zap,
  Calendar,
  BarChart3,
  PieChart,
  Activity,
  ArrowLeft,
  Download,
} from "lucide-react"
import Link from "next/link"

export default function Observatory() {
  const [timeRange, setTimeRange] = useState("7d")
  const [selectedMetric, setSelectedMetric] = useState("cognitive_score")
  const [cognitiveData, setCognitiveData] = useState({
    currentScore: 78,
    weeklyChange: 12,
    totalSessions: 47,
    streakDays: 7,
    biasesDetected: 23,
    improvementRate: 15.3,
  })

  const [chartData, setChartData] = useState([
    { date: "Mon", score: 65, sessions: 2, biases: 3 },
    { date: "Tue", score: 68, sessions: 1, biases: 2 },
    { date: "Wed", score: 72, sessions: 3, biases: 4 },
    { date: "Thu", score: 75, sessions: 2, biases: 1 },
    { date: "Fri", score: 78, sessions: 2, biases: 2 },
    { date: "Sat", score: 76, sessions: 1, biases: 1 },
    { date: "Sun", score: 78, sessions: 2, biases: 2 },
  ])

  const biasBreakdown = [
    { name: "Confirmation Bias", count: 8, severity: "high", color: "bg-red-500" },
    { name: "Anchoring Bias", count: 6, severity: "medium", color: "bg-yellow-500" },
    { name: "Availability Heuristic", count: 5, severity: "medium", color: "bg-orange-500" },
    { name: "Overconfidence", count: 3, severity: "low", color: "bg-blue-500" },
    { name: "Loss Aversion", count: 1, severity: "low", color: "bg-green-500" },
  ]

  const recentInsights = [
    {
      type: "improvement",
      title: "Decision Speed Increased",
      description: "Your average decision time has improved by 23% this week while maintaining accuracy.",
      timestamp: "2 hours ago",
      icon: TrendingUp,
      color: "text-green-400",
    },
    {
      type: "warning",
      title: "Confirmation Bias Pattern",
      description: "Detected increased confirmation bias during afternoon sessions. Consider morning training.",
      timestamp: "1 day ago",
      icon: Target,
      color: "text-yellow-400",
    },
    {
      type: "achievement",
      title: "Cognitive Milestone",
      description: "You've successfully completed 50 bias detection exercises with 85% accuracy.",
      timestamp: "2 days ago",
      icon: Brain,
      color: "text-blue-400",
    },
  ]

  const trainingRecommendations = [
    {
      title: "Focus on Anchoring Resistance",
      description: "Your anchoring bias scores suggest targeted training in numerical estimation exercises.",
      priority: "high",
      estimatedTime: "15 min",
    },
    {
      title: "Strengthen Pattern Recognition",
      description: "Improve your ability to spot cognitive traps in complex scenarios.",
      priority: "medium",
      estimatedTime: "20 min",
    },
    {
      title: "Practice Perspective Taking",
      description: "Enhance your ability to consider alternative viewpoints and reduce confirmation bias.",
      priority: "medium",
      estimatedTime: "10 min",
    },
  ]

  useEffect(() => {
    // Simulate real-time data updates
    const interval = setInterval(() => {
      setCognitiveData((prev) => ({
        ...prev,
        currentScore: prev.currentScore + (Math.random() - 0.5) * 2,
      }))
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const maxScore = Math.max(...chartData.map((d) => d.score))

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
                <h1 className="text-lg font-medium">Cognitive Observatory</h1>
                <p className="text-sm text-white/60">Deep insights into your cognitive patterns</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="bg-neutral-800/50 border border-neutral-700/50 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-white/30"
              >
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 3 months</option>
                <option value="1y">Last year</option>
              </select>

              <button className="flex items-center space-x-2 bg-white/10 border border-white/20 text-white px-4 py-2 rounded-lg hover:bg-white/20 transition-colors">
                <Download className="w-4 h-4" />
                <span>Export</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Key Metrics */}
        <section className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <motion.div
              className="bg-neutral-900/40 border border-neutral-800/50 rounded-2xl p-6 backdrop-blur-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="flex items-center justify-between mb-4">
                <Brain className="w-8 h-8 text-blue-400" />
                <div className="flex items-center space-x-1 text-green-400 text-sm">
                  <TrendingUp className="w-4 h-4" />
                  <span>+{cognitiveData.weeklyChange}%</span>
                </div>
              </div>
              <div className="text-3xl font-light mb-2">{Math.round(cognitiveData.currentScore)}</div>
              <div className="text-white/60 text-sm">Cognitive Score</div>
            </motion.div>

            <motion.div
              className="bg-neutral-900/40 border border-neutral-800/50 rounded-2xl p-6 backdrop-blur-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <div className="flex items-center justify-between mb-4">
                <Target className="w-8 h-8 text-red-400" />
                <div className="text-red-400 text-sm">High Priority</div>
              </div>
              <div className="text-3xl font-light mb-2">{cognitiveData.biasesDetected}</div>
              <div className="text-white/60 text-sm">Biases Detected</div>
            </motion.div>

            <motion.div
              className="bg-neutral-900/40 border border-neutral-800/50 rounded-2xl p-6 backdrop-blur-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <div className="flex items-center justify-between mb-4">
                <Zap className="w-8 h-8 text-yellow-400" />
                <div className="flex items-center space-x-1 text-green-400 text-sm">
                  <TrendingUp className="w-4 h-4" />
                  <span>+{cognitiveData.improvementRate}%</span>
                </div>
              </div>
              <div className="text-3xl font-light mb-2">{cognitiveData.totalSessions}</div>
              <div className="text-white/60 text-sm">Training Sessions</div>
            </motion.div>

            <motion.div
              className="bg-neutral-900/40 border border-neutral-800/50 rounded-2xl p-6 backdrop-blur-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              <div className="flex items-center justify-between mb-4">
                <Calendar className="w-8 h-8 text-green-400" />
                <div className="text-green-400 text-sm">Active</div>
              </div>
              <div className="text-3xl font-light mb-2">{cognitiveData.streakDays}</div>
              <div className="text-white/60 text-sm">Day Streak</div>
            </motion.div>
          </div>
        </section>

        {/* Charts Section */}
        <section className="mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Progress Chart */}
            <motion.div
              className="bg-neutral-900/40 border border-neutral-800/50 rounded-2xl p-8 backdrop-blur-sm"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold">Cognitive Progress</h3>
                <div className="flex items-center space-x-2">
                  <BarChart3 className="w-5 h-5 text-white/60" />
                  <select
                    value={selectedMetric}
                    onChange={(e) => setSelectedMetric(e.target.value)}
                    className="bg-neutral-800/50 border border-neutral-700/50 rounded px-2 py-1 text-sm focus:outline-none focus:border-white/30"
                  >
                    <option value="cognitive_score">Cognitive Score</option>
                    <option value="sessions">Training Sessions</option>
                    <option value="biases">Biases Detected</option>
                  </select>
                </div>
              </div>

              <div className="h-64 flex items-end justify-between space-x-2">
                {chartData.map((data, index) => {
                  const value =
                    selectedMetric === "cognitive_score"
                      ? data.score
                      : selectedMetric === "sessions"
                        ? data.sessions
                        : data.biases
                  const maxValue =
                    selectedMetric === "cognitive_score" ? maxScore : selectedMetric === "sessions" ? 3 : 4
                  const height = (value / maxValue) * 100

                  return (
                    <div key={data.date} className="flex-1 flex flex-col items-center">
                      <motion.div
                        className="w-full bg-gradient-to-t from-blue-500 to-purple-600 rounded-t-lg mb-2"
                        initial={{ height: 0 }}
                        animate={{ height: `${height}%` }}
                        transition={{ duration: 0.8, delay: index * 0.1 }}
                        style={{ minHeight: "8px" }}
                      />
                      <div className="text-xs text-white/60">{data.date}</div>
                    </div>
                  )
                })}
              </div>
            </motion.div>

            {/* Bias Breakdown */}
            <motion.div
              className="bg-neutral-900/40 border border-neutral-800/50 rounded-2xl p-8 backdrop-blur-sm"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold">Bias Detection Breakdown</h3>
                <PieChart className="w-5 h-5 text-white/60" />
              </div>

              <div className="space-y-4">
                {biasBreakdown.map((bias, index) => (
                  <motion.div
                    key={bias.name}
                    className="flex items-center justify-between"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${bias.color}`} />
                      <span className="text-sm">{bias.name}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="text-sm text-white/60">{bias.count}</span>
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          bias.severity === "high"
                            ? "bg-red-500/20 text-red-300"
                            : bias.severity === "medium"
                              ? "bg-yellow-500/20 text-yellow-300"
                              : "bg-green-500/20 text-green-300"
                        }`}
                      >
                        {bias.severity}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Insights and Recommendations */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Insights */}
          <motion.div
            className="bg-neutral-900/40 border border-neutral-800/50 rounded-2xl p-8 backdrop-blur-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold">Recent Insights</h3>
              <Activity className="w-5 h-5 text-white/60" />
            </div>

            <div className="space-y-6">
              {recentInsights.map((insight, index) => (
                <motion.div
                  key={index}
                  className="flex items-start space-x-4"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <div
                    className={`w-10 h-10 rounded-xl bg-neutral-800/50 flex items-center justify-center ${insight.color}`}
                  >
                    <insight.icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium mb-1">{insight.title}</h4>
                    <p className="text-white/70 text-sm leading-relaxed mb-2">{insight.description}</p>
                    <span className="text-xs text-white/40">{insight.timestamp}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Training Recommendations */}
          <motion.div
            className="bg-neutral-900/40 border border-neutral-800/50 rounded-2xl p-8 backdrop-blur-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold">Recommended Training</h3>
              <Target className="w-5 h-5 text-white/60" />
            </div>

            <div className="space-y-4">
              {trainingRecommendations.map((rec, index) => (
                <motion.div
                  key={index}
                  className="bg-neutral-800/30 rounded-xl p-4 hover:bg-neutral-800/50 transition-colors cursor-pointer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium">{rec.title}</h4>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        rec.priority === "high" ? "bg-red-500/20 text-red-300" : "bg-yellow-500/20 text-yellow-300"
                      }`}
                    >
                      {rec.priority}
                    </span>
                  </div>
                  <p className="text-white/70 text-sm leading-relaxed mb-3">{rec.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-white/40">Est. {rec.estimatedTime}</span>
                    <button className="text-blue-400 text-sm hover:text-blue-300 transition-colors">
                      Start Training →
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>
      </main>
    </div>
  )
}
