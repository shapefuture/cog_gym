"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowLeft, FileText, Scale, AlertTriangle, Users, CreditCard, Shield } from "lucide-react"

export default function Terms() {
  const sections = [
    {
      id: "acceptance",
      title: "Acceptance of Terms",
      icon: FileText,
      content: [
        "By accessing or using Cognitive Gym, you agree to be bound by these Terms of Service",
        "If you do not agree to these terms, please do not use our service",
        "We may update these terms from time to time with notice to users",
        "Continued use after changes constitutes acceptance of new terms",
      ],
    },
    {
      id: "service-description",
      title: "Service Description",
      icon: Users,
      content: [
        "Cognitive Gym provides AI-powered cognitive bias training and assessment tools",
        "Our platform includes training modules, progress tracking, and personalized recommendations",
        "Voice analysis and NFT achievements are premium features",
        "We reserve the right to modify or discontinue features with reasonable notice",
      ],
    },
    {
      id: "user-accounts",
      title: "User Accounts and Responsibilities",
      icon: Shield,
      content: [
        "You must provide accurate and complete information when creating an account",
        "You are responsible for maintaining the security of your account credentials",
        "You must not share your account with others or use multiple accounts",
        "You must be at least 13 years old to use our service",
        "Notify us immediately of any unauthorized use of your account",
      ],
    },
    {
      id: "acceptable-use",
      title: "Acceptable Use Policy",
      icon: Scale,
      content: [
        "Use the service only for lawful purposes and in accordance with these terms",
        "Do not attempt to reverse engineer, hack, or compromise our systems",
        "Do not upload malicious content or attempt to disrupt the service",
        "Respect other users and do not engage in harassment or abuse",
        "Do not use the service to collect data about other users",
      ],
    },
    {
      id: "payment-terms",
      title: "Payment and Billing",
      icon: CreditCard,
      content: [
        "Subscription fees are billed in advance on a monthly or annual basis",
        "All payments are processed securely through Stripe",
        "Refunds are available within 30 days of purchase for annual subscriptions",
        "You may cancel your subscription at any time through your account settings",
        "Access to premium features ends when your subscription expires",
        "Price changes will be communicated 30 days in advance",
      ],
    },
    {
      id: "intellectual-property",
      title: "Intellectual Property",
      icon: AlertTriangle,
      content: [
        "All content, features, and functionality are owned by Cognitive Gym",
        "You retain ownership of your personal training data and progress",
        "NFT achievements are digital assets that you own upon earning",
        "You may not reproduce, distribute, or create derivative works without permission",
        "Our trademarks and logos may not be used without written consent",
      ],
    },
    {
      id: "limitation-liability",
      title: "Limitation of Liability",
      icon: AlertTriangle,
      content: [
        "Cognitive Gym is provided 'as is' without warranties of any kind",
        "We are not liable for any indirect, incidental, or consequential damages",
        "Our total liability is limited to the amount you paid in the last 12 months",
        "We do not guarantee specific cognitive improvement outcomes",
        "You use the service at your own risk and discretion",
      ],
    },
    {
      id: "termination",
      title: "Termination",
      icon: AlertTriangle,
      content: [
        "Either party may terminate this agreement at any time",
        "We may suspend or terminate accounts for violation of these terms",
        "Upon termination, your access to the service will cease immediately",
        "You may request deletion of your data within 30 days of termination",
        "Certain provisions of these terms survive termination",
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
                <h1 className="text-lg font-medium">Terms of Service</h1>
                <p className="text-sm text-white/60">Legal terms and conditions</p>
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
              className="w-16 h-16 bg-purple-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Scale className="w-8 h-8 text-purple-400" />
            </motion.div>
            <h1 className="text-4xl md:text-5xl font-light mb-6">Terms of Service</h1>
            <p className="text-xl text-white/70 leading-relaxed max-w-3xl mx-auto">
              These terms govern your use of Cognitive Gym and outline the rights and responsibilities of both users and
              our platform.
            </p>
          </div>

          <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-3 text-yellow-100">Important Notice</h3>
            <p className="text-yellow-200/80 leading-relaxed">
              Please read these terms carefully before using our service. By creating an account or using Cognitive Gym,
              you agree to be legally bound by these terms and conditions.
            </p>
          </div>
        </motion.section>

        {/* Terms Sections */}
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
          <h2 className="text-2xl font-semibold mb-4">Questions About These Terms?</h2>
          <p className="text-white/70 mb-6 leading-relaxed">
            If you have any questions about these Terms of Service or need clarification on any provisions, please
            contact our legal team.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="bg-white text-black px-6 py-3 rounded-xl font-semibold hover:bg-white/90 transition-all duration-200"
            >
              Contact Legal Team
            </Link>
            <Link
              href="/privacy"
              className="border border-white/20 text-white px-6 py-3 rounded-xl font-semibold hover:bg-white/5 transition-all duration-200"
            >
              Privacy Policy
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
            These Terms of Service are governed by the laws of Delaware, United States. Any disputes will be resolved
            through binding arbitration.
          </p>
        </motion.div>
      </main>
    </div>
  )
}
