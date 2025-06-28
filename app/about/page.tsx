"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Brain, Users, Target, Award, ArrowRight, Linkedin, Twitter, Github } from "lucide-react"

export default function About() {
  const team = [
    {
      name: "Dr. Sarah Chen",
      role: "Chief Cognitive Officer",
      bio: "Former Stanford researcher with 15+ years in cognitive psychology and bias detection.",
      image: "/placeholder.svg?height=300&width=300",
      social: { linkedin: "#", twitter: "#" },
    },
    {
      name: "Marcus Rodriguez",
      role: "Head of AI Engineering",
      bio: "Ex-Google AI researcher specializing in natural language processing and machine learning.",
      image: "/placeholder.svg?height=300&width=300",
      social: { linkedin: "#", github: "#" },
    },
    {
      name: "Dr. Emily Watson",
      role: "Director of Training Design",
      bio: "Cognitive behavioral therapist and expert in designing effective learning interventions.",
      image: "/placeholder.svg?height=300&width=300",
      social: { linkedin: "#", twitter: "#" },
    },
    {
      name: "Alex Kim",
      role: "Product Design Lead",
      bio: "Former Apple designer focused on creating intuitive and accessible user experiences.",
      image: "/placeholder.svg?height=300&width=300",
      social: { linkedin: "#", twitter: "#" },
    },
  ]

  const milestones = [
    { year: "2022", title: "Company Founded", description: "Started with a mission to democratize cognitive training" },
    { year: "2023", title: "AI Integration", description: "Launched first AI-powered bias detection system" },
    { year: "2023", title: "10K Users", description: "Reached 10,000 active cognitive training participants" },
    { year: "2024", title: "Voice Features", description: "Introduced natural language processing and voice analysis" },
    { year: "2024", title: "NFT Achievements", description: "Pioneered blockchain-verified cognitive milestones" },
  ]

  const values = [
    {
      icon: Brain,
      title: "Scientific Rigor",
      description:
        "Every feature is backed by peer-reviewed cognitive psychology research and validated through testing.",
    },
    {
      icon: Users,
      title: "Accessibility First",
      description:
        "Cognitive training should be available to everyone, regardless of background or technical expertise.",
    },
    {
      icon: Target,
      title: "Measurable Impact",
      description: "We focus on delivering quantifiable improvements in decision-making and cognitive performance.",
    },
    {
      icon: Award,
      title: "Continuous Innovation",
      description: "We constantly evolve our platform using the latest advances in AI and cognitive science.",
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
              <Link href="/features" className="text-white/70 hover:text-white transition-colors">
                Features
              </Link>
              <Link href="/pricing" className="text-white/70 hover:text-white transition-colors">
                Pricing
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
              Redefining Human
              <br />
              <span className="bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">Potential</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/70 mb-12 max-w-3xl mx-auto leading-relaxed">
              We're building the future of cognitive enhancement, where AI and human intelligence work together to
              eliminate bias and unlock better decision-making.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-light mb-8">
                Our Mission
                <br />
                <span className="text-white/70">Matters</span>
              </h2>
              <div className="space-y-6 text-lg text-white/80 leading-relaxed">
                <p>
                  Every day, humans make thousands of decisions influenced by cognitive biases that evolved for a
                  different world. These mental shortcuts, once survival tools, now cost us billions in poor business
                  decisions, failed relationships, and missed opportunities.
                </p>
                <p>
                  We believe that with the right training and AI assistance, every person can learn to recognize and
                  overcome these biases. Our platform doesn't just teach you about cognitive biases—it helps you
                  experience them, understand them, and develop the mental tools to transcend them.
                </p>
                <p>
                  This isn't just about individual improvement. When millions of people make better decisions, we create
                  a more rational, empathetic, and effective society.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="bg-neutral-900/40 border border-neutral-800/50 rounded-2xl p-8 backdrop-blur-sm">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-4xl font-light mb-2">50K+</div>
                    <div className="text-white/60">Users Trained</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-light mb-2">23%</div>
                    <div className="text-white/60">Avg. Improvement</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-light mb-2">15+</div>
                    <div className="text-white/60">Bias Types</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-light mb-2">99.2%</div>
                    <div className="text-white/60">Satisfaction</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
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
              Our Core
              <br />
              <span className="text-white/70">Values</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                className="bg-neutral-900/40 border border-neutral-800/50 rounded-2xl p-8 backdrop-blur-sm text-center"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -4 }}
              >
                <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <value.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4">{value.title}</h3>
                <p className="text-white/70 leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-light mb-6">
              Meet the
              <br />
              <span className="text-white/70">Team</span>
            </h2>
            <p className="text-xl text-white/60 max-w-2xl mx-auto">
              World-class experts in cognitive psychology, AI, and product design working together to enhance human
              decision-making.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                className="bg-neutral-900/40 border border-neutral-800/50 rounded-2xl p-6 backdrop-blur-sm text-center"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -4 }}
              >
                <div className="w-24 h-24 bg-neutral-700 rounded-full mx-auto mb-4 overflow-hidden">
                  <img
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-lg font-semibold mb-1">{member.name}</h3>
                <p className="text-white/60 text-sm mb-3">{member.role}</p>
                <p className="text-white/70 text-sm leading-relaxed mb-4">{member.bio}</p>
                <div className="flex justify-center space-x-3">
                  {member.social.linkedin && (
                    <a href={member.social.linkedin} className="text-white/40 hover:text-white transition-colors">
                      <Linkedin className="w-4 h-4" />
                    </a>
                  )}
                  {member.social.twitter && (
                    <a href={member.social.twitter} className="text-white/40 hover:text-white transition-colors">
                      <Twitter className="w-4 h-4" />
                    </a>
                  )}
                  {member.social.github && (
                    <a href={member.social.github} className="text-white/40 hover:text-white transition-colors">
                      <Github className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
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
              Our
              <br />
              <span className="text-white/70">Journey</span>
            </h2>
          </motion.div>

          <div className="space-y-8">
            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.year}
                className="flex items-start space-x-6"
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center">
                    <span className="text-lg font-semibold">{milestone.year}</span>
                  </div>
                </div>
                <div className="flex-1 pt-2">
                  <h3 className="text-xl font-semibold mb-2">{milestone.title}</h3>
                  <p className="text-white/70 leading-relaxed">{milestone.description}</p>
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
              Join Our
              <br />
              <span className="text-white/70">Mission</span>
            </h2>
            <p className="text-xl text-white/60 mb-12 max-w-2xl mx-auto">
              Help us build a world where better decision-making is accessible to everyone. Start your cognitive
              training journey today.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/auth/signup"
                className="inline-flex items-center space-x-2 bg-white text-black px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/90 transition-all duration-300 active:scale-95"
              >
                <span>Start Training</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/careers"
                className="inline-flex items-center space-x-2 border border-white/20 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/5 transition-all duration-300 active:scale-95"
              >
                <span>Join Our Team</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
