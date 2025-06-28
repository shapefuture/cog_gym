"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowLeft, Shield, Lock, Eye, Server, AlertTriangle, CheckCircle } from "lucide-react"

export default function Security() {
  const securityMeasures = [
    {
      id: "data-encryption",
      title: "End-to-End Encryption",
      icon: Lock,
      description:
        "All sensitive data is encrypted both in transit and at rest using industry-standard AES-256 encryption.",
      details: [
        "TLS 1.3 for all data transmission",
        "AES-256 encryption for stored data",
        "Encrypted database backups",
        "Zero-knowledge architecture for sensitive cognitive data",
      ],
    },
    {
      id: "access-control",
      title: "Access Control & Authentication",
      icon: Eye,
      description: "Multi-layered authentication and authorization systems protect your account and data.",
      details: [
        "Multi-factor authentication (MFA) support",
        "Role-based access control (RBAC)",
        "Session management and timeout controls",
        "Regular access audits and reviews",
      ],
    },
    {
      id: "infrastructure",
      title: "Secure Infrastructure",
      icon: Server,
      description: "Our platform runs on enterprise-grade cloud infrastructure with comprehensive security monitoring.",
      details: [
        "SOC 2 Type II compliant hosting",
        "24/7 security monitoring and alerting",
        "Regular penetration testing",
        "Automated vulnerability scanning",
      ],
    },
    {
      id: "privacy-protection",
      title: "Privacy Protection",
      icon: Shield,
      description: "Your cognitive training data is protected with advanced privacy-preserving technologies.",
      details: [
        "Data minimization principles",
        "Anonymization of research data",
        "GDPR and CCPA compliance",
        "User-controlled data retention policies",
      ],
    },
  ]

  const certifications = [
    {
      name: "SOC 2 Type II",
      description: "Audited security controls for service organizations",
      status: "Certified",
    },
    {
      name: "GDPR Compliant",
      description: "European data protection regulation compliance",
      status: "Compliant",
    },
    {
      name: "CCPA Compliant",
      description: "California Consumer Privacy Act compliance",
      status: "Compliant",
    },
    {
      name: "ISO 27001",
      description: "Information security management system standard",
      status: "In Progress",
    },
  ]

  const securityPractices = [
    "Regular security training for all team members",
    "Incident response plan with 24/7 monitoring",
    "Quarterly third-party security assessments",
    "Bug bounty program for responsible disclosure",
    "Data backup and disaster recovery procedures",
    "Secure development lifecycle (SDLC) practices",
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
                <h1 className="text-lg font-medium">Security</h1>
                <p className="text-sm text-white/60">How we protect your data and privacy</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <motion.section
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="w-20 h-20 bg-green-500/20 rounded-3xl flex items-center justify-center mx-auto mb-8"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Shield className="w-10 h-10 text-green-400" />
          </motion.div>

          <h1 className="text-4xl md:text-6xl font-light mb-6">Security First</h1>
          <p className="text-xl text-white/70 mb-8 max-w-3xl mx-auto leading-relaxed">
            Your cognitive training data is highly sensitive. We employ enterprise-grade security measures to ensure
            your information remains private, secure, and under your control.
          </p>

          <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-6 max-w-2xl mx-auto">
            <h3 className="text-lg font-semibold mb-3 text-green-100">Security Commitment</h3>
            <p className="text-green-200/80 leading-relaxed">
              We treat security as a fundamental requirement, not an afterthought. Our security practices are
              continuously audited and updated to meet the highest industry standards.
            </p>
          </div>
        </motion.section>

        {/* Security Measures */}
        <motion.section
          className="mb-16"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="text-3xl font-semibold mb-12 text-center">Security Measures</h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {securityMeasures.map((measure, index) => (
              <motion.div
                key={measure.id}
                className="bg-neutral-900/40 border border-neutral-800/50 rounded-2xl p-8 backdrop-blur-sm"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <div className="flex items-start space-x-4 mb-6">
                  <div className="w-12 h-12 bg-neutral-800/50 rounded-xl flex items-center justify-center flex-shrink-0">
                    <measure.icon className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{measure.title}</h3>
                    <p className="text-white/70 leading-relaxed">{measure.description}</p>
                  </div>
                </div>

                <ul className="space-y-2">
                  {measure.details.map((detail, detailIndex) => (
                    <motion.li
                      key={detailIndex}
                      className="flex items-start space-x-3"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 + detailIndex * 0.05 }}
                    >
                      <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                      <span className="text-white/80 text-sm">{detail}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Certifications */}
        <motion.section
          className="mb-16"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h2 className="text-3xl font-semibold mb-12 text-center">Certifications & Compliance</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {certifications.map((cert, index) => (
              <motion.div
                key={cert.name}
                className="bg-neutral-900/40 border border-neutral-800/50 rounded-xl p-6 backdrop-blur-sm text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4 ${
                    cert.status === "Certified" || cert.status === "Compliant" ? "bg-green-500/20" : "bg-yellow-500/20"
                  }`}
                >
                  {cert.status === "Certified" || cert.status === "Compliant" ? (
                    <CheckCircle className="w-6 h-6 text-green-400" />
                  ) : (
                    <AlertTriangle className="w-6 h-6 text-yellow-400" />
                  )}
                </div>

                <h3 className="font-semibold mb-2">{cert.name}</h3>
                <p className="text-white/60 text-sm mb-3">{cert.description}</p>
                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                    cert.status === "Certified" || cert.status === "Compliant"
                      ? "bg-green-500/20 text-green-300"
                      : "bg-yellow-500/20 text-yellow-300"
                  }`}
                >
                  {cert.status}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Security Practices */}
        <motion.section
          className="mb-16"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="bg-neutral-900/40 border border-neutral-800/50 rounded-2xl p-8 backdrop-blur-sm">
            <h2 className="text-2xl font-semibold mb-8">Additional Security Practices</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {securityPractices.map((practice, index) => (
                <motion.div
                  key={index}
                  className="flex items-start space-x-3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <span className="text-white/80">{practice}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Incident Response */}
        <motion.section
          className="mb-16"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-2xl p-8">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <h2 className="text-2xl font-semibold mb-4 text-blue-100">Security Incident Response</h2>
                <p className="text-blue-200/80 mb-6 leading-relaxed">
                  In the unlikely event of a security incident, we have a comprehensive response plan to minimize impact
                  and keep you informed every step of the way.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <h3 className="font-semibold mb-2 text-blue-100">Immediate Response</h3>
                    <p className="text-blue-200/70 text-sm">
                      Incident detection and containment within 15 minutes of discovery
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2 text-blue-100">User Notification</h3>
                    <p className="text-blue-200/70 text-sm">
                      Affected users notified within 72 hours with clear action steps
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2 text-blue-100">Resolution</h3>
                    <p className="text-blue-200/70 text-sm">
                      Full incident analysis and preventive measures implemented
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Contact Section */}
        <motion.section
          className="text-center"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
        >
          <div className="bg-neutral-900/40 border border-neutral-800/50 rounded-2xl p-8 backdrop-blur-sm">
            <h2 className="text-2xl font-semibold mb-4">Security Questions or Concerns?</h2>
            <p className="text-white/70 mb-6 leading-relaxed max-w-2xl mx-auto">
              Our security team is available to address any questions or concerns you may have about how we protect your
              data. We also welcome responsible security disclosures.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="bg-white text-black px-6 py-3 rounded-xl font-semibold hover:bg-white/90 transition-all duration-200"
              >
                Contact Security Team
              </Link>
              <a
                href="mailto:security@cognitivegym.com"
                className="border border-white/20 text-white px-6 py-3 rounded-xl font-semibold hover:bg-white/5 transition-all duration-200"
              >
                Report Security Issue
              </a>
            </div>
          </div>
        </motion.section>
      </main>
    </div>
  )
}
