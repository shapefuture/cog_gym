"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowLeft, MapPin, Clock, DollarSign, Users, Heart, Zap, Target, Brain } from "lucide-react"

interface JobPosition {
  id: string
  title: string
  department: string
  location: string
  type: "Full-time" | "Part-time" | "Contract"
  salary: string
  description: string
  requirements: string[]
  benefits: string[]
  featured: boolean
}

export default function Careers() {
  const [selectedDepartment, setSelectedDepartment] = useState("all")

  const jobPositions: JobPosition[] = [
    {
      id: "senior-ai-engineer",
      title: "Senior AI Engineer",
      department: "Engineering",
      location: "San Francisco, CA / Remote",
      type: "Full-time",
      salary: "$150,000 - $200,000",
      description:
        "Lead the development of our AI-powered cognitive bias detection and training systems. Work with cutting-edge machine learning models to analyze human decision-making patterns.",
      requirements: [
        "5+ years of experience in machine learning and AI",
        "Strong background in Python, TensorFlow, or PyTorch",
        "Experience with natural language processing and voice analysis",
        "PhD in Computer Science, AI, or related field preferred",
        "Experience with cognitive science or psychology research",
      ],
      benefits: [
        "Equity package",
        "Health, dental, and vision insurance",
        "Unlimited PTO",
        "Remote work flexibility",
        "$5,000 learning budget",
      ],
      featured: true,
    },
    {
      id: "cognitive-scientist",
      title: "Cognitive Scientist",
      department: "Research",
      location: "Boston, MA / Remote",
      type: "Full-time",
      salary: "$120,000 - $160,000",
      description:
        "Design and validate cognitive bias training programs based on the latest research in cognitive psychology and behavioral economics.",
      requirements: [
        "PhD in Cognitive Psychology, Behavioral Economics, or related field",
        "3+ years of research experience in cognitive biases",
        "Strong statistical analysis skills (R, Python, SPSS)",
        "Experience designing and conducting behavioral experiments",
        "Published research in peer-reviewed journals",
      ],
      benefits: [
        "Research publication support",
        "Conference attendance budget",
        "Collaboration with leading universities",
        "Flexible research time",
        "Health and wellness benefits",
      ],
      featured: true,
    },
    {
      id: "product-designer",
      title: "Senior Product Designer",
      department: "Design",
      location: "New York, NY / Remote",
      type: "Full-time",
      salary: "$130,000 - $170,000",
      description:
        "Create intuitive and engaging user experiences for our cognitive training platform. Focus on making complex psychological concepts accessible and actionable.",
      requirements: [
        "5+ years of product design experience",
        "Strong portfolio demonstrating UX/UI design skills",
        "Experience with design systems and accessibility",
        "Proficiency in Figma, Sketch, or similar tools",
        "Understanding of behavioral psychology principles",
      ],
      benefits: [
        "Design conference budget",
        "Latest design tools and equipment",
        "Collaborative design environment",
        "User research opportunities",
        "Creative freedom",
      ],
      featured: false,
    },
    {
      id: "frontend-engineer",
      title: "Frontend Engineer",
      department: "Engineering",
      location: "Remote",
      type: "Full-time",
      salary: "$110,000 - $150,000",
      description:
        "Build responsive and interactive web applications using modern frontend technologies. Create smooth animations and engaging user interfaces for cognitive training exercises.",
      requirements: [
        "3+ years of frontend development experience",
        "Expert knowledge of React, TypeScript, and Next.js",
        "Experience with animation libraries (Framer Motion, GSAP)",
        "Strong CSS and responsive design skills",
        "Experience with testing frameworks",
      ],
      benefits: [
        "Remote-first culture",
        "Top-tier equipment",
        "Professional development budget",
        "Flexible working hours",
        "Team retreats",
      ],
      featured: false,
    },
    {
      id: "data-scientist",
      title: "Data Scientist",
      department: "Research",
      location: "Seattle, WA / Remote",
      type: "Full-time",
      salary: "$125,000 - $165,000",
      description:
        "Analyze user behavior and training effectiveness to improve our cognitive bias detection algorithms and personalization systems.",
      requirements: [
        "MS/PhD in Data Science, Statistics, or related field",
        "4+ years of experience in data analysis and modeling",
        "Proficiency in Python, R, and SQL",
        "Experience with A/B testing and experimental design",
        "Knowledge of behavioral data analysis",
      ],
      benefits: [
        "Data science conference attendance",
        "Access to large-scale behavioral datasets",
        "Research collaboration opportunities",
        "Flexible work arrangements",
        "Comprehensive benefits package",
      ],
      featured: false,
    },
    {
      id: "marketing-manager",
      title: "Growth Marketing Manager",
      department: "Marketing",
      location: "Austin, TX / Remote",
      type: "Full-time",
      salary: "$90,000 - $120,000",
      description:
        "Drive user acquisition and engagement through data-driven marketing strategies. Focus on educating the market about cognitive bias training and its benefits.",
      requirements: [
        "3+ years of growth marketing experience",
        "Experience with B2C and B2B marketing",
        "Strong analytical skills and data-driven approach",
        "Knowledge of digital marketing channels",
        "Interest in psychology and behavioral science",
      ],
      benefits: [
        "Marketing budget autonomy",
        "Performance-based bonuses",
        "Professional development opportunities",
        "Creative campaign freedom",
        "Cross-functional collaboration",
      ],
      featured: false,
    },
  ]

  const departments = ["all", "Engineering", "Research", "Design", "Marketing"]

  const filteredJobs =
    selectedDepartment === "all" ? jobPositions : jobPositions.filter((job) => job.department === selectedDepartment)

  const featuredJobs = filteredJobs.filter((job) => job.featured)
  const regularJobs = filteredJobs.filter((job) => !job.featured)

  const companyValues = [
    {
      icon: Brain,
      title: "Science-Driven",
      description: "Every decision is backed by research and data from cognitive science",
    },
    {
      icon: Users,
      title: "Collaborative",
      description: "We believe the best solutions come from diverse perspectives working together",
    },
    {
      icon: Target,
      title: "Impact-Focused",
      description: "We're building tools that genuinely improve how people think and decide",
    },
    {
      icon: Zap,
      title: "Innovation",
      description: "We push the boundaries of what's possible in cognitive training technology",
    },
  ]

  const benefits = [
    "Competitive salary and equity packages",
    "Comprehensive health, dental, and vision insurance",
    "Unlimited PTO and flexible working hours",
    "Remote work options and home office stipend",
    "Professional development budget ($5,000/year)",
    "Conference attendance and learning opportunities",
    "Team retreats and company events",
    "Mental health and wellness support",
    "Parental leave and family support",
    "401(k) with company matching",
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
                <h1 className="text-lg font-medium">Careers</h1>
                <p className="text-sm text-white/60">Join our mission to improve human decision-making</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <motion.section
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="w-20 h-20 bg-purple-500/20 rounded-3xl flex items-center justify-center mx-auto mb-8"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Heart className="w-10 h-10 text-purple-400" />
          </motion.div>

          <h1 className="text-4xl md:text-6xl font-light mb-6">
            Build the Future of
            <br />
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Human Intelligence
            </span>
          </h1>
          <p className="text-xl text-white/70 mb-8 max-w-3xl mx-auto leading-relaxed">
            Join a team of researchers, engineers, and designers working to eliminate cognitive biases and enhance human
            decision-making through cutting-edge AI technology.
          </p>

          {/* Department Filter */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
            {departments.map((dept) => (
              <button
                key={dept}
                onClick={() => setSelectedDepartment(dept)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  selectedDepartment === dept
                    ? "bg-white text-black"
                    : "bg-neutral-800/50 text-white/70 hover:bg-neutral-700/50 hover:text-white"
                }`}
              >
                {dept === "all" ? "All Departments" : dept}
              </button>
            ))}
          </div>
        </motion.section>

        {/* Company Values */}
        <motion.section
          className="mb-20"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="text-3xl font-semibold mb-12 text-center">Our Values</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {companyValues.map((value, index) => (
              <motion.div
                key={value.title}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <div className="w-16 h-16 bg-neutral-800/50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-8 h-8 text-purple-400" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                <p className="text-white/70 leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Featured Jobs */}
        {featuredJobs.length > 0 && (
          <motion.section
            className="mb-16"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h2 className="text-3xl font-semibold mb-12">Featured Positions</h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredJobs.map((job, index) => (
                <motion.div
                  key={job.id}
                  className="bg-neutral-900/40 border border-neutral-800/50 rounded-2xl p-8 backdrop-blur-sm hover:border-neutral-700/50 transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-sm font-medium">
                          Featured
                        </span>
                        <span className="bg-neutral-800/50 text-white/60 px-3 py-1 rounded-full text-sm">
                          {job.department}
                        </span>
                      </div>
                      <h3 className="text-2xl font-semibold mb-2">{job.title}</h3>
                    </div>
                  </div>

                  <div className="flex items-center space-x-6 text-sm text-white/60 mb-6">
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4" />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4" />
                      <span>{job.type}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <DollarSign className="w-4 h-4" />
                      <span>{job.salary}</span>
                    </div>
                  </div>

                  <p className="text-white/80 mb-6 leading-relaxed">{job.description}</p>

                  <div className="mb-6">
                    <h4 className="font-semibold mb-3">Key Requirements:</h4>
                    <ul className="space-y-2">
                      {job.requirements.slice(0, 3).map((req, reqIndex) => (
                        <li key={reqIndex} className="flex items-start space-x-2 text-sm text-white/70">
                          <div className="w-1.5 h-1.5 bg-white/60 rounded-full mt-2 flex-shrink-0" />
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button className="w-full bg-white text-black py-3 rounded-xl font-semibold hover:bg-white/90 transition-all duration-200">
                    Apply Now
                  </button>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Regular Jobs */}
        {regularJobs.length > 0 && (
          <motion.section
            className="mb-16"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <h2 className="text-3xl font-semibold mb-12">Open Positions</h2>

            <div className="space-y-6">
              {regularJobs.map((job, index) => (
                <motion.div
                  key={job.id}
                  className="bg-neutral-900/40 border border-neutral-800/50 rounded-xl p-6 backdrop-blur-sm hover:border-neutral-700/50 transition-all duration-300"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-xl font-semibold">{job.title}</h3>
                        <span className="bg-neutral-800/50 text-white/60 px-3 py-1 rounded-full text-sm">
                          {job.department}
                        </span>
                      </div>

                      <div className="flex items-center space-x-6 text-sm text-white/60 mb-3">
                        <div className="flex items-center space-x-2">
                          <MapPin className="w-4 h-4" />
                          <span>{job.location}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="w-4 h-4" />
                          <span>{job.type}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <DollarSign className="w-4 h-4" />
                          <span>{job.salary}</span>
                        </div>
                      </div>

                      <p className="text-white/70 leading-relaxed">{job.description}</p>
                    </div>

                    <div className="ml-6">
                      <button className="bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-white/90 transition-all duration-200">
                        Apply
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Benefits Section */}
        <motion.section
          className="mb-16"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-2xl p-8">
            <h2 className="text-3xl font-semibold mb-8 text-center">Benefits & Perks</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  className="flex items-start space-x-3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                >
                  <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0" />
                  <span className="text-white/80">{benefit}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* CTA Section */}
        <motion.section
          className="text-center"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
        >
          <div className="bg-neutral-900/40 border border-neutral-800/50 rounded-2xl p-8 backdrop-blur-sm">
            <h2 className="text-3xl font-semibold mb-4">Don't See the Right Role?</h2>
            <p className="text-white/70 mb-8 max-w-2xl mx-auto leading-relaxed">
              We're always looking for talented individuals who are passionate about improving human decision-making.
              Send us your resume and tell us how you'd like to contribute.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="mailto:careers@cognitivegym.com"
                className="bg-white text-black px-8 py-4 rounded-xl font-semibold hover:bg-white/90 transition-all duration-200"
              >
                Send Us Your Resume
              </a>
              <Link
                href="/contact"
                className="border border-white/20 text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/5 transition-all duration-200"
              >
                Get in Touch
              </Link>
            </div>
          </div>
        </motion.section>
      </main>
    </div>
  )
}
