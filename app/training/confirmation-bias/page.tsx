"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Brain, ArrowRight, ArrowLeft, CheckCircle, XCircle, Target, TrendingUp } from "lucide-react"
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

const confirmationBiasQuestions: Question[] = [
  {
    id: "cb_1",
    scenario:
      "You're a hiring manager reviewing resumes for a software engineer position. You have a strong preference for candidates from prestigious universities.",
    question: "Which approach best demonstrates awareness of confirmation bias?",
    options: [
      {
        id: "a",
        text: "Focus primarily on university rankings when shortlisting candidates",
        isCorrect: false,
        explanation:
          "This shows strong confirmation bias - you're seeking information that confirms your preconception about prestigious universities.",
        biasLevel: "high",
      },
      {
        id: "b",
        text: "Create a structured evaluation rubric that weights technical skills, experience, and cultural fit equally, regardless of educational background",
        isCorrect: true,
        explanation:
          "This systematic approach helps counteract confirmation bias by focusing on job-relevant criteria rather than preconceptions.",
        biasLevel: "low",
      },
      {
        id: "c",
        text: "Give slight preference to prestigious university graduates but also consider other factors",
        isCorrect: false,
        explanation:
          "While better than option A, this still shows moderate confirmation bias by maintaining the university preference.",
        biasLevel: "medium",
      },
    ],
    context: "Confirmation bias in hiring can lead to homogeneous teams and missed talent from diverse backgrounds.",
    learningPoint:
      "Use structured, criteria-based evaluation methods to reduce the influence of preconceptions in decision-making.",
  },
  {
    id: "cb_2",
    scenario:
      "You believe that remote work reduces productivity. You're researching this topic to present to your team.",
    question: "How can you minimize confirmation bias in your research?",
    options: [
      {
        id: "a",
        text: "Search for 'remote work productivity problems' and 'why remote work fails'",
        isCorrect: false,
        explanation:
          "This search strategy will only find information that confirms your existing belief, showing strong confirmation bias.",
        biasLevel: "high",
      },
      {
        id: "b",
        text: "Look for both positive and negative studies about remote work, and actively seek data that challenges your assumption",
        isCorrect: true,
        explanation:
          "Actively seeking disconfirming evidence is a key strategy to overcome confirmation bias and reach more balanced conclusions.",
        biasLevel: "low",
      },
      {
        id: "c",
        text: "Focus on productivity studies but include a few positive remote work articles for balance",
        isCorrect: false,
        explanation:
          "While including some opposing views is better, the focus is still on confirming your belief rather than objective evaluation.",
        biasLevel: "medium",
      },
    ],
    context: "Confirmation bias in research can lead to one-sided conclusions and poor business decisions.",
    learningPoint:
      "Actively seek disconfirming evidence and use neutral search terms when researching important decisions.",
  },
  {
    id: "cb_3",
    scenario:
      "You're an investor who believes that tech stocks will continue to outperform. You're deciding whether to increase your tech allocation.",
    question: "What's the best approach to avoid confirmation bias in this investment decision?",
    options: [
      {
        id: "a",
        text: "Read tech industry news and analyst reports that support continued growth",
        isCorrect: false,
        explanation:
          "Only consuming information that supports your view is a classic example of confirmation bias in investing.",
        biasLevel: "high",
      },
      {
        id: "b",
        text: "Create a devil's advocate analysis: actively research reasons why tech stocks might underperform and weight this equally with positive analysis",
        isCorrect: true,
        explanation:
          "Devil's advocate analysis forces you to consider opposing viewpoints and helps counteract confirmation bias.",
        biasLevel: "low",
      },
      {
        id: "c",
        text: "Look at both positive and negative tech news but trust your gut feeling about tech's future",
        isCorrect: false,
        explanation:
          "While considering both sides is good, relying on 'gut feeling' often means defaulting to confirmation bias.",
        biasLevel: "medium",
      },
    ],
    context: "Confirmation bias in investing can lead to poor diversification and significant financial losses.",
    learningPoint:
      "Use devil's advocate analysis and systematic evaluation criteria to challenge your investment assumptions.",
  },
]

export default function ConfirmationBiasTraining() {
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

    const question = confirmationBiasQuestions[currentQuestion]
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
    if (currentQuestion < confirmationBiasQuestions.length - 1) {
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
    const accuracy = Math.round((score / confirmationBiasQuestions.length) * 100)

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
              className="w-20 h-20 bg-gradient-to-br from-green-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-6"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <CheckCircle className="w-10 h-10 text-white" />
            </motion.div>

            <h1 className="text-3xl font-light mb-4">Training Complete!</h1>
            <p className="text-white/70 mb-8">You've completed the Confirmation Bias training module</p>

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
              <h3 className="text-lg font-semibold mb-4">Your Bias Profile</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-white/70">Low Bias Responses</span>
                  <span className="text-green-400">
                    {biasScore.low}/{answers.length}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/70">Medium Bias Responses</span>
                  <span className="text-yellow-400">
                    {biasScore.medium}/{answers.length}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/70">High Bias Responses</span>
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
                href="/training/anchoring-bias"
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

  const question = confirmationBiasQuestions[currentQuestion]

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
                <h1 className="text-lg font-medium">Confirmation Bias Training</h1>
                <p className="text-sm text-white/60">
                  Question {currentQuestion + 1} of {confirmationBiasQuestions.length}
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
          className="h-full bg-white"
          initial={{ width: 0 }}
          animate={{
            width: `${((currentQuestion + (showExplanation ? 1 : 0)) / confirmationBiasQuestions.length) * 100}%`,
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
                <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Brain className="w-6 h-6 text-blue-400" />
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
                              <span className="font-medium">Bias Level:</span>
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
                className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-6 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <div className="flex items-start space-x-3">
                  <TrendingUp className="w-5 h-5 text-blue-400 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-blue-100 mb-2">Key Learning Point</h4>
                    <p className="text-blue-200/80 leading-relaxed">{question.learningPoint}</p>
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
                  <span>{currentQuestion === confirmationBiasQuestions.length - 1 ? "Complete" : "Next Question"}</span>
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
