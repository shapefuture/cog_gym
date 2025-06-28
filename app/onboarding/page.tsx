"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"
import { Brain, ArrowRight, ArrowLeft, Target, TrendingUp, Users, CheckCircle } from "lucide-react"

interface OnboardingStep {
  id: string
  title: string
  description: string
  component: React.ReactNode
}

export default function Onboarding() {
  const [currentStep, setCurrentStep] = useState(0)
  const [userData, setUserData] = useState({
    goals: [] as string[],
    experience: "",
    interests: [] as string[],
    timeCommitment: "",
    notifications: true,
  })
  const router = useRouter()

  const goals = [
    { id: "decision-making", label: "Better Decision Making", icon: Brain },
    { id: "bias-awareness", label: "Bias Awareness", icon: Target },
    { id: "critical-thinking", label: "Critical Thinking", icon: TrendingUp },
    { id: "leadership", label: "Leadership Skills", icon: Users },
  ]

  const experiences = [
    { id: "beginner", label: "Beginner", description: "New to cognitive training" },
    { id: "intermediate", label: "Intermediate", description: "Some experience with psychology/training" },
    { id: "advanced", label: "Advanced", description: "Experienced in cognitive science" },
  ]

  const interests = [
    "Business Strategy",
    "Investment Decisions",
    "Personal Relationships",
    "Academic Research",
    "Creative Problem Solving",
    "Team Management",
  ]

  const timeCommitments = [
    { id: "5-min", label: "5 minutes/day", description: "Quick daily check-ins" },
    { id: "15-min", label: "15 minutes/day", description: "Focused training sessions" },
    { id: "30-min", label: "30 minutes/day", description: "Comprehensive training" },
    { id: "flexible", label: "Flexible", description: "I'll decide as I go" },
  ]

  const steps: OnboardingStep[] = [
    {
      id: "welcome",
      title: "Welcome to Cognitive Gym",
      description: "Let's personalize your cognitive training experience",
      component: (
        <div className="text-center">
          <motion.div
            className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-8"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Brain className="w-12 h-12 text-white" />
          </motion.div>
          <p className="text-lg text-white/80 leading-relaxed">
            We'll ask you a few questions to create a personalized training program that fits your goals and schedule.
          </p>
        </div>
      ),
    },
    {
      id: "goals",
      title: "What are your main goals?",
      description: "Select all that apply to customize your training",
      component: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {goals.map((goal) => (
            <motion.button
              key={goal.id}
              onClick={() => {
                setUserData((prev) => ({
                  ...prev,
                  goals: prev.goals.includes(goal.id)
                    ? prev.goals.filter((g) => g !== goal.id)
                    : [...prev.goals, goal.id],
                }))
              }}
              className={`p-6 rounded-xl border text-left transition-all duration-200 ${
                userData.goals.includes(goal.id)
                  ? "bg-white/10 border-white/30"
                  : "bg-neutral-900/40 border-neutral-800/50 hover:border-neutral-700/50"
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center space-x-4">
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    userData.goals.includes(goal.id) ? "bg-white/20" : "bg-neutral-800/50"
                  }`}
                >
                  <goal.icon className="w-6 h-6" />
                </div>
                <span className="font-medium">{goal.label}</span>
              </div>
            </motion.button>
          ))}
        </div>
      ),
    },
    {
      id: "experience",
      title: "What's your experience level?",
      description: "This helps us adjust the difficulty of your training",
      component: (
        <div className="space-y-4">
          {experiences.map((exp) => (
            <motion.button
              key={exp.id}
              onClick={() => setUserData((prev) => ({ ...prev, experience: exp.id }))}
              className={`w-full p-6 rounded-xl border text-left transition-all duration-200 ${
                userData.experience === exp.id
                  ? "bg-white/10 border-white/30"
                  : "bg-neutral-900/40 border-neutral-800/50 hover:border-neutral-700/50"
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <h3 className="font-semibold mb-2">{exp.label}</h3>
              <p className="text-white/70 text-sm">{exp.description}</p>
            </motion.button>
          ))}
        </div>
      ),
    },
    {
      id: "interests",
      title: "What areas interest you most?",
      description: "We'll focus your training on these domains",
      component: (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {interests.map((interest) => (
            <motion.button
              key={interest}
              onClick={() => {
                setUserData((prev) => ({
                  ...prev,
                  interests: prev.interests.includes(interest)
                    ? prev.interests.filter((i) => i !== interest)
                    : [...prev.interests, interest],
                }))
              }}
              className={`p-4 rounded-xl border text-center transition-all duration-200 ${
                userData.interests.includes(interest)
                  ? "bg-white/10 border-white/30"
                  : "bg-neutral-900/40 border-neutral-800/50 hover:border-neutral-700/50"
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="text-sm font-medium">{interest}</span>
            </motion.button>
          ))}
        </div>
      ),
    },
    {
      id: "time",
      title: "How much time can you commit?",
      description: "We'll design your training schedule accordingly",
      component: (
        <div className="space-y-4">
          {timeCommitments.map((time) => (
            <motion.button
              key={time.id}
              onClick={() => setUserData((prev) => ({ ...prev, timeCommitment: time.id }))}
              className={`w-full p-6 rounded-xl border text-left transition-all duration-200 ${
                userData.timeCommitment === time.id
                  ? "bg-white/10 border-white/30"
                  : "bg-neutral-900/40 border-neutral-800/50 hover:border-neutral-700/50"
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <h3 className="font-semibold mb-2">{time.label}</h3>
              <p className="text-white/70 text-sm">{time.description}</p>
            </motion.button>
          ))}
        </div>
      ),
    },
    {
      id: "complete",
      title: "You're all set!",
      description: "Your personalized cognitive training program is ready",
      component: (
        <div className="text-center">
          <motion.div
            className="w-24 h-24 bg-green-500 rounded-3xl flex items-center justify-center mx-auto mb-8"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <CheckCircle className="w-12 h-12 text-white" />
          </motion.div>

          <div className="bg-neutral-900/40 border border-neutral-800/50 rounded-xl p-6 mb-8">
            <h3 className="font-semibold mb-4">Your Training Plan</h3>
            <div className="space-y-3 text-sm text-white/80">
              <p>
                <strong>Goals:</strong> {userData.goals.length} selected
              </p>
              <p>
                <strong>Experience:</strong> {experiences.find((e) => e.id === userData.experience)?.label}
              </p>
              <p>
                <strong>Focus Areas:</strong> {userData.interests.length} selected
              </p>
              <p>
                <strong>Time Commitment:</strong> {timeCommitments.find((t) => t.id === userData.timeCommitment)?.label}
              </p>
            </div>
          </div>

          <p className="text-white/70 leading-relaxed">
            Based on your preferences, we've created a personalized training program. You can always adjust these
            settings later in your profile.
          </p>
        </div>
      ),
    },
  ]

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1)
    } else {
      // Save onboarding data and redirect to dashboard
      localStorage.setItem("onboarding_data", JSON.stringify(userData))
      router.push("/dashboard")
    }
  }

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1)
    }
  }

  const canProceed = () => {
    switch (steps[currentStep].id) {
      case "goals":
        return userData.goals.length > 0
      case "experience":
        return userData.experience !== ""
      case "interests":
        return userData.interests.length > 0
      case "time":
        return userData.timeCommitment !== ""
      default:
        return true
    }
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-6">
      <div className="w-full max-w-2xl">
        {/* Progress Bar */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm text-white/60">
              Step {currentStep + 1} of {steps.length}
            </span>
            <span className="text-sm text-white/60">
              {Math.round(((currentStep + 1) / steps.length) * 100)}% Complete
            </span>
          </div>
          <div className="w-full h-2 bg-neutral-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-500 to-purple-600"
              initial={{ width: 0 }}
              animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        {/* Step Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4 }}
            className="mb-12"
          >
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-light mb-4">{steps[currentStep].title}</h1>
              <p className="text-white/70 text-lg">{steps[currentStep].description}</p>
            </div>

            <div className="bg-neutral-900/20 border border-neutral-800/30 rounded-2xl p-8 backdrop-blur-sm">
              {steps[currentStep].component}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={handlePrev}
            disabled={currentStep === 0}
            className="flex items-center space-x-2 px-6 py-3 border border-neutral-800/50 rounded-xl text-white/60 hover:text-white hover:border-neutral-700/50 transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          <motion.button
            onClick={handleNext}
            disabled={!canProceed()}
            className="flex items-center space-x-2 bg-white text-black px-6 py-3 rounded-xl font-semibold hover:bg-white/90 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            whileHover={{ scale: canProceed() ? 1.02 : 1 }}
            whileTap={{ scale: canProceed() ? 0.98 : 1 }}
          >
            <span>{currentStep === steps.length - 1 ? "Get Started" : "Continue"}</span>
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </div>
      </div>
    </div>
  )
}
