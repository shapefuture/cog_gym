"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowLeft, Calendar, Clock, User, ArrowRight, Search } from "lucide-react"

interface BlogPost {
  id: string
  title: string
  excerpt: string
  content: string
  author: string
  publishedAt: string
  readTime: number
  category: string
  tags: string[]
  featured: boolean
}

export default function Blog() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const blogPosts: BlogPost[] = [
    {
      id: "cognitive-bias-workplace",
      title: "How Cognitive Biases Impact Workplace Decision-Making",
      excerpt:
        "Explore the most common cognitive biases that affect professional environments and learn practical strategies to overcome them.",
      content: "Full article content...",
      author: "Dr. Sarah Chen",
      publishedAt: "2024-12-15",
      readTime: 8,
      category: "Research",
      tags: ["workplace", "decision-making", "bias"],
      featured: true,
    },
    {
      id: "ai-cognitive-training",
      title: "The Science Behind AI-Powered Cognitive Training",
      excerpt:
        "Discover how artificial intelligence is revolutionizing the way we understand and train our cognitive abilities.",
      content: "Full article content...",
      author: "Marcus Johnson",
      publishedAt: "2024-12-12",
      readTime: 6,
      category: "Technology",
      tags: ["AI", "training", "neuroscience"],
      featured: true,
    },
    {
      id: "confirmation-bias-guide",
      title: "A Complete Guide to Overcoming Confirmation Bias",
      excerpt:
        "Learn what confirmation bias is, why it happens, and proven techniques to make more objective decisions.",
      content: "Full article content...",
      author: "Dr. Emily Rodriguez",
      publishedAt: "2024-12-10",
      readTime: 12,
      category: "Education",
      tags: ["confirmation-bias", "critical-thinking", "psychology"],
      featured: false,
    },
    {
      id: "nft-achievements",
      title: "The Psychology of Digital Achievements and NFTs",
      excerpt: "How blockchain-based achievements tap into our motivation systems and enhance learning outcomes.",
      content: "Full article content...",
      author: "Alex Kim",
      publishedAt: "2024-12-08",
      readTime: 5,
      category: "Technology",
      tags: ["NFT", "motivation", "gamification"],
      featured: false,
    },
    {
      id: "anchoring-bias-investing",
      title: "Anchoring Bias in Investment Decisions",
      excerpt:
        "Why first impressions matter too much in financial decisions and how to make better investment choices.",
      content: "Full article content...",
      author: "David Park",
      publishedAt: "2024-12-05",
      readTime: 10,
      category: "Finance",
      tags: ["anchoring", "investing", "behavioral-finance"],
      featured: false,
    },
    {
      id: "voice-analysis-emotions",
      title: "Voice Analysis: The Future of Emotion Detection",
      excerpt:
        "How voice pattern analysis is opening new frontiers in understanding human emotions and cognitive states.",
      content: "Full article content...",
      author: "Dr. Lisa Wang",
      publishedAt: "2024-12-03",
      readTime: 7,
      category: "Research",
      tags: ["voice-analysis", "emotions", "technology"],
      featured: false,
    },
  ]

  const categories = ["all", "Research", "Technology", "Education", "Finance"]

  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesCategory = selectedCategory === "all" || post.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  const featuredPosts = filteredPosts.filter((post) => post.featured)
  const regularPosts = filteredPosts.filter((post) => !post.featured)

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
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
                <h1 className="text-lg font-medium">Cognitive Insights Blog</h1>
                <p className="text-sm text-white/60">Latest research and insights on cognitive training</p>
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
          <h1 className="text-4xl md:text-6xl font-light mb-6">Cognitive Insights</h1>
          <p className="text-xl text-white/70 mb-8 max-w-3xl mx-auto leading-relaxed">
            Explore the latest research, insights, and practical applications in cognitive science, bias training, and
            decision-making optimization.
          </p>

          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 max-w-2xl mx-auto">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/40" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-neutral-900/50 border border-neutral-700/50 rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:border-white/30 transition-colors"
              />
            </div>

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-neutral-900/50 border border-neutral-700/50 rounded-lg px-4 py-3 focus:outline-none focus:border-white/30 transition-colors"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category === "all" ? "All Categories" : category}
                </option>
              ))}
            </select>
          </div>
        </motion.section>

        {/* Featured Posts */}
        {featuredPosts.length > 0 && (
          <motion.section
            className="mb-16"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-2xl font-semibold mb-8">Featured Articles</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredPosts.map((post, index) => (
                <motion.article
                  key={post.id}
                  className="bg-neutral-900/40 border border-neutral-800/50 rounded-2xl p-8 backdrop-blur-sm hover:border-neutral-700/50 transition-all duration-300 group"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ y: -4 }}
                >
                  <div className="flex items-center space-x-2 mb-4">
                    <span className="bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-sm font-medium">
                      Featured
                    </span>
                    <span className="bg-neutral-800/50 text-white/60 px-3 py-1 rounded-full text-sm">
                      {post.category}
                    </span>
                  </div>

                  <h3 className="text-2xl font-semibold mb-4 group-hover:text-blue-300 transition-colors">
                    {post.title}
                  </h3>

                  <p className="text-white/70 mb-6 leading-relaxed">{post.excerpt}</p>

                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-4 text-sm text-white/60">
                      <div className="flex items-center space-x-2">
                        <User className="w-4 h-4" />
                        <span>{post.author}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(post.publishedAt)}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4" />
                        <span>{post.readTime} min read</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {post.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="bg-neutral-800/50 text-white/60 px-2 py-1 rounded text-xs">
                          #{tag}
                        </span>
                      ))}
                    </div>

                    <Link
                      href={`/blog/${post.id}`}
                      className="flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      <span>Read More</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </motion.article>
              ))}
            </div>
          </motion.section>
        )}

        {/* Regular Posts */}
        {regularPosts.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h2 className="text-2xl font-semibold mb-8">Latest Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {regularPosts.map((post, index) => (
                <motion.article
                  key={post.id}
                  className="bg-neutral-900/40 border border-neutral-800/50 rounded-2xl p-6 backdrop-blur-sm hover:border-neutral-700/50 transition-all duration-300 group"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ y: -4 }}
                >
                  <div className="flex items-center space-x-2 mb-4">
                    <span className="bg-neutral-800/50 text-white/60 px-3 py-1 rounded-full text-sm">
                      {post.category}
                    </span>
                  </div>

                  <h3 className="text-xl font-semibold mb-3 group-hover:text-blue-300 transition-colors">
                    {post.title}
                  </h3>

                  <p className="text-white/70 mb-4 leading-relaxed text-sm">{post.excerpt}</p>

                  <div className="flex items-center space-x-4 text-xs text-white/60 mb-4">
                    <div className="flex items-center space-x-1">
                      <User className="w-3 h-3" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-3 h-3" />
                      <span>{post.readTime} min</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1">
                      {post.tags.slice(0, 2).map((tag) => (
                        <span key={tag} className="bg-neutral-800/50 text-white/60 px-2 py-1 rounded text-xs">
                          #{tag}
                        </span>
                      ))}
                    </div>

                    <Link
                      href={`/blog/${post.id}`}
                      className="text-blue-400 hover:text-blue-300 transition-colors text-sm"
                    >
                      Read →
                    </Link>
                  </div>
                </motion.article>
              ))}
            </div>
          </motion.section>
        )}

        {/* No Results */}
        {filteredPosts.length === 0 && (
          <motion.div
            className="text-center py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-16 h-16 bg-neutral-800/50 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Search className="w-8 h-8 text-white/40" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No articles found</h3>
            <p className="text-white/60 mb-6">Try adjusting your search terms or category filter.</p>
            <button
              onClick={() => {
                setSearchTerm("")
                setSelectedCategory("all")
              }}
              className="bg-white text-black px-6 py-3 rounded-xl font-semibold hover:bg-white/90 transition-all duration-200"
            >
              Clear Filters
            </button>
          </motion.div>
        )}

        {/* Newsletter Signup */}
        <motion.section
          className="mt-20 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-2xl p-8 text-center"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h2 className="text-2xl font-semibold mb-4">Stay Updated</h2>
          <p className="text-white/70 mb-6 max-w-2xl mx-auto">
            Get the latest insights on cognitive science, bias training, and decision-making delivered to your inbox
            every week.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 w-full bg-neutral-900/50 border border-neutral-700/50 rounded-lg px-4 py-3 focus:outline-none focus:border-white/30 transition-colors"
            />
            <button className="bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-white/90 transition-all duration-200 whitespace-nowrap">
              Subscribe
            </button>
          </div>
        </motion.section>
      </main>
    </div>
  )
}
