"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { Brain, Check, ArrowRight, Zap, Crown, Rocket } from "lucide-react"

export default function Pricing() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly")

  const plans = [
    {
      id: "explorer",
      name: "Explorer",
      description: "Perfect for getting started with cognitive training",
      icon: Zap,
      price: { monthly: 0, yearly: 0 },
      priceId: { monthly: "", yearly: "" },
      features: [
        "5 bias assessments per month",
        "Basic progress tracking",
        "Community access",
        "Mobile app access",
        "Email support",
        "Basic AI insights",
      ],
      limitations: ["Limited training modules", "No voice features", "No NFT achievements"],
      cta: "Get Started Free",
      popular: false,
    },
    {
      id: "trainer",
      name: "Trainer",
      description: "For serious cognitive athletes",
      icon: Brain,
      price: { monthly: 19, yearly: 190 },
      priceId: {
        monthly: "price_trainer_monthly",
        yearly: "price_trainer_yearly",
      },
      features: [
        "Unlimited bias assessments",
        "AI-powered insights with Gemini",
        "Advanced analytics dashboard",
        "Voice training with ElevenLabs",
        "Speech-to-text analysis",
        "NFT achievement system",
        "Global leaderboard access",
        "Priority email support",
        "Personalized training programs",
        "Progress export features",
      ],
      limitations: [],
      cta: "Start Training",
      popular: true,
      savings: billingCycle === "yearly" ? "17%" : null,
    },
    {
      id: "master",
      name: "Master",
      description: "For cognitive excellence and teams",
      icon: Crown,
      price: { monthly: 49, yearly: 490 },
      priceId: {
        monthly: "price_master_monthly",
        yearly: "price_master_yearly",
      },
      features: [
        "Everything in Trainer",
        "1-on-1 AI coaching sessions",
        "Custom training programs",
        "Advanced voice synthesis options",
        "Team management features",
        "API access for integrations",
        "White-label options",
        "Premium NFT collections",
        "Dedicated account manager",
        "Phone support",
        "Custom integrations",
        "Advanced reporting",
      ],
      limitations: [],
      cta: "Go Premium",
      popular: false,
      savings: billingCycle === "yearly" ? "17%" : null,
    },
  ]

  const handleSubscribe = async (priceId: string) => {
    try {
      const response = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ priceId }),
      })

      const { sessionId } = await response.json()

      // Redirect to Stripe Checkout
      const stripe = await import("stripe")
      window.location.href = `https://checkout.stripe.com/pay/${sessionId}`
    } catch (error) {
      console.error("Subscription error:", error)
    }
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
              <Link href="/auth/signin" className="text-white/70 hover:text-white transition-colors">
                Sign In
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
              Choose Your
              <br />
              <span className="bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
                Cognitive Path
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-white/70 mb-12 max-w-3xl mx-auto leading-relaxed">
              Unlock your mental potential with our scientifically-designed training programs. Start free, upgrade when
              you're ready to accelerate your growth.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Billing Toggle */}
      <section className="pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="flex items-center justify-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-neutral-900/50 border border-neutral-800/50 rounded-xl p-1 flex">
              <button
                onClick={() => setBillingCycle("monthly")}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                  billingCycle === "monthly" ? "bg-white text-black" : "text-white/70 hover:text-white"
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle("yearly")}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 relative ${
                  billingCycle === "yearly" ? "bg-white text-black" : "text-white/70 hover:text-white"
                }`}
              >
                Yearly
                <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                  Save 17%
                </span>
              </button>
            </div>
          </motion.div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.id}
                className={`relative ${plan.popular ? "scale-105 z-10" : ""}`}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20">
                    <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-semibold flex items-center space-x-1">
                      <Rocket className="w-3 h-3" />
                      <span>Most Popular</span>
                    </div>
                  </div>
                )}

                <div
                  className={`bg-neutral-900/40 border rounded-2xl p-8 backdrop-blur-sm transition-all duration-500 hover:bg-neutral-900/60 h-full flex flex-col ${
                    plan.popular
                      ? "border-blue-500/50 shadow-2xl shadow-blue-500/20"
                      : "border-neutral-800/50 hover:border-neutral-700/50"
                  }`}
                >
                  {/* Plan Header */}
                  <div className="text-center mb-8">
                    <div
                      className={`w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center ${
                        plan.popular ? "bg-gradient-to-br from-blue-500 to-purple-600" : "bg-white/10"
                      }`}
                    >
                      <plan.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-semibold mb-2">{plan.name}</h3>
                    <p className="text-white/60 text-sm mb-6">{plan.description}</p>

                    <div className="flex items-baseline justify-center mb-2">
                      <span className="text-4xl font-light">${plan.price[billingCycle]}</span>
                      {plan.price[billingCycle] > 0 && (
                        <span className="text-white/60 ml-1">/{billingCycle === "monthly" ? "month" : "year"}</span>
                      )}
                    </div>

                    {plan.savings && billingCycle === "yearly" && (
                      <div className="text-green-400 text-sm font-medium">Save {plan.savings} vs monthly</div>
                    )}
                  </div>

                  {/* Features */}
                  <div className="flex-1">
                    <ul className="space-y-4 mb-8">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start space-x-3">
                          <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                          <span className="text-white/80 text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {plan.limitations.length > 0 && (
                      <div className="mb-8">
                        <h4 className="text-white/60 text-sm font-medium mb-3">Not included:</h4>
                        <ul className="space-y-2">
                          {plan.limitations.map((limitation, limitIndex) => (
                            <li key={limitIndex} className="flex items-start space-x-3">
                              <div className="w-5 h-5 flex-shrink-0 mt-0.5">
                                <div className="w-3 h-3 border border-white/30 rounded-full mx-auto mt-1"></div>
                              </div>
                              <span className="text-white/50 text-sm">{limitation}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* CTA Button */}
                  <motion.button
                    onClick={() =>
                      plan.price[billingCycle] > 0
                        ? handleSubscribe(plan.priceId[billingCycle])
                        : (window.location.href = "/auth/signup")
                    }
                    className={`w-full py-4 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center space-x-2 ${
                      plan.popular
                        ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700"
                        : plan.price[billingCycle] === 0
                          ? "bg-white text-black hover:bg-white/90"
                          : "border border-white/20 text-white hover:bg-white/5"
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span>{plan.cta}</span>
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-6 border-t border-white/10">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-light mb-6">
              Frequently Asked
              <br />
              <span className="text-white/70">Questions</span>
            </h2>
          </motion.div>

          <div className="space-y-6">
            {[
              {
                question: "Can I switch plans anytime?",
                answer:
                  "Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately, and we'll prorate any billing differences.",
              },
              {
                question: "What makes the AI analysis so accurate?",
                answer:
                  "We use Google's Gemini AI, one of the most advanced language models available, combined with cognitive psychology research to provide precise bias detection and personalized insights.",
              },
              {
                question: "How do NFT achievements work?",
                answer:
                  "When you reach cognitive milestones, we mint unique NFT certificates on the Polygon blockchain. These are yours to keep forever as proof of your cognitive development achievements.",
              },
              {
                question: "Is my data secure?",
                answer:
                  "Absolutely. We use Supabase for enterprise-grade security, end-to-end encryption, and comply with GDPR and other privacy regulations. Your cognitive data is never shared without your explicit consent.",
              },
              {
                question: "Can I use this on mobile?",
                answer:
                  "Yes! Our platform works seamlessly on web browsers and we're launching native mobile apps built with Expo for iOS and Android with full feature parity.",
              },
              {
                question: "What if I'm not satisfied?",
                answer:
                  "We offer a 30-day money-back guarantee. If you're not completely satisfied with your cognitive improvement, we'll refund your subscription, no questions asked.",
              },
            ].map((faq, index) => (
              <motion.div
                key={index}
                className="bg-neutral-900/40 border border-neutral-800/50 rounded-xl p-6 backdrop-blur-sm"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <h3 className="text-lg font-semibold mb-3">{faq.question}</h3>
                <p className="text-white/70 leading-relaxed">{faq.answer}</p>
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
              Start Your Cognitive
              <br />
              <span className="text-white/70">Transformation Today</span>
            </h2>
            <p className="text-xl text-white/60 mb-12 max-w-2xl mx-auto">
              Join thousands of professionals, entrepreneurs, and decision-makers who've already upgraded their
              thinking.
            </p>
            <Link
              href="/auth/signup"
              className="inline-flex items-center space-x-2 bg-white text-black px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/90 transition-all duration-300 active:scale-95"
            >
              <span>Begin Free Trial</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
