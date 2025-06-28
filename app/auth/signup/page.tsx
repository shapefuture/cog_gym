"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Brain, ArrowRight, Eye, EyeOff, Mail, Lock, User, AlertCircle, CheckCircle } from "lucide-react"
import { signUp } from "@/lib/supabase"

export default function SignUp() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [agreedToTerms, setAgreedToTerms] = useState(false)
  const router = useRouter()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const validateForm = () => {
    if (!formData.firstName.trim()) return "First name is required"
    if (!formData.lastName.trim()) return "Last name is required"
    if (!formData.email.trim()) return "Email is required"
    if (formData.password.length < 8) return "Password must be at least 8 characters"
    if (formData.password !== formData.confirmPassword) return "Passwords don't match"
    if (!agreedToTerms) return "You must agree to the terms and conditions"
    return null
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    const validationError = validateForm()
    if (validationError) {
      setError(validationError)
      return
    }

    setIsLoading(true)

    try {
      const { data, error } = await signUp(formData.email, formData.password, {
        full_name: `${formData.firstName} ${formData.lastName}`,
        first_name: formData.firstName,
        last_name: formData.lastName,
      })

      if (error) {
        setError(error.message || "Failed to create account")
      } else {
        router.push("/onboarding")
      }
    } catch (err) {
      setError("An unexpected error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  const passwordStrength = (password: string) => {
    let strength = 0
    if (password.length >= 8) strength++
    if (/[A-Z]/.test(password)) strength++
    if (/[a-z]/.test(password)) strength++
    if (/[0-9]/.test(password)) strength++
    if (/[^A-Za-z0-9]/.test(password)) strength++
    return strength
  }

  const strength = passwordStrength(formData.password)

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-6">
      <motion.div
        className="w-full max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Logo */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Brain className="w-8 h-8 text-black" />
          </div>
          <h1 className="text-2xl font-semibold mb-2">Join Cognitive Gym</h1>
          <p className="text-white/60">Start your journey to better decision-making</p>
        </motion.div>

        {/* Error Message */}
        {error && (
          <motion.div
            className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 mb-6 flex items-center space-x-3"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
            <p className="text-red-200 text-sm">{error}</p>
          </motion.div>
        )}

        {/* Form */}
        <motion.form
          onSubmit={handleSubmit}
          className="space-y-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium mb-2">
                First Name
              </label>
              <div className="relative">
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full bg-neutral-900/50 border border-neutral-800/50 rounded-xl px-4 py-3 pl-12 text-white placeholder-white/40 focus:outline-none focus:border-white/30 transition-colors"
                  placeholder="John"
                  required
                />
                <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/40" />
              </div>
            </div>

            <div>
              <label htmlFor="lastName" className="block text-sm font-medium mb-2">
                Last Name
              </label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                value={formData.lastName}
                onChange={handleInputChange}
                className="w-full bg-neutral-900/50 border border-neutral-800/50 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-white/30 transition-colors"
                placeholder="Doe"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Email Address
            </label>
            <div className="relative">
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full bg-neutral-900/50 border border-neutral-800/50 rounded-xl px-4 py-3 pl-12 text-white placeholder-white/40 focus:outline-none focus:border-white/30 transition-colors"
                placeholder="john@example.com"
                required
              />
              <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/40" />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-2">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleInputChange}
                className="w-full bg-neutral-900/50 border border-neutral-800/50 rounded-xl px-4 py-3 pl-12 pr-12 text-white placeholder-white/40 focus:outline-none focus:border-white/30 transition-colors"
                placeholder="Create a strong password"
                required
              />
              <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/40" />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/40 hover:text-white/60 transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            {/* Password Strength Indicator */}
            {formData.password && (
              <div className="mt-2">
                <div className="flex space-x-1">
                  {[1, 2, 3, 4, 5].map((level) => (
                    <div
                      key={level}
                      className={`h-1 flex-1 rounded-full transition-colors ${
                        level <= strength
                          ? strength <= 2
                            ? "bg-red-500"
                            : strength <= 3
                              ? "bg-yellow-500"
                              : "bg-green-500"
                          : "bg-neutral-700"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-xs text-white/60 mt-1">
                  {strength <= 2 ? "Weak" : strength <= 3 ? "Medium" : "Strong"} password
                </p>
              </div>
            )}
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium mb-2">
              Confirm Password
            </label>
            <div className="relative">
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className="w-full bg-neutral-900/50 border border-neutral-800/50 rounded-xl px-4 py-3 pl-12 pr-12 text-white placeholder-white/40 focus:outline-none focus:border-white/30 transition-colors"
                placeholder="Confirm your password"
                required
              />
              <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/40" />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/40 hover:text-white/60 transition-colors"
              >
                {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            {/* Password Match Indicator */}
            {formData.confirmPassword && (
              <div className="mt-2 flex items-center space-x-2">
                {formData.password === formData.confirmPassword ? (
                  <>
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-xs text-green-400">Passwords match</span>
                  </>
                ) : (
                  <>
                    <AlertCircle className="w-4 h-4 text-red-500" />
                    <span className="text-xs text-red-400">Passwords don't match</span>
                  </>
                )}
              </div>
            )}
          </div>

          <div className="flex items-start space-x-3">
            <input
              type="checkbox"
              id="terms"
              checked={agreedToTerms}
              onChange={(e) => setAgreedToTerms(e.target.checked)}
              className="w-4 h-4 mt-1 rounded border-neutral-600 bg-neutral-800 text-white focus:ring-white/20"
            />
            <label htmlFor="terms" className="text-sm text-white/70 leading-relaxed">
              I agree to the{" "}
              <Link href="/terms" className="text-white hover:text-white/80 transition-colors">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className="text-white hover:text-white/80 transition-colors">
                Privacy Policy
              </Link>
            </label>
          </div>

          <motion.button
            type="submit"
            disabled={isLoading}
            className="w-full bg-white text-black py-3 rounded-xl font-semibold hover:bg-white/90 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            whileHover={{ scale: isLoading ? 1 : 1.02 }}
            whileTap={{ scale: isLoading ? 1 : 0.98 }}
          >
            {isLoading ? (
              <motion.div
                className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              />
            ) : (
              <>
                <span>Create Account</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </motion.button>
        </motion.form>

        {/* Sign In Link */}
        <motion.div
          className="mt-8 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <p className="text-white/60">
            Already have an account?{" "}
            <Link href="/auth/signin" className="text-white hover:text-white/80 transition-colors font-medium">
              Sign in
            </Link>
          </p>
        </motion.div>
      </motion.div>
    </div>
  )
}
