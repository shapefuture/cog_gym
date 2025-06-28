"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Lightbulb, ArrowRight, ArrowLeft, CheckCircle, XCircle, Target, TrendingUp } from "lucide-react"
import Link from "next/link"

interface Question {
  id: string
  scenario: string
  question: string
  options: Array<{
    id: string
    text: string
    isCorrect: boolean
    explanation: string
    biasLevel: "low" | "medium" | "high"
  }>
  context: string
  learningPoint: string
}

const availabilityHeuristicQuestions: Question[] = [
  {
    id: "ah_1",
    scenario:
      "You're a startup investor evaluating a new social media platform. You recently read several news articles about social media companies failing due to privacy scandals.",
    question: "How should you approach evaluating this investment opportunity?",
    options: [
      {
        id: "a",
        text: "Focus heavily on privacy risks since they're clearly the main threat to social media companies",
        isCorrect: false,
        explanation:
          "This shows availability heuristic - you're overweighting recent, memorable examples rather than looking at comprehensive data.",
        biasLevel: "high",
      },
      {
        id: "b",
        text: "Research comprehensive industry data on success/failure rates and their actual causes, not just recent news",
        isCorrect: true,
        explanation:
          "This approach counters availability heuristic by seeking systematic data rather than relying on memorable recent examples.",
        biasLevel: "low",
      },
      {
        id: "c",
        text: "Consider privacy risks as one factor but also look at other recent news about social media trends",
        isCorrect: false,
        explanation:
          "While better than option A, you're still being influenced by what's recently available in memory rather than systematic analysis.",
        biasLevel: "medium",
      },
    ],
    context: "Availability heuristic causes us to overestimate the likelihood of events we can easily recall.",
    learningPoint:
      "Always seek base rates and comprehensive data rather than relying on what's most memorable or recent.",
  },
  {
    id: "ah_2",
    scenario:
      "You're a hiring manager and just interviewed three candidates who all mentioned they went to Stanford. You're now evaluating a candidate from a state school.",
    question: "What's the best way to avoid availability heuristic in your evaluation?",
    options: [
      {
        id: "a",
        text: "Note that this candidate might not be as qualified since Stanford candidates seem more common",
        isCorrect: false,
        explanation:
          "You're falling for availability heuristic - recent Stanford interviews make you think they're more common/better than they actually are.",
        biasLevel: "high",
      },
      {
        id: "b",
        text: "Evaluate this candidate purely on their skills, experience, and interview performance using your standard rubric",
        isCorrect: true,
        explanation: "Using a systematic evaluation process helps avoid being influenced by recent memorable examples.",
        biasLevel: "low",
      },
      {
        id: "c",
        text: "Give this candidate extra consideration since non-Stanford candidates might be underrepresented",
        isCorrect: false,
        explanation:
          "While trying to correct for bias, you're still being influenced by recent availability rather than focusing on merit.",
        biasLevel: "medium",
      },
    ],
    context: "Recent examples can skew our perception of what's normal or expected.",
    learningPoint: "Use structured evaluation criteria that don't depend on recent memorable examples.",
  },
  {
    id: "ah_3",
    scenario:
      "You're planning a vacation and just watched a documentary about plane crashes. You're now considering driving instead of flying to your destination.",
    question: "How can you make a more rational decision about travel safety?",
    options: [
      {
        id: "a",
        text: "Drive instead since plane crashes are clearly more dangerous than you initially thought",
        isCorrect: false,
        explanation:
          "The documentary made plane crashes more available in memory, but this doesn't reflect actual statistical risk.",
        biasLevel: "high",
      },
      {
        id: "b",
        text: "Look up actual statistical data comparing the safety of flying vs. driving for your specific trip",
        isCorrect: true,
        explanation:
          "Using objective statistical data counters the availability heuristic's influence from the memorable documentary.",
        biasLevel: "low",
      },
      {
        id: "c",
        text: "Consider both the documentary and some positive flying stories before deciding",
        isCorrect: false,
        explanation: "While trying to balance, you're still using anecdotal examples rather than systematic data.",
        biasLevel: "medium",
      },
    ],
    context: "Vivid, recent media can make rare events seem more likely than they actually are.",
    learningPoint: "When assessing risks, always consult statistical data rather than relying on memorable examples.",
  },
]

