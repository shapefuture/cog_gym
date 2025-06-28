"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Brain, ArrowRight, Eye, EyeOff, Mail, Lock, AlertCircle } from "lucide-react"
import { signIn } from "@/lib/supabase"

export default function SignIn() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const { data, error } = await signIn(email, password)

      if (error) {
        setError(error.message || "Invalid email or password")
      } else {
        router.push("/dashboard")
      }
    } catch (err) {
      setError("An unexpected error occurred")
    } finally {
      setIsLoading(false)
    }
  }

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
          <h1 className="text-2xl font-semibold mb-2">Welcome Back</h1>
          <p className="text-white/60">Continue your cognitive training journey</p>
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
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Email Address
            </label>
            <div className="relative">
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-neutral-900/50 border border-neutral-800/50 rounded-xl px-4 py-3 pl-12 text-white placeholder-white/40 focus:outline-none focus:border-white/30 transition-colors"
                placeholder="Enter your email"
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
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-neutral-900/50 border border-neutral-800/50 rounded-xl px-4 py-3 pl-12 pr-12 text-white placeholder-white/40 focus:outline-none focus:border-white/30 transition-colors"
                placeholder="Enter your password"
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
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                className="w-4 h-4 rounded border-neutral-600 bg-neutral-800 text-white focus:ring-white/20"
              />
              <span className="text-sm text-white/60">Remember me</span>
            </label>
            <Link href="/auth/forgot-password" className="text-sm text-white/60 hover:text-white transition-colors">
              Forgot password?
            </Link>
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
                <span>Sign In</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </motion.button>
        </motion.form>

        {/* Demo Account */}
        <motion.div
          className="mt-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h3 className="text-sm font-medium text-blue-100 mb-2">Demo Account</h3>
          <p className="text-xs text-blue-200/80 mb-3">Try the platform with our demo account:</p>
          <div className="text-xs text-blue-200 space-y-1">
            <p>Email: demo@cognitivegym.com</p>
            <p>Password: demo123</p>
          </div>
        </motion.div>

        {/* Sign Up Link */}
        <motion.div
          className="mt-8 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <p className="text-white/60">
            Don't have an account?{" "}
            <Link href="/auth/signup" className="text-white hover:text-white/80 transition-colors font-medium">
              Sign up for free
            </Link>
          </p>
        </motion.div>
      </motion.div>
    </div>
  )
}
