"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight, Brain, Target, TrendingUp, Users, Zap, Star, Check } from "lucide-react"

export default function LandingPage() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  }

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Navigation */}
      <motion.nav
        className="fixed top-0 w-full z-50 backdrop-blur-xl border-b border-white/10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                <Brain className="w-5 h-5 text-black" />
              </div>
              <span className="text-xl font-semibold">Cognitive Gym</span>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <Link href="#features" className="text-white/70 hover:text-white transition-colors">
                Features
              </Link>
              <Link href="#pricing" className="text-white/70 hover:text-white transition-colors">
                Pricing
              </Link>
              <Link href="#about" className="text-white/70 hover:text-white transition-colors">
                About
              </Link>
            </div>

            <div className="flex items-center space-x-4">
              <Link href="/auth/signin" className="text-white/70 hover:text-white transition-colors">
                Sign In
              </Link>
              <Link
                href="/auth/signup"
                className="bg-white text-black px-6 py-2 rounded-lg font-medium hover:bg-white/90 transition-all duration-200 active:scale-95"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div variants={staggerChildren} initial="initial" animate={isVisible ? "animate" : "initial"}>
            <motion.h1 variants={fadeInUp} className="text-6xl md:text-8xl font-light tracking-tight mb-8">
              Train Your
              <br />
              <span className="bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
                Cognitive Edge
              </span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-xl md:text-2xl text-white/70 mb-12 max-w-3xl mx-auto leading-relaxed"
            >
              The world's first AI-powered cognitive bias training platform. Sharpen your decision-making, eliminate
              blind spots, and unlock your mental potential.
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/auth/signup"
                className="group bg-white text-black px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/90 transition-all duration-300 flex items-center space-x-2 active:scale-95"
              >
                <span>Start Training</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="/demo"
                className="border border-white/20 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/5 transition-all duration-300 active:scale-95"
              >
                Watch Demo
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-1/4 left-1/4 w-2 h-2 bg-white/20 rounded-full"
            animate={{
              y: [0, -20, 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 4,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute top-1/3 right-1/3 w-1 h-1 bg-white/30 rounded-full"
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 0.9, 0.3],
            }}
            transition={{
              duration: 6,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: 2,
            }}
          />
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-light mb-6">
              Precision-Engineered for
              <br />
              <span className="text-white/70">Cognitive Excellence</span>
            </h2>
            <p className="text-xl text-white/60 max-w-2xl mx-auto">
              Every feature designed to eliminate bias and enhance decision-making
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Brain,
                title: "AI-Powered Analysis",
                description: "Advanced algorithms detect and analyze your cognitive patterns in real-time",
              },
              {
                icon: Target,
                title: "Bias Detection",
                description: "Identify confirmation bias, anchoring effects, and 20+ other cognitive traps",
              },
              {
                icon: TrendingUp,
                title: "Progress Tracking",
                description: "Detailed analytics show your improvement over time with precision metrics",
              },
              {
                icon: Users,
                title: "Peer Challenges",
                description: "Compete with other users in cognitive challenges and leaderboards",
              },
              {
                icon: Zap,
                title: "Micro-Learning",
                description: "Quick 2-minute exercises that fit seamlessly into your daily routine",
              },
              {
                icon: Star,
                title: "NFT Achievements",
                description: "Earn unique digital badges and certificates for your cognitive milestones",
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="bg-neutral-900/40 border border-neutral-800/50 rounded-2xl p-8 backdrop-blur-sm transition-all duration-500 hover:border-neutral-700/50 hover:bg-neutral-900/60">
                  <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-white/20 transition-colors">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                  <p className="text-white/70 leading-relaxed">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-light mb-6">
              Choose Your
              <br />
              <span className="text-white/70">Training Level</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                name: "Explorer",
                price: "Free",
                description: "Perfect for getting started",
                features: ["5 bias assessments per month", "Basic progress tracking", "Community access", "Mobile app"],
              },
              {
                name: "Trainer",
                price: "$19",
                period: "/month",
                description: "For serious cognitive athletes",
                features: [
                  "Unlimited bias assessments",
                  "AI-powered insights",
                  "Advanced analytics",
                  "Priority support",
                  "NFT achievements",
                  "Leaderboard access",
                ],
                popular: true,
              },
              {
                name: "Master",
                price: "$49",
                period: "/month",
                description: "For cognitive excellence",
                features: [
                  "Everything in Trainer",
                  "1-on-1 coaching sessions",
                  "Custom training programs",
                  "API access",
                  "White-label options",
                  "Advanced NFT rewards",
                ],
              },
            ].map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`relative ${plan.popular ? "scale-105" : ""}`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-white text-black px-4 py-1 rounded-full text-sm font-semibold">Most Popular</div>
                  </div>
                )}

                <div
                  className={`bg-neutral-900/40 border rounded-2xl p-8 backdrop-blur-sm transition-all duration-500 hover:bg-neutral-900/60 ${
                    plan.popular ? "border-white/30" : "border-neutral-800/50 hover:border-neutral-700/50"
                  }`}
                >
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-semibold mb-2">{plan.name}</h3>
                    <div className="flex items-baseline justify-center mb-2">
                      <span className="text-4xl font-light">{plan.price}</span>
                      {plan.period && <span className="text-white/60 ml-1">{plan.period}</span>}
                    </div>
                    <p className="text-white/60">{plan.description}</p>
                  </div>

                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center space-x-3">
                        <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
                        <span className="text-white/80">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    className={`w-full py-3 rounded-xl font-semibold transition-all duration-200 active:scale-95 ${
                      plan.popular
                        ? "bg-white text-black hover:bg-white/90"
                        : "border border-white/20 text-white hover:bg-white/5"
                    }`}
                  >
                    {plan.price === "Free" ? "Get Started" : "Start Training"}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-light mb-8">
              Ready to Upgrade
              <br />
              <span className="text-white/70">Your Mind?</span>
            </h2>
            <p className="text-xl text-white/60 mb-12 max-w-2xl mx-auto">
              Join thousands of entrepreneurs, executives, and decision-makers who've transformed their thinking.
            </p>
            <Link
              href="/auth/signup"
              className="inline-flex items-center space-x-2 bg-white text-black px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/90 transition-all duration-300 active:scale-95"
            >
              <span>Begin Your Journey</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                  <Brain className="w-5 h-5 text-black" />
                </div>
                <span className="text-xl font-semibold">Cognitive Gym</span>
              </div>
              <p className="text-white/60">The future of cognitive training is here.</p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-white/60">
                <li>
                  <Link href="/features" className="hover:text-white transition-colors">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="hover:text-white transition-colors">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="/demo" className="hover:text-white transition-colors">
                    Demo
                  </Link>
                </li>
                <li>
                  <Link href="/api" className="hover:text-white transition-colors">
                    API
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-white/60">
                <li>
                  <Link href="/about" className="hover:text-white transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="hover:text-white transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/careers" className="hover:text-white transition-colors">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-white/60">
                <li>
                  <Link href="/privacy" className="hover:text-white transition-colors">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-white transition-colors">
                    Terms
                  </Link>
                </li>
                <li>
                  <Link href="/security" className="hover:text-white transition-colors">
                    Security
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 mt-12 pt-8 text-center text-white/60">
            <p>&copy; 2024 Cognitive Gym. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
