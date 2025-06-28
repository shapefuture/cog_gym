"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { Brain, ArrowRight, ArrowLeft, Mail, CheckCircle } from "lucide-react"

export default function ForgotPassword() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isEmailSent, setIsEmailSent] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsLoading(false)
    setIsEmailSent(true)
  }

  if (isEmailSent) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center p-6">
        <motion.div
          className="w-full max-w-md text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="w-20 h-20 bg-green-500 rounded-2xl flex items-center justify-center mx-auto mb-6"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <CheckCircle className="w-10 h-10 text-white" />
          </motion.div>

          <h1 className="text-2xl font-semibold mb-4">Check Your Email</h1>
          <p className="text-white/70 mb-8 leading-relaxed">
            We've sent a password reset link to <strong>{email}</strong>. Click the link in the email to reset your
            password.
          </p>

          <div className="space-y-4">
            <p className="text-sm text-white/60">Didn't receive the email? Check your spam folder or try again.</p>

            <div className="flex flex-col space-y-3">
              <button
                onClick={() => setIsEmailSent(false)}
                className="text-white/70 hover:text-white transition-colors text-sm"
              >
                Try a different email address
              </button>

              <Link
                href="/auth/signin"
                className="flex items-center justify-center space-x-2 border border-white/20 text-white px-6 py-3 rounded-xl font-medium hover:bg-white/5 transition-all duration-200"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Sign In</span>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    )
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
          <h1 className="text-2xl font-semibold mb-2">Reset Your Password</h1>
          <p className="text-white/60">Enter your email address and we'll send you a link to reset your password</p>
        </motion.div>

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
                placeholder="Enter your email address"
                required
              />
              <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/40" />
            </div>
          </div>

          <motion.button
            type="submit"
            disabled={isLoading || !email}
            className="w-full bg-white text-black py-3 rounded-xl font-semibold hover:bg-white/90 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            whileHover={{ scale: isLoading || !email ? 1 : 1.02 }}
            whileTap={{ scale: isLoading || !email ? 1 : 0.98 }}
          >
            {isLoading ? (
              <motion.div
                className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              />
            ) : (
              <>
                <span>Send Reset Link</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </motion.button>
        </motion.form>

        {/* Back to Sign In */}
        <motion.div
          className="mt-8 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Link
            href="/auth/signin"
            className="inline-flex items-center space-x-2 text-white/60 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Sign In</span>
          </Link>
        </motion.div>

        {/* Help Text */}
        <motion.div
          className="mt-8 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4">
            <h3 className="text-sm font-medium text-blue-100 mb-2">Need Help?</h3>
            <p className="text-xs text-blue-200/80 leading-relaxed">
              If you're having trouble resetting your password, contact our support team at{" "}
              <a href="mailto:support@cognitivegym.com" className="text-blue-300 hover:text-blue-200 transition-colors">
                support@cognitivegym.com
              </a>
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
