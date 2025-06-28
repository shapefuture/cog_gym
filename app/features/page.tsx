"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Brain, Target, TrendingUp, Users, Star, Mic, ArrowRight, CheckCircle } from "lucide-react"

export default function Features() {
  const fadeInUp = {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  }

  const features = [
    {
      category: "AI-Powered Analysis",
      icon: Brain,
      color: "from-blue-500 to-purple-600",
      items: [
        {
          title: "Real-time Bias Detection",
          description:
            "Advanced algorithms continuously monitor your decision-making patterns and identify cognitive biases as they occur.",
          benefits: ["Instant feedback", "Pattern recognition", "Personalized insights"],
        },
        {
          title: "Gemini AI Integration",
          description:
            "Powered by Google's most advanced AI model for sophisticated cognitive analysis and personalized recommendations.",
          benefits: ["State-of-the-art AI", "Deep learning insights", "Continuous improvement"],
        },
        {
          title: "Predictive Analytics",
          description:
            "Forecast your cognitive performance and identify potential decision-making pitfalls before they happen.",
          benefits: ["Proactive training", "Risk assessment", "Performance optimization"],
        },
      ],
    },
    {
      category: "Interactive Training",
      icon: Target,
      color: "from-green-500 to-teal-600",
      items: [
        {
          title: "Adaptive Exercises",
          description:
            "Training modules that adjust difficulty and focus areas based on your progress and identified weaknesses.",
          benefits: ["Personalized difficulty", "Targeted improvement", "Optimal challenge level"],
        },
        {
          title: "Scenario-Based Learning",
          description: "Real-world decision scenarios that help you practice cognitive skills in practical contexts.",
          benefits: ["Practical application", "Contextual learning", "Skill transfer"],
        },
        {
          title: "Micro-Learning Sessions",
          description:
            "Quick 2-5 minute exercises that fit seamlessly into your daily routine for consistent improvement.",
          benefits: ["Time efficient", "Habit formation", "Consistent progress"],
        },
      ],
    },
    {
      category: "Voice & Conversation",
      icon: Mic,
      color: "from-orange-500 to-red-600",
      items: [
        {
          title: "Voice-Activated Training",
          description:
            "Speak your thoughts and receive real-time analysis through advanced speech recognition and synthesis.",
          benefits: ["Natural interaction", "Hands-free training", "Audio feedback"],
        },
        {
          title: "AI Cognitive Coach",
          description:
            "Conversational AI that provides personalized coaching, answers questions, and guides your training journey.",
          benefits: ["24/7 availability", "Personalized guidance", "Interactive learning"],
        },
        {
          title: "ElevenLabs Voice Synthesis",
          description: "High-quality, natural-sounding voice feedback that makes training engaging and accessible.",
          benefits: ["Premium audio quality", "Multiple voice options", "Accessibility support"],
        },
      ],
    },
    {
      category: "Progress & Achievements",
      icon: TrendingUp,
      color: "from-purple-500 to-pink-600",
      items: [
        {
          title: "Detailed Analytics",
          description: "Comprehensive tracking of your cognitive improvement with detailed metrics and visualizations.",
          benefits: ["Progress visualization", "Performance metrics", "Trend analysis"],
        },
        {
          title: "NFT Achievements",
          description: "Earn unique digital certificates and badges for your cognitive milestones that you truly own.",
          benefits: ["Blockchain verified", "Collectible rewards", "Proof of achievement"],
        },
        {
          title: "Streak Tracking",
          description: "Maintain training consistency with streak counters and milestone celebrations.",
          benefits: ["Motivation boost", "Habit reinforcement", "Goal achievement"],
        },
      ],
    },
    {
      category: "Social & Competition",
      icon: Users,
      color: "from-teal-500 to-blue-600",
      items: [
        {
          title: "Global Leaderboards",
          description: "Compete with cognitive athletes worldwide and see how your skills stack up against others.",
          benefits: ["Competitive motivation", "Global community", "Skill benchmarking"],
        },
        {
          title: "Peer Challenges",
          description:
            "Challenge friends and colleagues to cognitive exercises and compare your decision-making abilities.",
          benefits: ["Social engagement", "Friendly competition", "Collaborative learning"],
        },
        {
          title: "Community Insights",
          description:
            "Learn from the collective wisdom of the cognitive training community through shared insights and strategies.",
          benefits: ["Collective intelligence", "Shared learning", "Community support"],
        },
      ],
    },
    {
      category: "Premium Features",
      icon: Star,
      color: "from-yellow-500 to-orange-600",
      items: [
        {
          title: "Stripe Integration",
          description: "Seamless subscription management with secure payment processing and flexible billing options.",
          benefits: ["Secure payments", "Flexible plans", "Easy management"],
        },
        {
          title: "Cross-Platform Access",
          description:
            "Train anywhere with native mobile apps, web access, and synchronized progress across all devices.",
          benefits: ["Device flexibility", "Sync across platforms", "Always accessible"],
        },
        {
          title: "Advanced Security",
          description:
            "Enterprise-grade security with Supabase backend ensuring your data is always protected and private.",
          benefits: ["Data protection", "Privacy first", "Secure infrastructure"],
        },
      ],
    },
  ]

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
              <Link href="/pricing" className="text-white/70 hover:text-white transition-colors">
                Pricing
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
          <motion.div {...fadeInUp}>
            <h1 className="text-5xl md:text-7xl font-light tracking-tight mb-8">
              Features That
              <br />
              <span className="bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
                Transform Minds
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-white/70 mb-12 max-w-3xl mx-auto leading-relaxed">
              Discover the comprehensive suite of tools designed to eliminate cognitive biases and enhance your
              decision-making capabilities.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="space-y-24">
            {features.map((category, categoryIndex) => (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="text-center mb-16">
                  <div
                    className={`w-16 h-16 bg-gradient-to-br ${category.color} rounded-2xl flex items-center justify-center mx-auto mb-6`}
                  >
                    <category.icon className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="text-3xl md:text-4xl font-light mb-4">{category.category}</h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {category.items.map((feature, featureIndex) => (
                    <motion.div
                      key={feature.title}
                      className="bg-neutral-900/40 border border-neutral-800/50 rounded-2xl p-8 backdrop-blur-sm hover:border-neutral-700/50 transition-all duration-500 group"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: featureIndex * 0.1 }}
                      viewport={{ once: true }}
                      whileHover={{ y: -4 }}
                    >
                      <h3 className="text-xl font-semibold mb-4 group-hover:text-white/90 transition-colors">
                        {feature.title}
                      </h3>
                      <p className="text-white/70 mb-6 leading-relaxed">{feature.description}</p>

                      <div className="space-y-3">
                        {feature.benefits.map((benefit, benefitIndex) => (
                          <div key={benefitIndex} className="flex items-center space-x-3">
                            <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                            <span className="text-sm text-white/80">{benefit}</span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Integration Showcase */}
      <section className="py-20 px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-light mb-6">
              Powered by
              <br />
              <span className="text-white/70">Industry Leaders</span>
            </h2>
            <p className="text-xl text-white/60 max-w-2xl mx-auto">
              Built with the most advanced technologies for cognitive training
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { name: "Google Gemini", description: "Advanced AI Analysis" },
              { name: "Supabase", description: "Real-time Database" },
              { name: "Stripe", description: "Secure Payments" },
              { name: "ElevenLabs", description: "Voice Synthesis" },
              { name: "Google Cloud", description: "Speech Recognition" },
              { name: "Polygon", description: "NFT Blockchain" },
              { name: "Expo", description: "Mobile Platform" },
              { name: "Vercel", description: "Global Deployment" },
            ].map((integration, index) => (
              <motion.div
                key={integration.name}
                className="bg-neutral-900/40 border border-neutral-800/50 rounded-xl p-6 text-center backdrop-blur-sm hover:border-neutral-700/50 transition-all duration-300"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <h3 className="font-semibold mb-2">{integration.name}</h3>
                <p className="text-sm text-white/60">{integration.description}</p>
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
              Ready to Experience
              <br />
              <span className="text-white/70">Cognitive Excellence?</span>
            </h2>
            <p className="text-xl text-white/60 mb-12 max-w-2xl mx-auto">
              Join thousands of professionals who've transformed their decision-making with our advanced cognitive
              training platform.
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
                href="/demo"
                className="inline-flex items-center space-x-2 border border-white/20 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/5 transition-all duration-300 active:scale-95"
              >
                <span>Watch Demo</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