export default function AvailabilityHeuristicTraining() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [showExplanation, setShowExplanation] = useState(false)
  const [score, setScore] = useState(0)
  const [answers, setAnswers] = useState<
    Array<{ questionId: string; selectedId: string; correct: boolean; biasLevel: string }>
  >([])
  const [isComplete, setIsComplete] = useState(false)
  const [timeSpent, setTimeSpent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeSpent((prev) => prev + 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const handleAnswerSelect = (optionId: string) => {
    if (showExplanation) return
    setSelectedAnswer(optionId)
  }

  const handleSubmitAnswer = () => {
    if (!selectedAnswer) return

    const question = availabilityHeuristicQuestions[currentQuestion]
    const selectedOption = question.options.find((opt) => opt.id === selectedAnswer)
    const isCorrect = selectedOption?.isCorrect || false

    if (isCorrect) {
      setScore((prev) => prev + 1)
    }

    setAnswers((prev) => [
      ...prev,
      {
        questionId: question.id,
        selectedId: selectedAnswer,
        correct: isCorrect,
        biasLevel: selectedOption?.biasLevel || "high",
      },
    ])

    setShowExplanation(true)
  }

  const handleNextQuestion = () => {
    if (currentQuestion < availabilityHeuristicQuestions.length - 1) {
      setCurrentQuestion((prev) => prev + 1)
      setSelectedAnswer(null)
      setShowExplanation(false)
    } else {
      setIsComplete(true)
    }
  }

  const handlePrevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1)
      setSelectedAnswer(null)
      setShowExplanation(false)
    }
  }

  const calculateBiasScore = () => {
    const biasLevels = answers.map((a) => a.biasLevel)
    const highBias = biasLevels.filter((l) => l === "high").length
    const mediumBias = biasLevels.filter((l) => l === "medium").length
    const lowBias = biasLevels.filter((l) => l === "low").length

    return {
      high: highBias,
      medium: mediumBias,
      low: lowBias,
      overall: Math.round(((lowBias * 3 + mediumBias * 2 + highBias * 1) / (answers.length * 3)) * 100),
    }
  }

  if (isComplete) {
    const biasScore = calculateBiasScore()
    const accuracy = Math.round((score / availabilityHeuristicQuestions.length) * 100)

    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center p-6">
        <motion.div
          className="max-w-2xl w-full"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="bg-neutral-900/40 border border-neutral-800/50 rounded-2xl p-8 backdrop-blur-sm text-center">
            <motion.div
              className="w-20 h-20 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-6"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <CheckCircle className="w-10 h-10 text-white" />
            </motion.div>

            <h1 className="text-3xl font-light mb-4">Availability Heuristic Training Complete!</h1>
            <p className="text-white/70 mb-8">You've mastered recognizing when recent examples bias your judgment</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-neutral-800/50 rounded-xl p-4">
                <div className="text-2xl font-light mb-2">{accuracy}%</div>
                <div className="text-sm text-white/60">Accuracy</div>
              </div>
              <div className="bg-neutral-800/50 rounded-xl p-4">
                <div className="text-2xl font-light mb-2">{biasScore.overall}%</div>
                <div className="text-sm text-white/60">Bias Resistance</div>
              </div>
              <div className="bg-neutral-800/50 rounded-xl p-4">
                <div className="text-2xl font-light mb-2">
                  {Math.floor(timeSpent / 60)}m {timeSpent % 60}s
                </div>
                <div className="text-sm text-white/60">Time Spent</div>
              </div>
            </div>

            <div className="text-left mb-8">
              <h3 className="text-lg font-semibold mb-4">Your Availability Heuristic Resistance</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-white/70">Strong Resistance</span>
                  <span className="text-green-400">
                    {biasScore.low}/{answers.length}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/70">Moderate Resistance</span>
                  <span className="text-yellow-400">
                    {biasScore.medium}/{answers.length}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/70">Susceptible to Availability</span>
                  <span className="text-red-400">
                    {biasScore.high}/{answers.length}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/dashboard"
                className="flex-1 bg-white text-black py-3 rounded-xl font-semibold hover:bg-white/90 transition-all duration-200 flex items-center justify-center space-x-2"
              >
                <span>Return to Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/training/overconfidence"
                className="flex-1 border border-white/20 text-white py-3 rounded-xl font-semibold hover:bg-white/5 transition-all duration-200 flex items-center justify-center space-x-2"
              >
                <span>Next Training</span>
                <Target className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    )
  }

  const question = availabilityHeuristicQuestions[currentQuestion]

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
                <h1 className="text-lg font-medium">Availability Heuristic Training</h1>
                <p className="text-sm text-white/60">
                  Question {currentQuestion + 1} of {availabilityHeuristicQuestions.length}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-6">
              <div className="text-sm text-white/60">
                Score:{" "}
                <span className="text-white font-medium">
                  {score}/{currentQuestion + (showExplanation ? 1 : 0)}
                </span>
              </div>
              <div className="text-sm text-white/60">
                Time:{" "}
                <span className="text-white font-medium">
                  {Math.floor(timeSpent / 60)}:{(timeSpent % 60).toString().padStart(2, "0")}
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="w-full h-1 bg-neutral-800">
        <motion.div
          className="h-full bg-gradient-to-r from-orange-500 to-red-600"
          initial={{ width: 0 }}
          animate={{
            width: `${((currentQuestion + (showExplanation ? 1 : 0)) / availabilityHeuristicQuestions.length) * 100}%`,
          }}
          transition={{ duration: 0.5 }}
        />
      </div>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4 }}
          >
            {/* Scenario */}
            <div className="bg-neutral-900/40 border border-neutral-800/50 rounded-2xl p-8 backdrop-blur-sm mb-8">
              <div className="flex items-start space-x-4 mb-6">
                <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Lightbulb className="w-6 h-6 text-orange-400" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold mb-2">Scenario</h2>
                  <p className="text-white/80 leading-relaxed">{question.scenario}</p>
                </div>
              </div>

              <div className="border-t border-neutral-800/50 pt-6">
                <h3 className="text-lg font-semibold mb-4">{question.question}</h3>
              </div>
            </div>

            {/* Options */}
            <div className="space-y-4 mb-8">
              {question.options.map((option, index) => (
                <motion.button
                  key={option.id}
                  onClick={() => handleAnswerSelect(option.id)}
                  disabled={showExplanation}
                  className={`w-full p-6 rounded-xl border text-left transition-all duration-200 ${
                    selectedAnswer === option.id
                      ? showExplanation
                        ? option.isCorrect
                          ? "bg-green-500/20 border-green-500/50 text-green-100"
                          : "bg-red-500/20 border-red-500/50 text-red-100"
                        : "bg-white/10 border-white/30"
                      : showExplanation && option.isCorrect
                        ? "bg-green-500/20 border-green-500/50 text-green-100"
                        : "bg-neutral-900/40 border-neutral-800/50 hover:border-neutral-700/50 hover:bg-neutral-900/60"
                  } ${showExplanation ? "cursor-default" : "cursor-pointer"}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={!showExplanation ? { scale: 1.02 } : {}}
                  whileTap={!showExplanation ? { scale: 0.98 } : {}}
                >
                  <div className="flex items-start space-x-4">
                    <div
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-1 ${
                        selectedAnswer === option.id
                          ? showExplanation
                            ? option.isCorrect
                              ? "border-green-500 bg-green-500"
                              : "border-red-500 bg-red-500"
                            : "border-white bg-white"
                          : showExplanation && option.isCorrect
                            ? "border-green-500 bg-green-500"
                            : "border-white/30"
                      }`}
                    >
                      {((selectedAnswer === option.id && showExplanation) || (showExplanation && option.isCorrect)) && (
                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.2 }}>
                          {option.isCorrect ? (
                            <CheckCircle className="w-4 h-4 text-white" />
                          ) : selectedAnswer === option.id ? (
                            <XCircle className="w-4 h-4 text-white" />
                          ) : null}
                        </motion.div>
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium mb-2">{option.text}</p>
                      {showExplanation && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          transition={{ duration: 0.3 }}
                          className="text-sm opacity-90 leading-relaxed"
                        >
                          <div className="border-t border-current/20 pt-3 mt-3">
                            <div className="flex items-center space-x-2 mb-2">
                              <span className="font-medium">Availability Susceptibility:</span>
                              <span
                                className={`px-2 py-1 rounded-full text-xs font-medium ${
                                  option.biasLevel === "high"
                                    ? "bg-red-500/20 text-red-300"
                                    : option.biasLevel === "medium"
                                      ? "bg-yellow-500/20 text-yellow-300"
                                      : "bg-green-500/20 text-green-300"
                                }`}
                              >
                                {option.biasLevel.toUpperCase()}
                              </span>
                            </div>
                            <p>{option.explanation}</p>
                          </div>
                        </motion.div>
                      )}
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>

            {/* Learning Point */}
            {showExplanation && (
              <motion.div
                className="bg-orange-500/10 border border-orange-500/30 rounded-xl p-6 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <div className="flex items-start space-x-3">
                  <TrendingUp className="w-5 h-5 text-orange-400 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-orange-100 mb-2">Key Learning Point</h4>
                    <p className="text-orange-200/80 leading-relaxed">{question.learningPoint}</p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Navigation */}
            <div className="flex items-center justify-between">
              <button
                onClick={handlePrevQuestion}
                disabled={currentQuestion === 0}
                className="flex items-center space-x-2 px-6 py-3 border border-neutral-800/50 rounded-xl text-white/60 hover:text-white hover:border-neutral-700/50 transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Previous</span>
              </button>

              {!showExplanation ? (
                <button
                  onClick={handleSubmitAnswer}
                  disabled={!selectedAnswer}
                  className="flex items-center space-x-2 bg-white text-black px-6 py-3 rounded-xl font-semibold hover:bg-white/90 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span>Submit Answer</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={handleNextQuestion}
                  className="flex items-center space-x-2 bg-white text-black px-6 py-3 rounded-xl font-semibold hover:bg-white/90 transition-all duration-200"
                >
                  <span>
                    {currentQuestion === availabilityHeuristicQuestions.length - 1 ? "Complete" : "Next Question"}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  )
}
