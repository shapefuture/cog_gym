"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Play, Pause, RotateCcw, Brain, Target, TrendingUp, Volume2, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function Demo() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [cognitiveScore, setCognitiveScore] = useState(0)

  const demoSteps = [
    {
      title: "Bias Detection in Action",
      description: "Watch as our AI identifies confirmation bias in real-time decision making",
      visual: "bias-detection",
      duration: 3000,
    },
    {
      title: "Personalized Training",
      description: "See how the system adapts exercises based on your cognitive patterns",
      visual: "adaptive-training",
      duration: 4000,
    },
    {
      title: "Voice-Powered Analysis",
      description: "Experience natural conversation with your AI cognitive coach",
      visual: "voice-analysis",
      duration: 3500,
    },
    {
      title: "Progress Tracking",
      description: "Monitor your cognitive improvement with detailed analytics",
      visual: "progress-tracking",
      duration: 3000,
    },
  ]

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentStep((prev) => (prev + 1) % demoSteps.length)
        setCognitiveScore((prev) => Math.min(prev + Math.random() * 10, 100))
      }, demoSteps[currentStep]?.duration || 3000)
    }
    return () => clearInterval(interval)
  }, [isPlaying, currentStep])

  const togglePlayback = () => {
    setIsPlaying(!isPlaying)
  }

  const resetDemo = () => {
    setIsPlaying(false)
    setCurrentStep(0)
    setCognitiveScore(0)
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="border-b border-white/10 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                <Brain className="w-5 h-5 text-black" />
              </div>
              <span className="text-xl font-semibold">Cognitive Gym</span>
            </Link>

            <div className="flex items-center space-x-4">
              <Link href="/features" className="text-white/70 hover:text-white transition-colors">
                Features
              </Link>
              <Link href="/pricing" className="text-white/70 hover:text-white transition-colors">
                Pricing
              </Link>
              <Link
                href="/auth/signup"
                className="bg-white text-black px-6 py-2 rounded-lg font-medium hover:bg-white/90 transition-all duration-200"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-20 pb-16 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="text-5xl md:text-7xl font-light tracking-tight mb-8">
              See Cognitive Training
              <br />
              <span className="bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">In Action</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/70 mb-12 max-w-3xl mx-auto leading-relaxed">
              Experience how our AI-powered platform detects biases, provides personalized training, and tracks your
              cognitive improvement in real-time.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Interactive Demo */}
      <section className="pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Demo Controls */}
          <div className="flex items-center justify-center space-x-4 mb-12">
            <motion.button
              onClick={togglePlayback}
              className="flex items-center space-x-2 bg-white text-black px-8 py-4 rounded-xl font-semibold hover:bg-white/90 transition-all duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              <span>{isPlaying ? "Pause Demo" : "Start Demo"}</span>
            </motion.button>

            <motion.button
              onClick={resetDemo}
              className="flex items-center space-x-2 border border-white/20 text-white px-6 py-4 rounded-xl font-semibold hover:bg-white/5 transition-all duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reset</span>
            </motion.button>
          </div>

          {/* Demo Visualization */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Current Step Info */}
            <div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="mb-8">
                    <div className="flex items-center space-x-2 mb-4">
                      <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center text-sm font-bold">
                        {currentStep + 1}
                      </div>
                      <span className="text-blue-400 text-sm font-medium">
                        Step {currentStep + 1} of {demoSteps.length}
                      </span>
                    </div>
                    <h2 className="text-3xl font-light mb-4">{demoSteps[currentStep]?.title}</h2>
                    <p className="text-white/70 text-lg leading-relaxed">{demoSteps[currentStep]?.description}</p>
                  </div>

                  {/* Step-specific content */}
                  {currentStep === 0 && (
                    <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-6">
                      <div className="flex items-center space-x-3 mb-4">
                        <Target className="w-6 h-6 text-red-400" />
                        <h3 className="text-lg font-semibold text-red-100">Bias Alert</h3>
                      </div>
                      <p className="text-red-200/80 mb-4">
                        Confirmation bias detected in your information gathering pattern. You're showing a 73% tendency
                        to seek information that confirms your existing beliefs.
                      </p>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Bias Strength</span>
                          <span>High (7/10)</span>
                        </div>
                        <div className="w-full bg-red-900/30 rounded-full h-2">
                          <motion.div
                            className="bg-red-400 h-2 rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: "70%" }}
                            transition={{ duration: 1 }}
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {currentStep === 1 && (
                    <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-6">
                      <div className="flex items-center space-x-3 mb-4">
                        <Brain className="w-6 h-6 text-green-400" />
                        <h3 className="text-lg font-semibold text-green-100">Adaptive Training</h3>
                      </div>
                      <p className="text-green-200/80 mb-4">
                        Based on your bias profile, I'm customizing your training to focus on perspective-taking
                        exercises and devil's advocate analysis.
                      </p>
                      <div className="space-y-3">
                        {["Confirmation Bias Exercises", "Anchoring Resistance Training", "Perspective Taking"].map(
                          (exercise, index) => (
                            <motion.div
                              key={exercise}
                              className="flex items-center space-x-3"
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.2 }}
                            >
                              <div className="w-2 h-2 bg-green-400 rounded-full" />
                              <span className="text-green-200">{exercise}</span>
                            </motion.div>
                          ),
                        )}
                      </div>
                    </div>
                  )}

                  {currentStep === 2 && (
                    <div className="bg-purple-500/10 border border-purple-500/30 rounded-xl p-6">
                      <div className="flex items-center space-x-3 mb-4">
                        <Volume2 className="w-6 h-6 text-purple-400" />
                        <h3 className="text-lg font-semibold text-purple-100">Voice Analysis</h3>
                      </div>
                      <div className="space-y-4">
                        <div className="bg-purple-900/30 rounded-lg p-4">
                          <p className="text-purple-200/80 italic">
                            "I think this investment is definitely going to pay off because I've seen similar
                            opportunities before..."
                          </p>
                        </div>
                        <div className="text-sm text-purple-200/60">
                          <p>
                            🎯 <strong>Detected:</strong> Availability heuristic - overweighting recent examples
                          </p>
                          <p>
                            💡 <strong>Suggestion:</strong> Consider base rates and statistical evidence
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {currentStep === 3 && (
                    <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-6">
                      <div className="flex items-center space-x-3 mb-4">
                        <TrendingUp className="w-6 h-6 text-blue-400" />
                        <h3 className="text-lg font-semibold text-blue-100">Progress Analytics</h3>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center">
                          <div className="text-2xl font-light text-blue-200">{Math.round(cognitiveScore)}%</div>
                          <div className="text-sm text-blue-300">Cognitive Score</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-light text-blue-200">23%</div>
                          <div className="text-sm text-blue-300">Improvement</div>
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right Side - Visual Demo */}
            <div className="relative">
              <div className="bg-neutral-900/40 border border-neutral-800/50 rounded-2xl p-8 backdrop-blur-sm">
                <div className="aspect-video bg-neutral-800/50 rounded-xl flex items-center justify-center relative overflow-hidden">
                  <AnimatePresence mode="wait">
                    {currentStep === 0 && (
                      <motion.div
                        key="bias-detection"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.2 }}
                        className="text-center"
                      >
                        <motion.div
                          className="w-24 h-24 border-4 border-red-400 rounded-full mx-auto mb-4 flex items-center justify-center"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                        >
                          <Target className="w-12 h-12 text-red-400" />
                        </motion.div>
                        <p className="text-red-400 font-medium">Scanning for cognitive biases...</p>
                      </motion.div>
                    )}

                    {currentStep === 1 && (
                      <motion.div
                        key="adaptive-training"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="w-full"
                      >
                        <div className="space-y-4">
                          {[1, 2, 3].map((i) => (
                            <motion.div
                              key={i}
                              className="bg-green-500/20 rounded-lg p-4 flex items-center space-x-3"
                              initial={{ opacity: 0, x: -50 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 0.3 }}
                            >
                              <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                                <Brain className="w-4 h-4 text-white" />
                              </div>
                              <div className="flex-1">
                                <div className="h-2 bg-green-500/30 rounded-full">
                                  <motion.div
                                    className="h-2 bg-green-500 rounded-full"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${60 + i * 15}%` }}
                                    transition={{ delay: i * 0.3 + 0.5, duration: 1 }}
                                  />
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    )}

                    {currentStep === 2 && (
                      <motion.div
                        key="voice-analysis"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="text-center"
                      >
                        <motion.div
                          className="w-32 h-32 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full mx-auto mb-4 flex items-center justify-center"
                          animate={{ scale: [1, 1.1, 1] }}
                          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                        >
                          <Volume2 className="w-16 h-16 text-white" />
                        </motion.div>
                        <div className="flex justify-center space-x-1">
                          {[1, 2, 3, 4, 5].map((i) => (
                            <motion.div
                              key={i}
                              className="w-1 bg-purple-400 rounded-full"
                              animate={{ height: [8, 24, 8] }}
                              transition={{
                                duration: 0.5,
                                repeat: Number.POSITIVE_INFINITY,
                                delay: i * 0.1,
                              }}
                            />
                          ))}
                        </div>
                      </motion.div>
                    )}

                    {currentStep === 3 && (
                      <motion.div
                        key="progress-tracking"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="w-full"
                      >
                        <div className="grid grid-cols-2 gap-4">
                          <div className="text-center">
                            <motion.div
                              className="text-4xl font-light mb-2"
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ duration: 0.5 }}
                            >
                              {Math.round(cognitiveScore)}
                            </motion.div>
                            <div className="text-sm text-white/60">Cognitive Score</div>
                          </div>
                          <div className="text-center">
                            <motion.div
                              className="text-4xl font-light mb-2"
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ duration: 0.5, delay: 0.2 }}
                            >
                              7
                            </motion.div>
                            <div className="text-sm text-white/60">Day Streak</div>
                          </div>
                        </div>
                        <div className="mt-6">
                          <div className="w-full h-2 bg-neutral-700 rounded-full">
                            <motion.div
                              className="h-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"
                              initial={{ width: 0 }}
                              animate={{ width: `${cognitiveScore}%` }}
                              transition={{ duration: 1 }}
                            />
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Progress Indicators */}
                <div className="flex justify-center space-x-2 mt-6">
                  {demoSteps.map((_, index) => (
                    <motion.div
                      key={index}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        index === currentStep ? "bg-white" : "bg-white/30"
                      }`}
                      animate={{ scale: index === currentStep ? 1.2 : 1 }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 border-t border-white/10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-light mb-8">
              Ready to Train
              <br />
              <span className="text-white/70">Your Mind?</span>
            </h2>
            <p className="text-xl text-white/60 mb-12 max-w-2xl mx-auto">
              Experience the future of cognitive training. Start your journey to better decision-making today.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/auth/signup"
                className="inline-flex items-center space-x-2 bg-white text-black px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/90 transition-all duration-300 active:scale-95"
              >
                <span>Start Free Trial</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/features"
                className="inline-flex items-center space-x-2 border border-white/20 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/5 transition-all duration-300 active:scale-95"
              >
                <span>Explore Features</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
