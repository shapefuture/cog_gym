"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowLeft, Shield, Eye, Lock, Database, Users, FileText } from "lucide-react"

export default function Privacy() {
  const sections = [
    {
      id: "information-collection",
      title: "Information We Collect",
      icon: Database,
      content: [
        "Account information (email, name, profile details)",
        "Training session data and cognitive assessment results",
        "Usage analytics and interaction patterns",
        "Voice recordings (processed locally, not stored permanently)",
        "Device information and browser data",
        "Payment information (processed securely through Stripe)",
      ],
    },
    {
      id: "how-we-use",
      title: "How We Use Your Information",
      icon: Eye,
      content: [
        "Provide personalized cognitive training experiences",
        "Generate AI-powered insights and recommendations",
        "Track your progress and improvement over time",
        "Improve our services and develop new features",
        "Send important updates and training reminders",
        "Ensure platform security and prevent fraud",
      ],
    },
    {
      id: "data-sharing",
      title: "Data Sharing and Disclosure",
      icon: Users,
      content: [
        "We do not sell your personal information to third parties",
        "Anonymized, aggregated data may be used for research purposes",
        "Service providers (hosting, analytics) with strict data protection agreements",
        "Legal compliance when required by law or to protect our rights",
        "Business transfers (with user notification and consent options)",
      ],
    },
    {
      id: "data-security",
      title: "Data Security",
      icon: Lock,
      content: [
        "End-to-end encryption for sensitive cognitive data",
        "Secure cloud infrastructure with regular security audits",
        "Access controls and authentication for all team members",
        "Regular backups with encrypted storage",
        "Incident response procedures for any security events",
        "Compliance with industry security standards",
      ],
    },
    {
      id: "your-rights",
      title: "Your Privacy Rights",
      icon: Shield,
      content: [
        "Access your personal data and download a copy",
        "Correct inaccurate or incomplete information",
        "Delete your account and associated data",
        "Opt out of non-essential communications",
        "Control data sharing for research purposes",
        "Request data portability to other services",
      ],
    },
    {
      id: "data-retention",
      title: "Data Retention",
      icon: FileText,
      content: [
        "Account data: Retained while your account is active",
        "Training data: Kept for analysis and progress tracking",
        "Voice recordings: Processed in real-time, not permanently stored",
        "Analytics data: Anonymized and retained for service improvement",
        "Deleted account data: Removed within 30 days of deletion request",
        "Legal compliance: Some data may be retained as required by law",
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-neutral-800/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/" className="text-white/60 hover:text-white transition-colors">
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <div>
                <h1 className="text-lg font-medium">Privacy Policy</h1>
                <p className="text-sm text-white/60">How we protect and use your data</p>
              </div>
            </div>
            <div className="text-sm text-white/60">Last updated: December 2024</div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12">
        {/* Introduction */}
        <motion.section
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-12">
            <motion.div
              className="w-16 h-16 bg-blue-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Shield className="w-8 h-8 text-blue-400" />
            </motion.div>
            <h1 className="text-4xl md:text-5xl font-light mb-6">Privacy Policy</h1>
            <p className="text-xl text-white/70 leading-relaxed max-w-3xl mx-auto">
              At Cognitive Gym, we take your privacy seriously. This policy explains how we collect, use, and protect
              your personal information while providing you with the best cognitive training experience.
            </p>
          </div>

          <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-3 text-blue-100">Our Commitment to Privacy</h3>
            <p className="text-blue-200/80 leading-relaxed">
              Your cognitive training data is sensitive and personal. We use industry-leading security measures to
              protect your information and never sell your personal data to third parties. You maintain full control
              over your data and can request its deletion at any time.
            </p>
          </div>
        </motion.section>

        {/* Privacy Sections */}
        <div className="space-y-12">
          {sections.map((section, index) => (
            <motion.section
              key={section.id}
              className="bg-neutral-900/40 border border-neutral-800/50 rounded-2xl p-8 backdrop-blur-sm"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="flex items-start space-x-4 mb-6">
                <div className="w-12 h-12 bg-neutral-800/50 rounded-xl flex items-center justify-center flex-shrink-0">
                  <section.icon className="w-6 h-6 text-white/80" />
                </div>
                <div>
                  <h2 className="text-2xl font-semibold mb-2">{section.title}</h2>
                </div>
              </div>

              <ul className="space-y-3">
                {section.content.map((item, itemIndex) => (
                  <motion.li
                    key={itemIndex}
                    className="flex items-start space-x-3"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 + itemIndex * 0.05 }}
                  >
                    <div className="w-1.5 h-1.5 bg-white/60 rounded-full mt-2 flex-shrink-0" />
                    <span className="text-white/80 leading-relaxed">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.section>
          ))}
        </div>

        {/* Contact Section */}
        <motion.section
          className="mt-16 bg-neutral-900/40 border border-neutral-800/50 rounded-2xl p-8 backdrop-blur-sm text-center"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <h2 className="text-2xl font-semibold mb-4">Questions About Privacy?</h2>
          <p className="text-white/70 mb-6 leading-relaxed">
            If you have any questions about this Privacy Policy or how we handle your data, please don't hesitate to
            contact us.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="bg-white text-black px-6 py-3 rounded-xl font-semibold hover:bg-white/90 transition-all duration-200"
            >
              Contact Us
            </Link>
            <Link
              href="/settings"
              className="border border-white/20 text-white px-6 py-3 rounded-xl font-semibold hover:bg-white/5 transition-all duration-200"
            >
              Privacy Settings
            </Link>
          </div>
        </motion.section>

        {/* Footer Note */}
        <motion.div
          className="mt-12 text-center text-white/50 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
        >
          <p>
            This Privacy Policy is effective as of December 2024 and may be updated from time to time. We will notify
            you of any significant changes.
          </p>
        </motion.div>
      </main>
    </div>
  )
}
