"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowLeft, Mail, MessageCircle, Phone, MapPin, Send, CheckCircle } from "lucide-react"

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    type: "general",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const contactTypes = [
    { value: "general", label: "General Inquiry" },
    { value: "support", label: "Technical Support" },
    { value: "sales", label: "Sales & Pricing" },
    { value: "partnership", label: "Partnership" },
    { value: "press", label: "Press & Media" },
    { value: "careers", label: "Careers" },
  ]

  const contactMethods = [
    {
      icon: Mail,
      title: "Email Support",
      description: "Get help with your account or technical issues",
      contact: "support@cognitivegym.com",
      responseTime: "Within 24 hours",
    },
    {
      icon: MessageCircle,
      title: "Live Chat",
      description: "Chat with our team in real-time",
      contact: "Available in app",
      responseTime: "Instant response",
    },
    {
      icon: Phone,
      title: "Phone Support",
      description: "Speak directly with our support team",
      contact: "+1 (555) 123-4567",
      responseTime: "Mon-Fri, 9AM-6PM PST",
    },
  ]

  const offices = [
    {
      city: "San Francisco",
      address: "123 Innovation Drive\nSan Francisco, CA 94105",
      type: "Headquarters",
    },
    {
      city: "New York",
      address: "456 Tech Avenue\nNew York, NY 10001",
      type: "East Coast Office",
    },
    {
      city: "London",
      address: "789 Cognitive Street\nLondon, UK EC1A 1BB",
      type: "European Office",
    },
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSubmitting(false)
    setIsSubmitted(true)

    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
        type: "general",
      })
    }, 3000)
  }

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
                <h1 className="text-lg font-medium">Contact Us</h1>
                <p className="text-sm text-white/60">Get in touch with our team</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <motion.section
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="w-20 h-20 bg-blue-500/20 rounded-3xl flex items-center justify-center mx-auto mb-8"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <MessageCircle className="w-10 h-10 text-blue-400" />
          </motion.div>

          <h1 className="text-4xl md:text-6xl font-light mb-6">Get in Touch</h1>
          <p className="text-xl text-white/70 mb-8 max-w-3xl mx-auto leading-relaxed">
            Have questions about Cognitive Gym? Need technical support? Want to explore partnerships? We're here to help
            and would love to hear from you.
          </p>
        </motion.section>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <motion.section
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-neutral-900/40 border border-neutral-800/50 rounded-2xl p-8 backdrop-blur-sm">
              <h2 className="text-2xl font-semibold mb-6">Send us a message</h2>

              {isSubmitted ? (
                <motion.div
                  className="text-center py-12"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-green-400" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Message Sent!</h3>
                  <p className="text-white/70">Thank you for reaching out. We'll get back to you within 24 hours.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-neutral-800/50 border border-neutral-700/50 rounded-lg px-4 py-3 focus:outline-none focus:border-white/30 transition-colors"
                        placeholder="Your full name"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-neutral-800/50 border border-neutral-700/50 rounded-lg px-4 py-3 focus:outline-none focus:border-white/30 transition-colors"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="type" className="block text-sm font-medium mb-2">
                      Inquiry Type
                    </label>
                    <select
                      id="type"
                      name="type"
                      value={formData.type}
                      onChange={handleInputChange}
                      className="w-full bg-neutral-800/50 border border-neutral-700/50 rounded-lg px-4 py-3 focus:outline-none focus:border-white/30 transition-colors"
                    >
                      {contactTypes.map((type) => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium mb-2">
                      Subject *
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-neutral-800/50 border border-neutral-700/50 rounded-lg px-4 py-3 focus:outline-none focus:border-white/30 transition-colors"
                      placeholder="Brief description of your inquiry"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className="w-full bg-neutral-800/50 border border-neutral-700/50 rounded-lg px-4 py-3 focus:outline-none focus:border-white/30 transition-colors resize-none"
                      placeholder="Tell us more about your inquiry..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-white text-black py-4 rounded-xl font-semibold hover:bg-white/90 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.section>

          {/* Contact Information */}
          <motion.section
            className="space-y-8"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {/* Contact Methods */}
            <div>
              <h2 className="text-2xl font-semibold mb-6">Other ways to reach us</h2>
              <div className="space-y-4">
                {contactMethods.map((method, index) => (
                  <motion.div
                    key={method.title}
                    className="bg-neutral-900/40 border border-neutral-800/50 rounded-xl p-6 backdrop-blur-sm"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-neutral-800/50 rounded-xl flex items-center justify-center flex-shrink-0">
                        <method.icon className="w-6 h-6 text-blue-400" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">{method.title}</h3>
                        <p className="text-white/70 text-sm mb-2">{method.description}</p>
                        <p className="text-blue-400 font-medium">{method.contact}</p>
                        <p className="text-white/60 text-xs">{method.responseTime}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Office Locations */}
            <div>
              <h2 className="text-2xl font-semibold mb-6">Our offices</h2>
              <div className="space-y-4">
                {offices.map((office, index) => (
                  <motion.div
                    key={office.city}
                    className="bg-neutral-900/40 border border-neutral-800/50 rounded-xl p-6 backdrop-blur-sm"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 + 0.3 }}
                  >
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-neutral-800/50 rounded-xl flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-6 h-6 text-purple-400" />
                      </div>
                      <div>
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="font-semibold">{office.city}</h3>
                          <span className="bg-neutral-800/50 text-white/60 px-2 py-1 rounded text-xs">
                            {office.type}
                          </span>
                        </div>
                        <p className="text-white/70 text-sm whitespace-pre-line">{office.address}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* FAQ Link */}
            <motion.div
              className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-xl p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <h3 className="font-semibold mb-2 text-blue-100">Looking for quick answers?</h3>
              <p className="text-blue-200/80 text-sm mb-4">
                Check out our FAQ section for answers to common questions about Cognitive Gym, billing, and technical
                support.
              </p>
              <Link
                href="/faq"
                className="inline-flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors text-sm font-medium"
              >
                <span>Visit FAQ</span>
                <ArrowLeft className="w-4 h-4 rotate-180" />
              </Link>
            </motion.div>
          </motion.section>
        </div>

        {/* Response Time Notice */}
        <motion.section
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
        >
          <div className="bg-neutral-900/40 border border-neutral-800/50 rounded-xl p-6 backdrop-blur-sm max-w-2xl mx-auto">
            <h3 className="font-semibold mb-2">Response Time Commitment</h3>
            <p className="text-white/70 text-sm leading-relaxed">
              We typically respond to all inquiries within 24 hours during business days. For urgent technical issues,
              premium subscribers receive priority support with faster response times.
            </p>
          </div>
        </motion.section>
      </main>
    </div>
  )
}
